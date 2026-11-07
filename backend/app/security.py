from slowapi import Limiter
from slowapi.util import get_remote_address

# L'IP du client est fournie par Uvicorn (--proxy-headers) à partir de l'en-tête
# X-Forwarded-For posé par Nginx. Elle sert uniquement de clé de limitation, en mémoire,
# et n'est jamais enregistrée en base ni dans les journaux.
limiter = Limiter(key_func=get_remote_address)
