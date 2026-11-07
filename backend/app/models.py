import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, String, Text, Uuid, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class EmailStatus(enum.StrEnum):
    sent = "sent"
    failed = "failed"


class LeadStatus(enum.StrEnum):
    nouveau = "nouveau"
    contacte = "contacte"
    qualifie = "qualifie"
    gagne = "gagne"
    perdu = "perdu"


class Lead(Base):
    """Demande reçue via le formulaire de contact. L'adresse IP n'est jamais stockée."""

    __tablename__ = "leads"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False, index=True
    )
    nom: Mapped[str] = mapped_column(String(100), nullable=False)
    entreprise: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(String(254), nullable=False)
    offre: Mapped[str] = mapped_column(String(40), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    consent_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    source_page: Mapped[str | None] = mapped_column(String(500), nullable=True)
    email_status: Mapped[EmailStatus] = mapped_column(
        Enum(EmailStatus, name="email_status"),
        nullable=False,
        default=EmailStatus.failed,
        server_default=EmailStatus.failed.value,
    )
    status: Mapped[LeadStatus] = mapped_column(
        Enum(LeadStatus, name="lead_status"),
        nullable=False,
        default=LeadStatus.nouveau,
        server_default=LeadStatus.nouveau.value,
    )
