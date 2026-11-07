from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuration lue depuis les variables d'environnement (ou backend/.env)."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    env: Literal["development", "production"] = "development"
    database_url: str = "sqlite:///./dev.db"
    resend_api_key: str = "re_CHANGE_ME"
    contact_email: str = "contact@daddia.fr"
    mail_from_notification: str = "Site daddIA <noreply@daddia.fr>"
    mail_from_confirmation: str = "daddIA <contact@daddia.fr>"
    allowed_origins: str = "https://daddia.fr,https://www.daddia.fr"
    trusted_hosts: str = "daddia.fr,www.daddia.fr,localhost,127.0.0.1"
    rate_limit_contact: str = "5/hour"

    @property
    def is_production(self) -> bool:
        return self.env == "production"

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    @property
    def trusted_hosts_list(self) -> list[str]:
        return [h.strip() for h in self.trusted_hosts.split(",") if h.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
