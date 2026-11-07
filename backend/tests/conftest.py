import os

os.environ.update(
    {
        "ENV": "development",
        "DATABASE_URL": "sqlite://",
        "TRUSTED_HOSTS": "testserver,localhost",
        "ALLOWED_ORIGINS": "http://localhost:3000",
        "RATE_LIMIT_CONTACT": "5/hour",
        "RESEND_API_KEY": "re_test",
    }
)

from collections.abc import Iterator  # noqa: E402

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402
from sqlalchemy import create_engine  # noqa: E402
from sqlalchemy.orm import Session, sessionmaker  # noqa: E402
from sqlalchemy.pool import StaticPool  # noqa: E402

from app.db import Base, get_db  # noqa: E402
from app.main import create_app  # noqa: E402
from app.routers.contact import get_mailer  # noqa: E402
from app.schemas import ContactIn  # noqa: E402
from app.security import limiter  # noqa: E402


class FakeMailer:
    def __init__(self, fail: bool = False) -> None:
        self.fail = fail
        self.calls: list[ContactIn] = []

    def send_contact_emails(self, data: ContactIn) -> None:
        self.calls.append(data)
        if self.fail:
            raise RuntimeError("Resend indisponible")


@pytest.fixture
def session_factory() -> Iterator[sessionmaker[Session]]:
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    Base.metadata.create_all(engine)
    yield sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)
    engine.dispose()


@pytest.fixture
def mailer() -> FakeMailer:
    return FakeMailer()


@pytest.fixture
def client(session_factory: sessionmaker[Session], mailer: FakeMailer) -> Iterator[TestClient]:
    limiter.reset()
    app = create_app()

    def _get_db() -> Iterator[Session]:
        db = session_factory()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = _get_db
    app.dependency_overrides[get_mailer] = lambda: mailer
    with TestClient(app) as c:
        yield c


@pytest.fixture
def valid_payload() -> dict[str, object]:
    return {
        "nom": "Laurent Martin",
        "entreprise": "Martin & Fils",
        "email": "laurent@example.fr",
        "offre": "audit-ia",
        "message": "Je passe trop de temps sur mes relances de factures.",
        "consentement": True,
        "website": "",
    }
