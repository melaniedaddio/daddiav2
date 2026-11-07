"""Création de la table leads

Revision ID: 0001
Revises:
Create Date: 2026-10-03
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

email_status = sa.Enum("sent", "failed", name="email_status")
lead_status = sa.Enum("nouveau", "contacte", "qualifie", "gagne", "perdu", name="lead_status")


def upgrade() -> None:
    op.create_table(
        "leads",
        sa.Column("id", sa.Uuid(), primary_key=True),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column("nom", sa.String(100), nullable=False),
        sa.Column("entreprise", sa.String(150), nullable=False),
        sa.Column("email", sa.String(254), nullable=False),
        sa.Column("offre", sa.String(40), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("consent_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("source_page", sa.String(500), nullable=True),
        sa.Column("email_status", email_status, nullable=False, server_default="failed"),
        sa.Column("status", lead_status, nullable=False, server_default="nouveau"),
    )
    op.create_index("ix_leads_created_at", "leads", ["created_at"])


def downgrade() -> None:
    op.drop_index("ix_leads_created_at", table_name="leads")
    op.drop_table("leads")
    email_status.drop(op.get_bind(), checkfirst=True)
    lead_status.drop(op.get_bind(), checkfirst=True)
