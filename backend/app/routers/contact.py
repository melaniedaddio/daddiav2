import logging
from datetime import UTC, datetime
from typing import Any

from fastapi import APIRouter, Body, Depends, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.config import Settings, get_settings
from app.db import get_db
from app.models import EmailStatus, Lead
from app.schemas import ContactIn
from app.security import limiter
from app.services.mailer import Mailer, ResendMailer

logger = logging.getLogger("daddia.contact")
router = APIRouter()


def get_mailer(settings: Settings = Depends(get_settings)) -> Mailer:
    return ResendMailer(settings)


def _rate_limit() -> str:
    return get_settings().rate_limit_contact


@router.post(
    "/contact",
    status_code=201,
    openapi_extra={
        "requestBody": {
            "required": True,
            "content": {"application/json": {"schema": ContactIn.model_json_schema()}},
        }
    },
)
@limiter.limit(_rate_limit)
def contact(
    request: Request,
    payload: dict[str, Any] = Body(...),
    db: Session = Depends(get_db),
    mailer: Mailer = Depends(get_mailer),
) -> JSONResponse:
    # 1. La limitation est appliquée par le décorateur ci-dessus.
    # 2. Champ piège rempli : on fait comme si tout allait bien, sans rien enregistrer.
    honeypot = payload.get("website")
    if isinstance(honeypot, str) and honeypot.strip():
        return JSONResponse(status_code=200, content={"success": True})

    # 3. Validation.
    try:
        data = ContactIn.model_validate(payload)
    except ValidationError as exc:
        raise RequestValidationError(exc.errors(include_url=False, include_input=False)) from exc

    # 4. Enregistrement (email_status = failed tant que l'envoi n'a pas réussi).
    referer = request.headers.get("referer")
    lead = Lead(
        nom=data.nom,
        entreprise=data.entreprise,
        email=str(data.email),
        offre=data.offre,
        message=data.message,
        consent_at=datetime.now(UTC),
        source_page=referer[:500] if referer else None,
        email_status=EmailStatus.failed,
    )
    try:
        db.add(lead)
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        logger.exception("Erreur base de données à l'enregistrement d'un lead")
        return JSONResponse(status_code=500, content={"error": "Erreur serveur"})

    # 5. Emails : un échec n'empêche pas la réponse 201, la demande est sauvegardée.
    try:
        mailer.send_contact_emails(data)
    except Exception as exc:  # noqa: BLE001 — tout échec d'envoi est toléré
        logger.error("Envoi des emails échoué pour le lead %s (%s)", lead.id, type(exc).__name__)
    else:
        try:
            lead.email_status = EmailStatus.sent
            db.commit()
        except SQLAlchemyError:
            db.rollback()
            logger.exception("Mise à jour de email_status impossible pour le lead %s", lead.id)

    logger.info("Lead %s enregistré, email_status=%s", lead.id, lead.email_status.value)
    return JSONResponse(status_code=201, content={"success": True})
