from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.orm import Session, sessionmaker

from app.config import get_settings
from app.models import EmailStatus, Lead, LeadStatus
from app.schemas import ContactIn
from app.services.mailer import build_confirmation, build_notification
from tests.conftest import FakeMailer


def _leads(factory: sessionmaker[Session]) -> list[Lead]:
    with factory() as db:
        return list(db.scalars(select(Lead)))


def test_valid_payload_creates_lead_and_sends_mail(
    client: TestClient, session_factory: sessionmaker[Session], mailer: FakeMailer, valid_payload
) -> None:
    res = client.post(
        "/api/contact", json=valid_payload, headers={"referer": "http://localhost/offres/audit-ia"}
    )
    assert res.status_code == 201
    assert res.json() == {"success": True}

    leads = _leads(session_factory)
    assert len(leads) == 1
    lead = leads[0]
    assert lead.nom == "Laurent Martin"
    assert lead.offre == "audit-ia"
    assert lead.email_status == EmailStatus.sent
    assert lead.status == LeadStatus.nouveau
    assert lead.source_page == "http://localhost/offres/audit-ia"
    assert lead.consent_at is not None
    assert len(mailer.calls) == 1


def test_honeypot_returns_200_without_saving(
    client: TestClient, session_factory: sessionmaker[Session], mailer: FakeMailer, valid_payload
) -> None:
    res = client.post("/api/contact", json={**valid_payload, "website": "http://spam.example"})
    assert res.status_code == 200
    assert res.json() == {"success": True}
    assert _leads(session_factory) == []
    assert mailer.calls == []


def test_honeypot_wins_over_invalid_fields(
    client: TestClient, session_factory: sessionmaker[Session], mailer: FakeMailer
) -> None:
    res = client.post("/api/contact", json={"website": "bot", "email": "pas-un-email"})
    assert res.status_code == 200
    assert _leads(session_factory) == []


def test_invalid_email_returns_422(client: TestClient, valid_payload) -> None:
    res = client.post("/api/contact", json={**valid_payload, "email": "pas-un-email"})
    assert res.status_code == 422


def test_short_message_returns_422(client: TestClient, valid_payload) -> None:
    res = client.post("/api/contact", json={**valid_payload, "message": "   court   "})
    assert res.status_code == 422


def test_missing_consent_returns_422(
    client: TestClient, session_factory: sessionmaker[Session], valid_payload
) -> None:
    res = client.post("/api/contact", json={**valid_payload, "consentement": False})
    assert res.status_code == 422
    assert _leads(session_factory) == []


def test_unknown_offer_returns_422(client: TestClient, valid_payload) -> None:
    res = client.post("/api/contact", json={**valid_payload, "offre": "membership"})
    assert res.status_code == 422


def test_sixth_call_in_the_hour_returns_429(client: TestClient, valid_payload) -> None:
    for _ in range(5):
        assert client.post("/api/contact", json=valid_payload).status_code == 201
    assert client.post("/api/contact", json=valid_payload).status_code == 429


def test_mailer_failure_still_returns_201(
    client: TestClient, session_factory: sessionmaker[Session], mailer: FakeMailer, valid_payload
) -> None:
    mailer.fail = True
    res = client.post("/api/contact", json=valid_payload)
    assert res.status_code == 201
    leads = _leads(session_factory)
    assert len(leads) == 1
    assert leads[0].email_status == EmailStatus.failed


def test_mailer_failure_does_not_log_personal_data(
    client: TestClient, mailer: FakeMailer, valid_payload, caplog
) -> None:
    mailer.fail = True
    client.post("/api/contact", json=valid_payload)
    for record in caplog.records:
        text = record.getMessage()
        assert "Laurent" not in text
        assert "laurent@example.fr" not in text
        assert "relances" not in text


def test_script_tag_is_escaped_in_html(valid_payload) -> None:
    data = ContactIn.model_validate(
        {
            **valid_payload,
            "nom": "<b>Jo</b>",
            "message": "Bonjour <script>alert('x')</script>\nligne 2",
        }
    )
    settings = get_settings()
    notif = build_notification(data, settings)
    assert "<script>" not in notif.html
    assert "&lt;script&gt;alert(&#x27;x&#x27;)&lt;/script&gt;<br>ligne 2" in notif.html
    assert "&lt;b&gt;Jo&lt;/b&gt;" in notif.html
    assert notif.reply_to == "laurent@example.fr"
    assert notif.subject == "Nouveau contact — audit-ia — <b>Jo</b>"

    confirmation = build_confirmation(data, settings)
    assert "<b>Jo</b>" not in confirmation.html
    assert confirmation.to == "laurent@example.fr"


def test_script_tag_escaped_end_to_end(
    client: TestClient, mailer: FakeMailer, valid_payload
) -> None:
    payload = {**valid_payload, "message": "<script>alert(1)</script> merci beaucoup"}
    assert client.post("/api/contact", json=payload).status_code == 201
    html = build_notification(mailer.calls[0], get_settings()).html
    assert "<script>" not in html
    assert "&lt;script&gt;" in html


def test_docs_disabled_in_production() -> None:
    from app.config import Settings
    from app.main import create_app

    app = create_app(Settings(env="production", trusted_hosts="testserver"))
    with TestClient(app) as c:
        assert c.get("/api/docs").status_code == 404
        assert c.get("/api/openapi.json").status_code == 404
