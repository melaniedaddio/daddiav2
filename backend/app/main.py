import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.config import Settings, get_settings
from app.routers import contact, health
from app.security import limiter

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")


async def _server_error(_request: Request, _exc: Exception) -> JSONResponse:
    return JSONResponse(status_code=500, content={"error": "Erreur serveur"})


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or get_settings()
    docs = not settings.is_production
    app = FastAPI(
        title="daddIA API",
        docs_url="/api/docs" if docs else None,
        redoc_url=None,
        openapi_url="/api/openapi.json" if docs else None,
    )

    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    app.add_exception_handler(Exception, _server_error)

    app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.trusted_hosts_list)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins_list,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type"],
    )

    app.include_router(health.router, prefix="/api", tags=["health"])
    app.include_router(contact.router, prefix="/api", tags=["contact"])
    return app


app = create_app()
