# Rapport de construction — site daddIA

Construit d'une traite à partir de `PRD.md` (v2) et de la maquette `design/maquette-source.jsx`.

## 1. Ce qui a été construit

### Backend FastAPI (`backend/`)

- `GET /api/health` : vérifie aussi la connexion à la base.
- `POST /api/contact`, avec dans l'ordre :
  - limitation à 5 requêtes par heure et par IP (429 au-delà) ;
  - champ piège : répond 200 sans rien enregistrer ;
  - validation Pydantic (422 en cas d'erreur) ;
  - enregistrement du lead en PostgreSQL ;
  - email de notification et email de confirmation via Resend, avec échappement HTML ;
  - réponse 201 même si l'envoi d'email échoue.
- Modèle `Lead`, avec sa migration Alembic `0001`.
- Aucune IP stockée ni donnée personnelle dans les journaux.
- Documentation automatique coupée en production.
- CORS et TrustedHost configurés.
- **15 tests pytest**, qui couvrent les 7 cas du §10.7 et quelques cas en plus : piège prioritaire sur la validation, logs sans données personnelles, docs désactivées, hôte inconnu.

### Frontend Next.js (`frontend/`)

Pages Router, TypeScript strict, aucun dossier `pages/api`.

**Accueil**

- **Hero cinématographique GSAP** identique à la maquette : épinglage sur 7 000 px, carte 3D, téléphone tableau de bord, badges, rideau final. Accroche : « L'IA qui travaille pour vous, et avec vous. »
- Version statique empilée si l'utilisateur demande moins d'animations (`prefers-reduced-motion`).
- Les sections suivent : 6 offres (Audit mis en avant), guide « Quel est votre besoin ? » (5 besoins, chacun avec une scène et l'offre qui y répond), « Comment on commence » (4 étapes communes à toutes les offres), FAQ, Contact. La section Stack technique a été retirée à la demande de Daddio.

**Formulaire**

- React Hook Form + Zod, envoyé vers `/api/contact`.
- Offre pré-remplie à partir de `?offre=` ou de `/#contact?offre=…`.
- Messages d'erreur dédiés pour le 429 et pour les autres erreurs.
- Case de consentement RGPD et champ piège anti-spam.

**6 pages offres** (`/offres/[slug]`, générées en SSG)

- Contenu du §9 transcrit fidèlement.
- Exemples **sous forme de scènes visuelles**, en HTML/CSS/SVG uniquement, toujours marqués « Exemple illustratif » :
  - scènes avant/après avec personnage et badge de gain animé ;
  - rapport d'audit incliné, avec barres comparatives et pastilles de difficulté ;
  - conversation du chatbot dans un téléphone (indicateur de frappe, pièces jointes) ;
  - tableau de bord applicatif (graphique SVG, factures impayées) ;
  - interface privée façon ChatGPT (suggestions cliquables, sources connectées, tiroir sur mobile, fenêtre « Apprendre quelque chose ») ;
  - mémoire de l'assistant : deux téléphones et une jauge ;
  - journée de l'assistant avec un soleil qui avance au défilement ;
  - grille sécurité avec un cadenas animé ;
  - parcours sur 3 mois, avec progression au défilement ;
  - déroulé d'atelier sous forme de barre proportionnelle.
- Le secteur choisi (Institut, Immobilier, BTP) est conservé d'une page offre à l'autre.

**Autres pages et éléments communs**

- Mentions légales, Confidentialité (RGPD), page 404.
- Navbar avec menu déroulant des offres et menu mobile plein écran.
- Footer, curseur personnalisé, bannière cookies.
- SEO : `title`, `description`, `canonical`, Open Graph, `lang="fr"`.

### Déploiement (`deploy/`)

- `docker-compose.yml` : PostgreSQL 16, backend et frontend, exposés uniquement sur `127.0.0.1`.
- Dockerfiles backend et frontend (mode standalone, utilisateurs non-root).
- `nginx/daddia.conf` : TLS, en-têtes de sécurité, limite de 64 ko par requête.
- `backup.sh` : sauvegarde quotidienne, rotation sur 14 jours.
- `.env.example` à la racine et dans chaque dossier, plus un `.gitignore`.

### Vérifications effectuées

| Contrôle | Résultat |
|---|---|
| `npm run build` | ✅ (11 pages, dont les **6 pages offres** en SSG) |
| `npm run lint` | ✅ 0 erreur |
| `uv run pytest` | ✅ 15/15 |
| `uv run ruff check` (+ `ruff format --check`) | ✅ |
| Formulaire → `/api/contact` (Playwright, backend réel) | ✅ 201, lead en base, offre pré-remplie, erreurs de validation, message 429 |
| Pile Docker complète + Nginx simulé (sans TLS) | ✅ santé, page offre, lead écrit dans PostgreSQL, 413 au-delà de 64 ko, docs → 404, conteneur non-root, IP falsifiée sans effet sur la limite |
| Captures 390 / 768 / 1440 px vs maquette | ✅ hero et sections identiques ; aucun défilement horizontal (vérifié jusqu'à 320 px sur les pages offres) |
| Règles de contenu | ✅ aucun prix (seul le montant fictif « 4 850 € HT »), pas de mention OPCO, pas de jargon (RAG/LLM/API/pipeline) dans les pages offres |

Écarts visuels assumés par rapport à la maquette :

- « daddIA » remplace « DaddIA » dans la navbar ;
- le titre « Commençons ensemble. » s'affiche (il restait invisible dans la maquette à cause d'un bug) ;
- les pastilles font 44 px de haut, comme l'exige le §13 ;
- les contenus suivent la v2 (6 offres, nouvelle FAQ).

## 2. Décisions prises seul

Elles sont toutes détaillées dans **`DECISIONS.md`** (33 points). Les plus importantes :

- `npm run build` passe par **webpack** : le build Turbopack échoue de façon intermittente sur les polices Google.
- **Uvicorn tourne avec 1 worker** pour que la limite de 5 requêtes par heure soit exacte (le compteur est en mémoire).
- **Nginx** transmet `X-Forwarded-For $remote_addr`, pour qu'on ne puisse pas falsifier son IP.
- Le **type `Offer` est étendu** pour porter les scènes visuelles.
- Des **textes d'illustration ont été ajoutés** : réponses de l'interface privée, mini-messages des capacités, horodatages, client fictif « Rénov'Azur ». Ils sont tous sans montant et marqués « Exemple illustratif ».

## 3. Valeurs à compléter avant la mise en ligne

| Où | Valeur |
|---|---|
| `frontend/pages/mentions-legales.tsx` | `[À COMPLÉTER]` : nom de l'entrepreneur, SIRET, adresse postale, directeur de publication, nom, adresse et téléphone de l'hébergeur |
| `frontend/pages/confidentialite.tsx` | `[À COMPLÉTER]` : nom de l'entrepreneur, nom de l'hébergeur |
| `frontend/lib/site.ts` | `SOCIAL_LINKS.linkedin` / `youtube` : `#` (`CHANGE_ME`) |
| `backend/.env` | `RESEND_API_KEY` (`re_CHANGE_ME`), mot de passe dans `DATABASE_URL` (`CHANGE_ME`) |
| `deploy/.env` | `POSTGRES_PASSWORD` (`CHANGE_ME`), identique à celui de `DATABASE_URL` |
| `NEXT_PUBLIC_CAL_URL` | `https://cal.com/daddia/decouverte` à confirmer |
| Resend | Vérifier le domaine `daddia.fr` (SPF/DKIM) pour pouvoir envoyer depuis `noreply@` et `contact@` |
| Contenu (§17) | Sources de prospection réellement branchées (Pappers, permis de construire, appels d'offres) ; question Qualiopi/OPCO pour les ateliers |

## 4. Commandes

### En local (développement)

```bash
# Backend : http://localhost:8000 (SQLite par défaut)
cd backend
cp .env.example .env
uv sync
uv run alembic upgrade head
uv run uvicorn app.main:app --reload --port 8000

# Frontend : http://localhost:3000 (relaie /api vers le backend)
cd frontend
cp .env.example .env.local
npm install
npm run dev

# Qualité
cd backend && uv run pytest && uv run ruff check
cd frontend && npm run lint && npm run build
```

Si le port 8000 est déjà pris, lancez le backend sur un autre port, par exemple `--port 8100`, et le frontend avec `DEV_API_PROXY=http://localhost:8100 npm run dev`. Sur ce Mac, les ports 3000 et 8000 sont déjà occupés par un autre projet Docker.

### En production (VPS)

```bash
# 1. Secrets
cp backend/.env.example backend/.env
# À renseigner dans backend/.env : ENV=production, DATABASE_URL=postgresql+psycopg://daddia:<mdp>@db:5432/daddia,
#   RESEND_API_KEY, ALLOWED_ORIGINS=https://daddia.fr,https://www.daddia.fr, TRUSTED_HOSTS=daddia.fr,www.daddia.fr,localhost
cp deploy/.env.example deploy/.env        # POSTGRES_PASSWORD = même mot de passe

# 2. Conteneurs (les migrations Alembic sont appliquées au démarrage du backend)
cd deploy && docker compose up -d --build
docker compose ps && curl -s http://127.0.0.1:8000/api/health

# 3. Nginx + TLS
sudo cp nginx/daddia.conf /etc/nginx/sites-available/daddia.conf
sudo ln -s /etc/nginx/sites-available/daddia.conf /etc/nginx/sites-enabled/
sudo certbot --nginx -d daddia.fr -d www.daddia.fr
sudo nginx -t && sudo systemctl reload nginx

# 4. Sauvegarde quotidienne (crontab -e)
30 3 * * * /chemin/vers/deploy/backup.sh >> /var/log/daddia-backup.log 2>&1

# Consulter les leads
docker compose exec db psql -U daddia -c "select created_at, nom, entreprise, offre, email_status, status from leads order by created_at desc;"
```

Si le certificat n'existe pas encore, `nginx -t` échoue sur les chemins `ssl_certificate`. Dans ce cas, obtenez d'abord le certificat avec `sudo certbot certonly --nginx -d daddia.fr -d www.daddia.fr` (ou `--standalone`), puis activez la configuration.
