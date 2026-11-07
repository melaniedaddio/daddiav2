"""Envoi des emails du formulaire de contact via Resend.

Toutes les valeurs saisies par le visiteur passent par html.escape() avant d'être
insérées dans le HTML. Les retours à la ligne du message sont convertis en <br>
après l'échappement.
"""

from dataclasses import dataclass
from html import escape
from typing import Protocol

import resend

from app.config import Settings
from app.schemas import ContactIn

OFFER_LABELS: dict[str, str] = {
    "audit-ia": "Audit IA",
    "chatbot-ia": "Chatbot IA personnalisé",
    "outil-sur-mesure": "Votre outil sur mesure",
    "assistant-ia": "Votre assistant IA",
    "accompagnement-ia": "Accompagnement IA",
    "ateliers-ia": "Ateliers IA",
    "autre": "Autre / Je ne sais pas encore",
}


@dataclass(frozen=True)
class Email:
    sender: str
    to: str
    subject: str
    html: str
    reply_to: str | None = None


def _multiline(value: str) -> str:
    return escape(value).replace("\r\n", "\n").replace("\n", "<br>")


def _one_line(value: str) -> str:
    return " ".join(value.split())


def build_notification(data: ContactIn, settings: Settings) -> Email:
    rows = [
        ("Nom", escape(data.nom)),
        ("Entreprise", escape(data.entreprise)),
        ("Email", escape(str(data.email))),
        ("Offre", escape(OFFER_LABELS.get(data.offre, data.offre))),
        ("Message", _multiline(data.message)),
        ("Consentement", "Oui"),
    ]
    body = "".join(
        f'<tr><td style="padding:6px 12px;color:#6B6075;vertical-align:top">{label}</td>'
        f'<td style="padding:6px 12px">{value}</td></tr>'
        for label, value in rows
    )
    html = (
        '<div style="font-family:Arial,sans-serif;font-size:14px;color:#18121A">'
        "<h2>Nouvelle demande depuis le site</h2>"
        f'<table style="border-collapse:collapse">{body}</table></div>'
    )
    return Email(
        sender=settings.mail_from_notification,
        to=settings.contact_email,
        subject=_one_line(f"Nouveau contact — {data.offre} — {data.nom}"),
        html=html,
        reply_to=str(data.email),
    )


def build_confirmation(data: ContactIn, settings: Settings) -> Email:
    html = (
        '<div style="font-family:Arial,sans-serif;font-size:15px;color:#18121A;line-height:1.6">'
        f"<p>Bonjour {escape(data.nom)},</p>"
        "<p>merci pour votre message. On vous répond sous 24 h en semaine.</p>"
        "<p>— L'équipe daddIA · daddia.fr · Nice (06)</p></div>"
    )
    return Email(
        sender=settings.mail_from_confirmation,
        to=str(data.email),
        subject="On a bien reçu votre message — daddIA",
        html=html,
    )


class Mailer(Protocol):
    def send_contact_emails(self, data: ContactIn) -> None: ...


class ResendMailer:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def _send(self, email: Email) -> None:
        params: resend.Emails.SendParams = {
            "from": email.sender,
            "to": [email.to],
            "subject": email.subject,
            "html": email.html,
        }
        if email.reply_to:
            params["reply_to"] = email.reply_to
        resend.Emails.send(params)

    def send_contact_emails(self, data: ContactIn) -> None:
        resend.api_key = self.settings.resend_api_key
        self._send(build_notification(data, self.settings))
        self._send(build_confirmation(data, self.settings))
