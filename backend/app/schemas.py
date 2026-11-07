from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

OfferId = Literal[
    "audit-ia",
    "chatbot-ia",
    "outil-sur-mesure",
    "assistant-ia",
    "accompagnement-ia",
    "ateliers-ia",
    "autre",
]


class ContactIn(BaseModel):
    nom: str = Field(min_length=2, max_length=100)
    entreprise: str = Field(min_length=1, max_length=150)
    email: EmailStr
    offre: OfferId
    message: str = Field(min_length=10, max_length=3000)
    consentement: bool
    website: str | None = Field(default=None, max_length=200)  # champ piège

    @field_validator("nom", "entreprise", "message", mode="before")
    @classmethod
    def strip(cls, v: object) -> object:
        # Avant la validation, pour que les longueurs minimales portent sur le texte nettoyé.
        return v.strip() if isinstance(v, str) else v

    @field_validator("consentement")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consentement requis")
        return v


class ContactOut(BaseModel):
    success: bool


class HealthOut(BaseModel):
    status: str
