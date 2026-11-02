# PRD — Site daddIA — v2

**Version** : 2.0 — Octobre 2026 (remplace la v1 d'avril 2026)
**Usage** : document de référence pour Claude Code. Il couvre la construction complète du site : frontend Next.js, backend FastAPI, contenu et déploiement.
**Langue du site** : français uniquement.

---

## ⚡ Mode d'exécution — à lire en premier

**Claude Code construit l'intégralité du projet en une seule fois, du début à la fin, sans s'arrêter pour demander de validation.**

- **Avant d'écrire la moindre ligne**, lire en entier `design/maquette-source.jsx` : c'est la maquette validée. Le site doit la reproduire **fidèlement** (styles, animations, textes, espacements, classes Tailwind), en la portant en TypeScript / Next.js et en l'étendant avec ce que ce PRD ajoute (6 offres, pages offres, backend…). En cas de contradiction entre la maquette et une description du PRD sur le **design**, la maquette gagne. Sur le **contenu** (offres, textes du §9, FAQ, formulaire), le PRD gagne.

- **Ordre de travail** : suivre l'ordre de la §15 et enchaîner toutes les étapes jusqu'au déploiement prêt à lancer : Dockerfiles, docker-compose et configuration Nginx écrits.
- **Ce qu'il ne faut pas faire** :
  - pas de plan soumis pour approbation ;
  - pas de question du type « je continue ? » ;
  - pas d'arrêt entre les étapes.
- **Si une information manque** :
  - pour une clé API, un SIRET ou une URL réelle, mettre une valeur factice clairement marquée (`CHANGE_ME`, `[À COMPLÉTER]`) et continuer ;
  - pour un choix technique non précisé, prendre l'option la plus simple et cohérente avec ce document, la noter dans `DECISIONS.md` et continuer.
- **Si quelque chose échoue** (build, test, lint) : corriger soi-même et relancer jusqu'à ce que tout passe.
- **Avant de rendre la main**, vérifier que :
  - `npm run build` passe sans erreur ;
  - `npm run lint` passe sans erreur ;
  - `uv run pytest` est entièrement au vert ;
  - `uv run ruff check` passe sans erreur ;
  - les 6 pages offres sont générées ;
  - le formulaire envoie bien vers `/api/contact`.
- **À la fin**, produire un récapitulatif unique dans `RAPPORT.md`, qui contient :
  - ce qui a été construit ;
  - les décisions prises seul ;
  - la liste des valeurs `[À COMPLÉTER]` / `CHANGE_ME` à renseigner ;
  - les commandes pour lancer en local et en production.

---

## 0. Ce qui change par rapport à la v1

Si une partie du site v1 existe déjà, voici les écarts à appliquer :

1. **Backend séparé en FastAPI.** La route `pages/api/contact.ts` (Resend côté Next.js) est supprimée. Le formulaire envoie maintenant ses données à un service **FastAPI** (Python), qui enregistre la demande en base et envoie les emails. Next.js devient un frontend pur.
2. **Six offres au lieu de cinq.** L'offre *Membership & Formation* est **supprimée**. Deux offres sont **ajoutées** : *Chatbot IA personnalisé* et *Votre assistant IA*. Trois offres sont **renommées** (voir §1.3).
3. **Une page dédiée par offre** : `/offres/[slug]`. Chaque page explique l'offre de façon complète, avec des exemples concrets compréhensibles par un non-initié (contenu complet en §9).
4. **Pages légales ajoutées** : mentions légales et politique de confidentialité, obligatoires dès qu'on collecte des données via le formulaire.
5. **Contenu corrigé** :
   - stats du hero mises à jour ;
   - FAQ nettoyée des chiffres non vérifiés ;
   - mention OPCO reformulée.
6. **Sécurité du formulaire renforcée** :
   - anti-spam (champ piège) ;
   - limitation du nombre de requêtes ;
   - échappement HTML dans les emails ;
   - case de consentement RGPD.
7. **Design : la maquette Claude Design fait référence.** La maquette validée par Daddio est fournie avec ce PRD : `design/maquette.html` (à ouvrir dans un navigateur) et `design/maquette-source.jsx` (son code source lisible). Son design s'impose sur tout le reste : hero cinématographique au scroll (GSAP), grain de film, grille, cartes 3D, boutons en relief, textes et mise en page des sections. Le fond shader Three.js, le texte animé et la rangée de stats de la v1 sont **supprimés** (voir §3 à §7).

---

## 1. Contexte

### 1.1 L'entreprise

**daddIA** est une micro-entreprise basée à Nice (06, PACA). Elle aide les TPE et PME françaises à intégrer l'intelligence artificielle dans leur activité.

- Un seul fondateur, sans visage public.
- La marque se présente comme une agence, pas comme une marque personnelle.
- Slogan : **« Pas de promesses. Des outils qui tournent. »**

### 1.2 Objectif du site

Le site doit **éduquer avant de vendre**. Le visiteur type ne cherche pas une « agence IA » : il découvre ce que l'IA peut faire pour lui.

Le site remplit trois rôles :

1. **Éduquer** : montrer des exemples concrets dans lesquels le visiteur reconnaît son quotidien.
2. **Rassurer** :
   - un processus clair ;
   - ce qui est inclus et ce qui ne l'est pas ;
   - les garde-fous ;
   - un ton humain, sans jargon.
3. **Convertir** : vers un appel découverte gratuit (lien Cal.com) ou vers le formulaire de contact.

**Persona — Laurent G.** :

- dirigeant ou gérant de TPE/PME, tous secteurs, 35 à 55 ans ;
- il décide seul ;
- il perd du temps sur des tâches manuelles répétitives : relances, devis, emails, saisie, rapports ;
- il est curieux de l'IA mais n'est pas initié.

Il passe à l'action quand quatre conditions sont réunies :

- il voit un exemple qui ressemble à son quotidien ;
- il comprend exactement ce qu'il reçoit et en combien de temps ;
- il a une preuve que ça marche ;
- il peut commencer petit.

### 1.3 Les 6 offres

| Slug | Nom affiché | Type | Rôle |
|---|---|---|---|
| `audit-ia` | **Audit IA** | Ponctuel | Porte d'entrée recommandée |
| `chatbot-ia` | **Chatbot IA personnalisé** | Ponctuel | Un assistant qui répond à vos clients |
| `outil-sur-mesure` | **Votre outil sur mesure** | Ponctuel | Application métier complète (anciennement « SaaS Custom ») |
| `assistant-ia` | **Votre assistant IA** | Abonnement | Un collaborateur IA qui travaille pour vous (anciennement « Agent IA Managé ») |
| `accompagnement-ia` | **Accompagnement IA** | Abonnement | Apprendre à utiliser l'IA soi-même (anciennement « Coaching mensuel ») |
| `ateliers-ia` | **Ateliers IA** | Ponctuel | Formation en petit groupe, 3 h |

> ⚠️ **Aucun prix n'est affiché sur le site.** Chaque devis est personnalisé après échange. Ne jamais écrire de montant en euros dans le contenu, le code ou les métadonnées.

---

## 2. Architecture & stack

### 2.1 Vue d'ensemble

```
                    ┌──────────────────────── VPS (Docker Compose) ─────────────────────────┐
Navigateur ──HTTPS──▶ Nginx (hôte, TLS Let's Encrypt)                                          │
                    │   ├── /        → frontend  (Next.js, port 3000)                          │
                    │   └── /api/*   → backend   (FastAPI, port 8000) ──▶ PostgreSQL (db)       │
                    │                                              └──▶ Resend (emails)       │
                    └─────────────────────────────────────────────────────────────────────────┘
```

Le frontend et le backend sont servis sur le **même domaine** (`daddia.fr`). Le frontend appelle simplement `fetch('/api/contact')`. Il n'y a donc pas de problème de CORS en production.

### 2.2 Frontend

| Élément | Choix |
|---|---|
| Framework | **Next.js — Pages Router** (pas d'App Router) |
| Langage | **TypeScript strict** |
| Style | **Tailwind CSS + shadcn/ui** |
| Animations | **GSAP + ScrollTrigger** (hero cinématographique, comme dans la maquette) et **Framer Motion** (révélations, onglets, maquettes des pages offres) |
| Formulaire | **React Hook Form + Zod** |
| Icônes | **Lucide React** |
| Polices | **next/font/google** : Syne (titres) + DM Sans (corps) |
| Build | `output: 'standalone'` dans `next.config.js` |
| Gestionnaire de paquets | **npm** |

> Le frontend n'a **plus aucune route `pages/api/`**. Le dossier `pages/api` ne doit pas exister, pour éviter tout conflit avec le préfixe `/api` du backend.

### 2.3 Backend

| Élément | Choix |
|---|---|
| Framework | **FastAPI** |
| Langage | **Python 3.12**, typage complet |
| Validation & configuration | **Pydantic v2** + **pydantic-settings** |
| Base de données | **PostgreSQL 16** |
| ORM & migrations | **SQLAlchemy 2.0** (style typé `Mapped[]`) + **Alembic** |
| Emails | **Resend** (SDK Python `resend`) |
| Limitation de requêtes | **slowapi** |
| Serveur | **Uvicorn** (`--proxy-headers`) |
| Tests | **pytest** + **httpx** (`TestClient`) |
| Qualité du code | **ruff** (lint + format) |
| Dépendances | **uv** + `pyproject.toml` |

### 2.4 Structure du dépôt (monorepo)

```
daddia/
├── frontend/              # Next.js
├── backend/               # FastAPI
├── design/
│   ├── maquette.html         # maquette validée, à ouvrir dans un navigateur pour comparer
│   └── maquette-source.jsx   # son code source lisible (référence, ne pas importer dans le build)
├── deploy/
│   ├── nginx/daddia.conf
│   └── docker-compose.yml
├── .env.example           # toutes les variables, sans valeurs secrètes
└── PRD.md                 # ce document
```

### 2.5 Variables d'environnement

**Frontend** (`frontend/.env.local`) :

```env
NEXT_PUBLIC_CAL_URL=https://cal.com/daddia/decouverte
NEXT_PUBLIC_SITE_URL=https://daddia.fr
NEXT_PUBLIC_API_BASE=/api        # en dev : http://localhost:8000/api
```

**Backend** (`backend/.env`) :

```env
ENV=production                    # development | production
DATABASE_URL=postgresql+psycopg://daddia:CHANGE_ME@db:5432/daddia
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=contact@daddia.fr
MAIL_FROM_NOTIFICATION="Site daddIA <noreply@daddia.fr>"
MAIL_FROM_CONFIRMATION="daddIA <contact@daddia.fr>"
ALLOWED_ORIGINS=https://daddia.fr,https://www.daddia.fr
RATE_LIMIT_CONTACT=5/hour
```

**Base de données** (`deploy/.env`) : `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.

> Aucun secret ne doit être commité. Seul `.env.example` est versionné.

### 2.6 Initialisation

```bash
# Frontend
npx create-next-app@latest frontend --typescript --tailwind --eslint --no-app --src-dir=false --import-alias="@/*"
cd frontend
npm install gsap framer-motion lucide-react react-hook-form @hookform/resolvers zod
npx shadcn@latest init
npx shadcn@latest add button input textarea select label card accordion badge tabs checkbox

# Backend
cd ../backend
uv init --app
uv add fastapi "uvicorn[standard]" pydantic-settings "sqlalchemy>=2" alembic "psycopg[binary]" resend slowapi email-validator
uv add --dev pytest httpx ruff
uv run alembic init migrations
```

---

## 3. Design system

### 3.1 Couleurs (`tailwind.config.ts`)

```typescript
colors: {
  bg: {
    primary:   '#070407',   // fond principal, noir chaud
    secondary: '#0F0B0F',   // sections alternées
    card:      '#18121A',   // cartes
    hover:     '#1F1425',   // survol des cartes
  },
  accent: {
    crimson:  '#C8103C',    // couleur principale
    crimson2: '#F03068',    // variante lumineuse (survol, mots animés)
    violet:   '#7A28B8',    // secondaire (offres en abonnement)
    blue:     '#2460D8',    // tertiaire
  },
  text: {
    primary:   '#F0EBF4',
    secondary: '#9A8FA5',
    muted:     '#6B6075',
  },
  border: {
    subtle: 'rgba(255,255,255,0.07)',
    accent: 'rgba(200,16,60,0.2)',
    hover:  'rgba(200,16,60,0.5)',
  },
  state: {
    success: '#2BB673',     // badges « gain », ✓ inclus
  },
}
```

### 3.2 Typographie

```typescript
// pages/_app.tsx
import { Syne, DM_Sans } from 'next/font/google'
const syne = Syne({ subsets: ['latin'], weight: ['400','600','700','800'], variable: '--font-syne', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500'], variable: '--font-dm-sans', display: 'swap' })
```

- Titres H1 et H2 : `font-syne font-bold tracking-tight`.
- Corps de texte : `font-dm-sans`.
- `.font-syne` active aussi `font-feature-settings: "ss01"` (comme dans la maquette).
- **Logo** : wordmark texte uniquement. « dadd » en `text-primary`, « IA » en `accent-crimson`, en `font-syne font-extrabold tracking-tight`. Toujours écrit « daddIA » (la maquette affiche « DaddIA » dans la navbar : corriger en « daddIA »).
- **Aucune image décorative.** Le design est entièrement typographique, en CSS, SVG et animations.
- Les maquettes d'illustration des pages offres (aperçu de rapport, conversation, tableau de bord) sont des **composants HTML/CSS**, jamais des images.

### 3.3 Styles globaux repris de la maquette (`styles/globals.css`)

À copier **tels quels** (ils viennent de la maquette) :

```css
html, body { background: #070407; color: #F0EBF4; }
::selection { background: #C8103C; color: #fff; }
* { scrollbar-width: thin; scrollbar-color: #C8103C #18121A; }
.font-syne { font-family: var(--font-syne), sans-serif; font-feature-settings: "ss01"; }

.gsap-reveal { visibility: hidden; }

/* Grain de film en surimpression */
.film-grain-daddia {
  position: absolute; inset: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
}

/* Grille crimson qui s'estompe vers les bords */
.bg-grid-daddia {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(200,16,60,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(200,16,60,0.05) 1px, transparent 1px);
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
}

.text-hero-3d { color: #F0EBF4; text-shadow: 0 10px 30px rgba(200,16,60,0.2), 0 2px 4px rgba(0,0,0,0.4); }
.text-hero-crimson {
  background: linear-gradient(180deg, #F03068 0%, #C8103C 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(0);
  filter: drop-shadow(0px 8px 20px rgba(200,16,60,0.3)) drop-shadow(0px 2px 4px rgba(0,0,0,0.5));
}
.text-card-white {
  background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(0);
  filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
}

/* Grande carte 3D du hero */
.card-daddia {
  background: linear-gradient(145deg, #1A0A14 0%, #070407 100%);
  box-shadow: 0 40px 100px -20px rgba(0,0,0,0.9), 0 20px 40px -20px rgba(200,16,60,0.15),
              inset 0 1px 2px rgba(200,16,60,0.15), inset 0 -2px 4px rgba(0,0,0,0.8);
  border: 1px solid rgba(200,16,60,0.12);
}
/* Reflet qui suit la souris (variables --mx / --my mises à jour au mousemove) */
.card-sheen-daddia {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
  background: radial-gradient(800px circle at var(--mx, 50%) var(--my, 50%), rgba(200,16,60,0.05) 0%, transparent 40%);
  mix-blend-mode: screen; transition: opacity 0.3s;
}
.floating-badge-daddia {
  background: linear-gradient(135deg, rgba(200,16,60,0.12) 0%, rgba(122,40,184,0.06) 100%);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 0 0 1px rgba(200,16,60,0.15), 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.08);
}

/* Boutons en relief */
.btn-daddia-primary {
  background: linear-gradient(180deg, #E01040 0%, #C8103C 100%); color: #fff;
  box-shadow: 0 0 0 1px rgba(200,16,60,0.3), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(200,16,60,0.4), inset 0 1px 1px rgba(255,255,255,0.15);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.btn-daddia-primary:hover {
  transform: translateY(-3px);
  background: linear-gradient(180deg, #F03068 0%, #E01040 100%);
  box-shadow: 0 0 0 1px rgba(200,16,60,0.4), 0 6px 12px -2px rgba(200,16,60,0.3), 0 20px 32px -6px rgba(200,16,60,0.5), inset 0 1px 1px rgba(255,255,255,0.2);
}
.btn-daddia-outline {
  background: rgba(240,235,244,0.04); color: #F0EBF4;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.btn-daddia-outline:hover {
  transform: translateY(-3px); background: rgba(240,235,244,0.08);
  box-shadow: 0 0 0 1px rgba(200,16,60,0.3), 0 6px 12px -2px rgba(0,0,0,0.3), 0 20px 32px -6px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.08);
}

/* Widgets de tableau de bord (hero + maquettes des pages offres) */
.dashboard-widget {
  background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
}
.task-row { border-bottom: 1px solid rgba(255,255,255,0.04); }
.task-row:last-child { border-bottom: none; }
.progress-arc { transform: rotate(-90deg); transform-origin: center; stroke-dasharray: 314; stroke-dashoffset: 314; stroke-linecap: round; }
```

### 3.4 Motifs d'interface de la maquette (à réutiliser partout, pages offres comprises)

- **En-tête de section** : surtitre (eyebrow) `text-xs font-medium tracking-widest uppercase text-[#C8103C]`, puis H2 `font-syne font-bold text-4xl sm:text-5xl` révélé par `SplitReveal`, la seconde ligne éventuelle en crimson, puis un sous-titre `text-[#9A8FA5] max-w-xl text-lg`. Bloc centré, `mb-16`.
- **Rythme des sections** : `py-24 px-4`, fonds alternés `#070407` / `#0F0B0F`, conteneurs `max-w-3xl` à `max-w-6xl` selon le contenu.
- **Carte standard** : `bg-[#18121A] border border-white/7 rounded-xl` (ou `rounded-2xl` pour les offres), `hover:border-white/15` ou `hover:border-[#C8103C]/20`, transition des couleurs.
- **Pastilles / onglets** : `rounded-full border`, actif = `bg-[#C8103C]/10 border-[#C8103C]/40 text-[#F03068]`, inactif = `border-white/10 text-[#9A8FA5]`.
- **Badge de gain** : `rounded-full bg-green-900/30 border border-green-700/30 text-green-400 text-xs`.
- **Tags d'offre** : crimson `bg-[#C8103C]/10 text-[#F03068] border-[#C8103C]/30` ; violet `bg-[#7A28B8]/10 text-[#A060E0] border-[#7A28B8]/30`.
- **Accordéon** (FAQ, « Ce qui est inclus ») : ouverture par `grid-template-rows: 0fr → 1fr` en 0,3 s, chevron crimson qui pivote de 180°.
- **Champs de formulaire** : `bg-[#0F0B0F] border border-white/10 rounded-lg h-11 px-3 placeholder:text-[#6B6075] focus:border-[#C8103C]/50`.
- **Révélations** : `FadeUp` (opacité + translation de 24 px en 0,5 s, déclenché à l'entrée dans l'écran, une fois) et `SplitReveal` (clip-path de gauche à droite, 0,65 s, `cubic-bezier(0.76,0,0.24,1)`), avec des délais en cascade (0,04 à 0,1 s).
- Les maquettes visuelles des pages offres (§8.3) reprennent ce vocabulaire : `card-daddia`, `dashboard-widget`, `floating-badge-daddia`, boutons `btn-daddia-*`, grain et grille en fond des en-têtes de page.

---

## 4. Inspiration visuelle — composants 21st.dev

> **La maquette (`design/maquette-source.jsx`) prime sur ces composants.** Le hero de la maquette remplace tous les heroes et shaders 21st.dev : ne pas les installer. Les composants ci-dessous ne servent que d'inspiration ponctuelle pour les pages offres, et seulement s'ils respectent le vocabulaire visuel du §3.3–3.4.

Le MCP Magic est installé. Claude Code peut l'utiliser, ou passer par `npx shadcn` :

```bash
# Offres (sans prix)
npx shadcn@latest add "https://21st.dev/r/ui-layouts/pricing-section-4"
# Révélation au scroll
npx shadcn@latest add "https://21st.dev/r/serafim/splite"
```

**Direction esthétique :**

- **Offres** : s'inspirer de `pricing-section-4`, mais **sans aucun prix**.
- **Révélations au scroll** : effet `splite` sur tous les titres H2.

---

## 5. Pages & navigation

### 5.1 Routes

| Route | Type | Contenu |
|---|---|---|
| `/` | Page unique à ancres | Accueil |
| `/offres/[slug]` | SSG (`getStaticPaths` + `getStaticProps`) | 6 pages offres, contenu en §9 |
| `/mentions-legales` | Statique | Mentions légales |
| `/confidentialite` | Statique | Politique de confidentialité (RGPD) |
| `/404` | Statique | Page introuvable, avec un lien de retour à l'accueil et vers les offres |

### 5.2 Ancres de l'accueil

```
/
├── #hero
├── #ia-pour-vous   → « Ce que l'IA peut faire pour vous »
├── #processus
├── #offres         → 6 cartes, chacune avec un lien vers /offres/[slug]
├── #stack
├── #faq
└── #contact
```

### 5.3 Navbar

- Barre fixe en haut (`fixed top-0`, hauteur 64 px). **Transparente** tant que la page n'a pas défilé, puis, au-delà de 20 px de défilement, `bg-[#070407]/90 backdrop-blur-md border-b border-white/7` (transition 300 ms), comme dans la maquette.
- Liens en `text-sm font-medium text-[#9A8FA5] hover:text-[#F0EBF4]` ; le lien actif est souligné d'un trait crimson de 1 px. Bouton « Nous contacter » : `bg-[#C8103C] hover:bg-[#F03068] rounded-md px-4 py-2 text-sm`.
- Menu mobile : overlay plein écran `#070407`, liens en `text-3xl font-syne font-bold` qui apparaissent l'un après l'autre (glissement de 20 px, 70 ms d'écart).
- Disposition :
  - logo à gauche ;
  - liens au centre ;
  - bouton « Nous contacter » à droite.
- Liens :
  - « L'IA pour vous » ;
  - « Processus » ;
  - « Offres » ;
  - « FAQ ».
- **Sur l'accueil** : les liens sont des ancres (`#offres`, etc.) et le lien de la section active est souligné en crimson (`useScrollSpy`).
- **Sur les autres pages** : les liens pointent vers `/#offres`, `/#faq`, etc.
- Le lien « Offres » ouvre en plus un **menu déroulant** listant les 6 pages offres. Sur mobile, ce menu s'affiche en liste dans le menu plein écran.
- Mobile : un menu hamburger ouvre un overlay plein écran.

---

## 6. Structure des fichiers — frontend

```
frontend/
├── pages/
│   ├── index.tsx
│   ├── offres/[slug].tsx
│   ├── mentions-legales.tsx
│   ├── confidentialite.tsx
│   ├── 404.tsx
│   ├── _app.tsx
│   └── _document.tsx                 # lang="fr"
├── components/
│   ├── layout/        Navbar.tsx · Footer.tsx · PageShell.tsx
│   ├── sections/      HeroSection · WhatIACanDo · ProcessSection · OffresSection · StackSection · FAQSection · ContactSection
│   ├── offer/         (template des pages offres, voir §8)
│   │   ├── OfferHero.tsx
│   │   ├── ForWhom.tsx
│   │   ├── OfferSteps.tsx
│   │   ├── ExampleTabs.tsx
│   │   ├── CapabilityGrid.tsx
│   │   ├── VisualBlock.tsx           # aiguille vers les maquettes ci-dessous
│   │   ├── mockups/
│   │   │   ├── ReportExcerpt.tsx
│   │   │   ├── ChatMockup.tsx
│   │   │   ├── DashboardMockup.tsx
│   │   │   ├── MessageThread.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── BeforeAfter.tsx
│   │   ├── IncludedExcluded.tsx
│   │   ├── CompareCallout.tsx
│   │   ├── Reassurance.tsx
│   │   ├── OfferFAQ.tsx
│   │   └── OfferCTA.tsx
│   └── common/        SectorSelector · CustomCursor · CookieBanner · SplitReveal · FadeUp · SectionHeader · Logo
├── data/
│   ├── offres/
│   │   ├── index.ts                  # liste + types + getOfferBySlug
│   │   ├── audit-ia.ts
│   │   ├── chatbot-ia.ts
│   │   ├── outil-sur-mesure.ts
│   │   ├── assistant-ia.ts
│   │   ├── accompagnement-ia.ts
│   │   └── ateliers-ia.ts
│   ├── sectors.ts
│   ├── process.ts
│   └── faq.ts
├── lib/           utils.ts · animations.ts · api.ts (client du backend)
├── hooks/         useScrollSpy.ts · useInView.ts · useReducedMotion.ts
├── types/         offer.ts
└── styles/        globals.css
```

---

## 7. Accueil — spécifications des sections

### 7.1 HeroSection — hero cinématographique (repris de la maquette)

**À reproduire à l'identique depuis `HeroSection` dans `design/maquette-source.jsx`**, porté en TypeScript avec `gsap` et `gsap/ScrollTrigger` importés depuis npm (enregistrer le plugin côté client uniquement, dans un `useLayoutEffect`/`useEffect`, avec `gsap.context()` et `ctx.revert()` au démontage).

**Principe** : la section `#hero` fait la hauteur de l'écran et est **épinglée** pendant 7 000 px de défilement (`pin: true, scrub: 1, end: "+=7000"`). Le défilement raconte une petite histoire en 4 temps :

1. **Arrivée (au chargement, sans scroll)** — fond `#070407`, grain de film (`.film-grain-daddia`) et grille crimson (`.bg-grid-daddia`, opacité 60 %). Le titre apparaît :
   - ligne 1 « **Vous perdez des heures** » en `text-hero-3d`, depuis flou 20 px + `y: 60` + `scale: 0.85` + `rotationX: -20`, durée 1,8 s, `expo.out` ;
   - ligne 2 « **sur des tâches répétitives.** » en `text-hero-crimson`, révélée par un clip-path de gauche à droite (1,4 s, `power4.inOut`), qui démarre 1 s avant la fin de la ligne 1 ;
   - les deux lignes en `font-syne font-extrabold`, `text-5xl md:text-7xl lg:text-[6rem]`, `leading-[1.05]`. La ligne 2 utilise `fontFamily: "system-ui"` dans la maquette, ce qui crée un contraste voulu entre les deux lignes : le conserver.
2. **La carte monte** — au scroll, le titre et la grille grossissent (×1,15), se floutent et passent à 20 % d'opacité, pendant qu'une grande carte `.card-daddia` (85 vw × 85 vh, coins 40 px ; 92 vw × 92 vh et 32 px sur mobile) monte du bas de l'écran puis s'agrandit en plein écran (coins à 0). Un reflet crimson (`.card-sheen-daddia`) suit la souris.
3. **Le contenu de la carte se dévoile** — grille de 3 colonnes sur ordinateur (empilée sur mobile) :
   - **à gauche** : « Pas de promesses. » / « **Des outils qui tournent.** » (crimson), en `font-syne font-bold text-2xl md:text-3xl lg:text-4xl`, puis (à partir de md) le texte : « **daddIA** déploie des automatisations IA concrètes dans votre activité — intégrations, scripts, outils sur mesure. Basés à Nice, disponibles partout en France. » ;
   - **au centre** : un **téléphone de tableau de bord** (300 × 520 px, coins 2 rem, dégradé `#1A0F20 → #0A0408`) qui arrive en 3D (`rotationX: 50, rotationY: -20, z: -500` → 0, `expo.out`). Il contient, révélés en cascade (`back.out(1.2)`, 0,15 s d'écart) :
     - l'en-tête « TABLEAU DE BORD / Automatisation IA » avec une pastille « AI » ;
     - un anneau de progression crimson (`.progress-arc`, `strokeDashoffset` 314 → 40) avec au centre un compteur qui monte de 0 à **5 h** « récupérées/semaine » ;
     - une liste de tâches (`.dashboard-widget`, `.task-row`) : 📧 Relances clients ✓ · 📄 Devis auto-générés ✓ · 📊 Rapports hebdo ✓ · 📅 Planning optimisé (pas encore cochée) ;
     - en bas, un point vert qui pulse : « 3 outils actifs en production » ;
   - deux **badges flottants** (`.floating-badge-daddia`) qui débordent du téléphone, arrivés avec `back.out(1.5)` : en haut à gauche « ⚡ Email automatisé — Relance envoyée · il y a 2 min » ; en bas à droite « 📄 Devis généré — En 47 secondes · 100% auto » ;
   - **à droite** : le wordmark géant « dadd**IA** » en `font-syne font-black uppercase tracking-tighter text-6xl md:text-[6rem] lg:text-[8rem]`, « dadd » en `.text-card-white`, « IA » en crimson.
4. **Le rideau se referme sur l'appel à l'action** — après une pause, le contenu de la carte recule et disparaît, la carte reprend sa taille de départ, et un bloc final apparaît en se défloutant (30 px → 0) :
   - H2 « **Commençons ensemble.** » en `text-hero-crimson`, `font-syne font-bold text-4xl md:text-6xl lg:text-7xl` ;
   - texte : « Un seul appel de découverte. Un plan d'action concret. Des outils qui tournent en production. » ;
   - boutons `btn-daddia-primary` « Nous contacter » → `#contact` et `btn-daddia-outline` « Voir les offres » → `#offres` (`px-8 py-4 rounded-[1.25rem] font-syne font-semibold text-lg`) ;
   - enfin la carte s'en va vers le haut et la page continue sur la section suivante.

**Timeline GSAP de référence** (celle de la maquette, à reprendre telle quelle) :

```typescript
gsap.set('.hero-tagline1', { autoAlpha: 0, y: 60, scale: 0.85, filter: 'blur(20px)', rotationX: -20 })
gsap.set('.hero-tagline2', { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' })
gsap.set('.main-card-daddia', { y: window.innerHeight + 200, autoAlpha: 1 })
gsap.set(['.card-col-left', '.card-col-right', '.dashboard-scroll', '.floating-b', '.dash-widget'], { autoAlpha: 0 })
gsap.set('.cta-final', { autoAlpha: 0, scale: 0.8, filter: 'blur(30px)' })

gsap.timeline({ delay: 0.3 })
  .to('.hero-tagline1', { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', rotationX: 0, ease: 'expo.out' })
  .to('.hero-tagline2', { duration: 1.4, clipPath: 'inset(0 0% 0 0)', ease: 'power4.inOut' }, '-=1.0')

gsap.timeline({ scrollTrigger: { trigger: container, start: 'top top', end: '+=7000', pin: true, scrub: 1, anticipatePin: 1 } })
  .to(['.hero-text-wrap', '.bg-grid-daddia'], { scale: 1.15, filter: 'blur(20px)', opacity: 0.2, ease: 'power2.inOut', duration: 2 }, 0)
  .to('.main-card-daddia', { y: 0, ease: 'power3.inOut', duration: 2 }, 0)
  .to('.main-card-daddia', { width: '100%', height: '100%', borderRadius: '0px', ease: 'power3.inOut', duration: 1.5 })
  .fromTo('.dashboard-scroll', { y: 300, z: -500, rotationX: 50, rotationY: -20, autoAlpha: 0, scale: 0.6 },
                               { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 2.5 }, '-=0.8')
  .fromTo('.dash-widget', { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: 'back.out(1.2)', duration: 1.5 }, '-=1.5')
  .to('.progress-arc', { strokeDashoffset: 40, duration: 2, ease: 'power3.inOut' }, '-=1.2')
  .to('.counter-h', { innerHTML: 5, snap: { innerHTML: 1 }, duration: 2, ease: 'expo.out' }, '-=2.0')
  .fromTo('.floating-b', { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'back.out(1.5)', duration: 1.5, stagger: 0.2 }, '-=2.0')
  .fromTo('.card-col-left', { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: 'power4.out', duration: 1.5 }, '-=1.5')
  .fromTo('.card-col-right', { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 1.5 }, '<')
  .to({}, { duration: 2.5 })
  .set('.hero-text-wrap', { autoAlpha: 0 })
  .set('.cta-final', { autoAlpha: 1 })
  .to({}, { duration: 1.5 })
  .to(['.dashboard-scroll', '.floating-b', '.card-col-left', '.card-col-right'], { scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: 'power3.in', duration: 1.2, stagger: 0.05 })
  .to('.main-card-daddia', { width: mobile ? '92vw' : '85vw', height: mobile ? '92vh' : '85vh', borderRadius: mobile ? '32px' : '40px', ease: 'expo.inOut', duration: 1.8 }, 'pullback')
  .to('.cta-final', { scale: 1, filter: 'blur(0px)', ease: 'expo.inOut', duration: 1.8 }, 'pullback')
  .to('.main-card-daddia', { y: -window.innerHeight - 300, ease: 'power3.in', duration: 1.5 })
```

**Exigences techniques supplémentaires** (absentes de la maquette, à ajouter) :

- **`prefers-reduced-motion`** : pas d'épinglage ni d'animation. Afficher une version statique empilée : le titre, la carte avec son contenu visible (compteur à 5 h, anneau rempli, badges visibles), puis le bloc « Commençons ensemble. ».
- **SSR** : aucun accès à `window` pendant le rendu serveur. Les classes `.gsap-reveal` cachent les éléments jusqu'à l'initialisation ; si JavaScript est désactivé, prévoir une règle `<noscript>` qui les rend visibles.
- **Accessibilité** : un seul `<h1>` réel sur la page (les deux lignes du titre dans le même `h1`, chacune dans un `<span>` animable). Les émojis décoratifs ont `aria-hidden`. Les boutons du bloc final sont atteignables au clavier.
- **Mobile** : conserver l'animation (comme dans la maquette), mais vérifier qu'elle reste fluide ; si un appareil est lent, réduire `end` à `+=4500`.
- Appeler `ScrollTrigger.refresh()` après le chargement des polices pour que les hauteurs soient justes.

### 7.2 WhatIACanDo — « Ce que l'IA peut faire pour vous »

- **En-tête** (textes de la maquette) : surtitre « Ce que l'IA peut faire pour vous », H2 « Votre secteur. Vos problèmes. » / « **Des solutions concrètes.** » (2e ligne en crimson), sous-titre « Sélectionnez votre secteur et découvrez comment l'IA peut s'intégrer dans votre quotidien dès maintenant. »
- Un sélecteur de secteur (pastilles avec icône, centrées) fait apparaître, avec un fondu de 0,3 s, une grille de 2 cartes. Chaque carte, comme dans la maquette : petit libellé « SITUATION ACTUELLE » (`text-[#6B6075]`) et le problème en `text-[#9A8FA5]`, une flèche crimson, petit libellé « SOLUTION DADDIA » (`text-[#C8103C]/70`) et la solution en `text-[#F0EBF4]`, puis le badge de gain vert.
- Chaque carte se termine par un lien discret « Quelle offre pour ça ? », qui pointe vers la page de l'offre la plus adaptée.
- Le contenu des cas d'usage est **inchangé par rapport à la v1**. Seul le champ `offerSlug` est ajouté.

```typescript
// data/sectors.ts
export const sectors = [
  { id: 'commerce', label: 'Commerce', icon: 'ShoppingBag', useCases: [
    { problem: 'Vous envoyez vos relances clients à la main une par une',
      solution: 'Un outil qui détecte les impayés et envoie des relances personnalisées automatiquement',
      gain: '3h récupérées par semaine', offerSlug: 'assistant-ia' },
    { problem: 'Vos devis prennent 30 minutes à rédiger',
      solution: 'Génération automatique de devis à partir d\'une description en quelques secondes',
      gain: 'Devis en moins de 2 minutes', offerSlug: 'outil-sur-mesure' },
  ]},
  { id: 'immobilier', label: 'Immobilier', icon: 'Building2', useCases: [
    { problem: 'Vos locataires vous posent toujours les mêmes questions',
      solution: 'Un assistant qui répond automatiquement aux questions fréquentes 24h/24',
      gain: 'La majorité des emails traités automatiquement', offerSlug: 'chatbot-ia' },
    { problem: 'Vos états des lieux prennent 2h à rédiger',
      solution: 'Génération automatique du rapport à partir de photos et notes vocales',
      gain: 'Rapports rédigés en quelques minutes', offerSlug: 'outil-sur-mesure' },
  ]},
  { id: 'beaute', label: 'Beauté & Bien-être', icon: 'Sparkles', useCases: [
    { problem: 'Vous gérez vos rappels de rendez-vous à la main',
      solution: 'Rappels automatiques par SMS/email avant chaque rendez-vous',
      gain: 'Moins de rendez-vous manqués', offerSlug: 'assistant-ia' },
    { problem: 'Vos fiches clients sont éparpillées et incomplètes',
      solution: 'Un espace unique avec l\'historique des soins de chaque cliente',
      gain: 'Historique complet en 1 clic', offerSlug: 'outil-sur-mesure' },
  ]},
  { id: 'btp', label: 'BTP & Artisanat', icon: 'Hammer', useCases: [
    { problem: 'Vos chiffrages prennent des heures',
      solution: 'Outil de chiffrage basé sur votre bibliothèque de prestations',
      gain: 'Devis bien plus rapides', offerSlug: 'outil-sur-mesure' },
    { problem: 'Vos rapports de chantier sont toujours en retard',
      solution: 'Dictée vocale + génération automatique du rapport de fin de journée',
      gain: '45 min gagnées par jour', offerSlug: 'assistant-ia' },
  ]},
  { id: 'services', label: 'Services', icon: 'Briefcase', useCases: [
    { problem: 'Vous passez des heures à trier et répondre aux emails',
      solution: 'Un assistant qui trie, priorise et prépare les réponses à vos emails',
      gain: 'Plusieurs heures récupérées par semaine', offerSlug: 'assistant-ia' },
    { problem: 'Vos comptes-rendus de réunion prennent du temps à rédiger',
      solution: 'Transcription + compte-rendu structuré généré automatiquement',
      gain: 'CR prêt avant de sortir de la salle', offerSlug: 'accompagnement-ia' },
  ]},
]
```

> Les gains sont formulés de façon indicative. Au-dessus des cartes, afficher une petite mention : *« Exemples types — les gains réels dépendent de votre activité. »*

### 7.3 ProcessSection

Comme dans la maquette : fond `#0F0B0F`, surtitre « Comment ça marche », H2 « De zéro à l'outil en production ». 5 étapes en 5 colonnes sur ordinateur, verticales sur mobile. Chaque étape : un rond de 64 px `bg-[#18121A] border border-[#C8103C]/20` avec le numéro en Syne crimson, le titre en Syne et la description en `text-sm text-[#9A8FA5]`. Une ligne en dégradé crimson → transparent relie les ronds (horizontale sur ordinateur, verticale sur mobile). Apparition en cascade (0,1 s d'écart).

```typescript
export const steps = [
  { num: '01', title: 'Contact', desc: 'Vous nous écrivez. On répond sous 24h.' },
  { num: '02', title: 'Diagnostic', desc: 'On analyse vos process et ce qui vous fait perdre du temps.' },
  { num: '03', title: 'Recommandations', desc: 'Plan d\'action clair, priorisé, sans jargon.' },
  { num: '04', title: 'Mise en place', desc: 'On construit. Vous validez. On déploie en production.' },
  { num: '05', title: 'Résultats', desc: 'L\'outil tourne. Vous gagnez du temps. On reste disponibles.' },
]
```

### 7.4 OffresSection — les 6 cartes

- **En-tête** (maquette) : surtitre « Nos offres », H2 « Commencez où vous êtes », sous-titre « **Six** façons de travailler ensemble. Commencez petit, sans engagement long. »
- Style des cartes repris de la maquette (`OffreCard`) : `rounded-2xl p-6 bg-[#18121A] border border-white/7`, tag en pastille, titre `font-syne font-bold text-xl`, description `text-sm text-[#9A8FA5]`, bouton pleine largeur en bas (`min-h-[44px] rounded-lg`). Apparition en cascade (0,08 s d'écart).
- Grille de 3 colonnes sur ordinateur (2 rangées de 3), 2 colonnes sur tablette, 1 colonne sur mobile.
- Chaque carte contient :
  - un **tag** : `PONCTUEL` en crimson ou `ABONNEMENT` en violet ;
  - le nom de l'offre ;
  - une accroche courte ;
  - **3 points clés** (`cardHighlights`), affichés dans le bloc repliable « Ce qui est inclus » de la maquette (séparateur `border-t border-white/10`, coches crimson, chevron qui pivote) ;
  - un bouton principal **« Découvrir l'offre → »** vers `/offres/[slug]` ;
  - un lien secondaire « Prendre contact » vers `/#contact?offre=[slug]`.
- **Carte mise en avant** : l'Audit IA (dans la maquette, c'était le SaaS : la v2 change ce choix), avec le badge « Point de départ recommandé » au style du badge « Recommandé » de la maquette, `border-[#C8103C]/30 shadow-[0_0_40px_rgba(200,16,60,0.08)] hover:shadow-[0_0_60px_rgba(200,16,60,0.14)]`, et son bouton principal plein crimson (les autres cartes ont un bouton bordé `border-white/10 hover:border-[#C8103C]/50`).
- Au survol : `border-border-hover` et `bg-bg-hover`, transition de 200 ms.
- **Aucun prix.**
- Les données des cartes (`cardTitle`, `cardPitch`, `cardHighlights`) viennent de `data/offres/*.ts` (voir §8.1). Elles ne sont pas dupliquées ailleurs.

### 7.5 StackSection

Comme dans la maquette : fond `#0F0B0F`, surtitre « Stack technique », H2 « Des outils éprouvés », sous-titre « On utilise les meilleures technologies disponibles. Pas des frameworks exotiques — des outils fiables, maintenables, en production. » Des pastilles `rounded-full border border-white/10 text-sm text-[#9A8FA5] hover:border-[#C8103C]/50 hover:text-[#F0EBF4]` apparaissent l'une après l'autre (0,04 s d'écart) :

```typescript
const stack = ['Python','FastAPI','Django','Claude API','OpenAI API','RAG','LangChain','PostgreSQL','SQL','GitHub','N8N','Make','Docker','Nginx','VPS']
```

### 7.6 FAQSection (accueil)

Comme dans la maquette : fond `#0F0B0F`, conteneur `max-w-3xl`, surtitre « Questions fréquentes », H2 « Vos questions, nos réponses ». Accordéon au style de la maquette (cartes `bg-[#18121A] border-white/7 rounded-xl px-6`, question en Syne semibold, chevron crimson), une seule question ouverte à la fois. Le **contenu** est celui ci-dessous (il remplace celui de la maquette).

```typescript
export const faq = [
  { q: "Est-ce que l'IA peut vraiment aider mon activité ?",
    a: "C'est exactement l'objet de l'audit. On analyse vos process et on identifie précisément les tâches qui peuvent être automatisées dans votre activité. Si on ne trouve rien d'utile, on vous le dit clairement." },
  { q: "Je n'y connais rien en IA, est-ce un problème ?",
    a: "Non. Tout est expliqué sans jargon, chaque outil est livré avec un mode d'emploi et un appel de prise en main. C'est conçu pour des non-techniciens." },
  { q: "Par où commencer si je ne sais pas de quoi j'ai besoin ?",
    a: "Par l'Audit IA. En une semaine, vous savez où l'IA peut vous faire gagner du temps, comment, et combien. C'est l'entrée la plus simple et la moins risquée." },
  { q: "Quelle différence entre le Chatbot, l'Assistant IA et l'Accompagnement ?",
    a: "Le Chatbot parle à vos clients. L'Assistant IA travaille pour vous (emails, dossiers, relances, prospection). L'Accompagnement vous apprend à utiliser l'IA vous-même." },
  { q: "Combien de temps dois-je y consacrer ?",
    a: "Très peu. Pour un audit : un appel de découverte et un appel de restitution. Pour un outil sur mesure : un cadrage et quelques validations à des étapes clés. On s'occupe du reste." },
  { q: "Vous êtes basés où ? Peut-on se rencontrer ?",
    a: "À Nice (06). Le présentiel est possible dans toute la région PACA ; le reste se fait en visio, partout en France." },
  { q: "Mes données sont-elles en sécurité ?",
    a: "Oui. Hébergement en Europe, connexions chiffrées, accès limités au strict nécessaire et révocables à tout moment." },
]
```

### 7.7 ContactSection

**En-tête** (maquette) : surtitre « Contact », H2 « Parlons de votre projet », sous-titre « Réponse sous 24h en semaine. Pas de pression, pas de démo de 45 minutes — juste une conversation. »

La section est sur 2 colonnes sur ordinateur (`gap-12`), 1 colonne sur mobile, au style de la maquette (`ContactSection`) : libellés `text-sm text-[#9A8FA5]`, champs au style du §3.4, erreurs en `text-xs text-[#F03068]`, placeholders « Laurent Martin », « Mon entreprise », « vous@entreprise.fr », « Décrivez votre situation, vos tâches répétitives, vos questions... ». État de succès comme dans la maquette : rond crimson avec ✓, « Message envoyé ! », « On vous répond dans les 24h. »

**Formulaire (colonne de gauche)** — React Hook Form + Zod :

```typescript
export const OFFER_IDS = ['audit-ia','chatbot-ia','outil-sur-mesure','assistant-ia','accompagnement-ia','ateliers-ia','autre'] as const

const contactSchema = z.object({
  nom: z.string().trim().min(2, 'Nom requis').max(100),
  entreprise: z.string().trim().min(1, 'Entreprise requise').max(150),
  email: z.string().trim().email('Email invalide').max(254),
  offre: z.enum(OFFER_IDS),
  message: z.string().trim().min(10, 'Message trop court').max(3000),
  consentement: z.literal(true, { errorMap: () => ({ message: 'Merci d\'accepter pour qu\'on puisse vous répondre' }) }),
  website: z.string().max(0).optional(), // champ piège anti-spam, caché en CSS, jamais affiché
})
```

**Champs** :

- Prénom et nom.
- Entreprise.
- Email professionnel.
- Offre qui vous intéresse : liste déroulante. Elle est pré-remplie avec la valeur de `?offre=` dans l'URL, si elle est présente.
- Message.
- Case de consentement : « J'accepte que daddIA utilise ces informations pour me recontacter. » avec un lien vers `/confidentialite`.
- Bouton « Envoyer → ».

**Comportement** :

- L'envoi se fait par `POST ${NEXT_PUBLIC_API_BASE}/contact` (fonction `lib/api.ts`).
- Après l'envoi :
  - en cas de succès, un message de confirmation s'affiche dans la page ;
  - en cas d'erreur 429 : « Trop de demandes, réessayez plus tard » ;
  - pour toute autre erreur : un message générique avec l'adresse email en alternative.
- Le bouton est désactivé pendant l'envoi.

**Colonne de droite** :

- Une carte `bg-[#18121A] border-white/7 rounded-xl p-6` : titre « Ou réservez un appel gratuit », texte « 30 minutes pour faire connaissance, comprendre votre activité et voir si on peut vous aider. », bouton bordé avec icône calendrier « Réserver un créneau gratuit » → `NEXT_PUBLIC_CAL_URL`.
- Un séparateur « ou » entre deux traits fins.
- Trois lignes avec icône crimson : ✉️ contact@daddia.fr (lien mailto) · 📍 Nice (06) · PACA · France · 🕒 Réponse sous 24h en semaine.

### 7.8 Composants communs

Le curseur et la bannière cookies ne figurent pas dans la maquette : ils sont ajoutés, dans le même style.

- **CustomCursor** :
  - actif uniquement sur ordinateur (`@media (hover: hover)`), avec `cursor: none` sur le body ;
  - un point crimson de 8 px qui suit la souris avec un ressort (stiffness 500, damping 28) ;
  - un anneau de 32 px, crimson à 40 %, qui suit avec un ressort plus lent (200/20) ;
  - au survol d'un lien ou d'un bouton, l'anneau passe à 48 px et le point disparaît.
- **CookieBanner** :
  - apparaît 1,5 s après le chargement si `localStorage['daddia-cookies']` est vide ;
  - texte : « Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie de suivi. » ;
  - boutons « Accepter » et « Fermer » ;
  - glisse depuis le bas de l'écran ;
  - les accès au `localStorage` sont entourés d'un try/catch.
- **FadeUp** et **SplitReveal** : voir §3.4 (repris de la maquette). `SplitReveal` est appliqué sur tous les H2.

### 7.9 Footer

Repris de la maquette : `border-t border-white/7 py-12 bg-[#070407]`, tout centré, en `text-[#6B6075]` :

```
                     dadd IA  (wordmark)
        "Pas de promesses. Des outils qui tournent."  (italique)
                  Nice (06) · PACA · France
  Offres : Audit IA · Chatbot · Outil sur mesure · Assistant IA · Accompagnement · Ateliers   ← ajout v2
             LinkedIn · YouTube · ✉️ (icône mailto)
             Mentions légales · Confidentialité                                              ← ajout v2
  ──────────────────────────────────────────────────────────
              © 2026 daddIA — Micro-entreprise
```

---

## 8. Pages offres — gabarit commun

### 8.1 Type de données (`types/offer.ts`)

```typescript
export type OfferSlug = 'audit-ia' | 'chatbot-ia' | 'outil-sur-mesure' | 'assistant-ia' | 'accompagnement-ia' | 'ateliers-ia'
export type OfferKind = 'ponctuel' | 'abonnement'
export type SectorId = 'institut' | 'immobilier' | 'btp'   // fil rouge des exemples

export interface OfferStep { title: string; desc: string }
export interface OfferExample {
  sector: SectorId
  title: string            // ex. « Institut de beauté, 4 employées »
  before?: string
  what: string             // ce que l'offre apporte concrètement
  result?: string          // gain estimé ou effet visible
  timeline?: { label: string; text: string }[]  // utilisé par l'Accompagnement (mois 1/2/3)
}
export interface CapabilityGroup { icon: string; title: string; items: string[] }  // icône Lucide
export type VisualBlock =
  | { type: 'report-excerpt'; title: string; lines: string[] }
  | { type: 'chat'; title?: string; messages: { from: 'client' | 'bot'; text: string }[] }
  | { type: 'message-thread'; title?: string; bySector?: Partial<Record<SectorId, { time?: string; from: 'user' | 'assistant'; text: string }[]>>; messages?: { time?: string; from: 'user' | 'assistant'; text: string }[] }
  | { type: 'dashboard'; title: string; widgets: { label: string; value: string; hint?: string }[] }
  | { type: 'timeline'; title: string; items: { label: string; title: string; text: string }[] }
  | { type: 'before-after'; title: string; before: { label: string; text: string }; after: { label: string; text: string } }
  | { type: 'cards'; title: string; items: { title: string; text: string }[] }
  | { type: 'private-ai'; brandName: string; sources: { label: string; enabled: boolean }[]; suggestions: string[]; messages: { from: 'user' | 'assistant'; text: string }[] }
  | { type: 'security-grid'; title: string; items: { icon: string; title: string; text: string }[]; footer?: string }

export interface Offer {
  slug: OfferSlug
  kind: OfferKind
  name: string
  subtitle?: string
  duration: string                 // ex. « 3 à 7 jours ouvrés »
  // Carte de l'accueil
  cardPitch: string
  cardHighlights: [string, string, string]
  // Page détaillée
  hook: string
  forWhom: string[]
  steps: OfferStep[]
  examples: OfferExample[]
  capabilities?: CapabilityGroup[]
  visuals: VisualBlock[]
  included: string[]
  excluded: string[]
  compare?: { title: string; rows: { label: string; text: string }[]; note?: string }
  reassurance?: { title: string; items: string[] }
  faq: { q: string; a: string }[]
  related: OfferSlug[]             // 1 ou 2 offres liées, affichées en bas de page
  seo: { title: string; description: string }
}
```

### 8.2 Ordre des sections d'une page offre

Chaque bloc est optionnel s'il est absent des données.

1. **OfferHero** (même ambiance que le hero de l'accueil, sans l'épinglage : fond `#070407` avec `.film-grain-daddia` et `.bg-grid-daddia`, H1 en `text-hero-3d`, sous-titre en `text-hero-crimson`, boutons `btn-daddia-primary` / `btn-daddia-outline`) :
   - fil d'Ariane « Offres / [nom] » ;
   - tag Ponctuel ou Abonnement ;
   - H1 = `name`, sous-titre = `subtitle` ;
   - texte d'accroche = `hook` ;
   - pastille de durée ;
   - bouton « Réserver un appel gratuit » (Cal.com) et lien « Poser une question » (`/#contact?offre=slug`).
2. **ForWhom** : « C'est pour vous si… », une liste à coches.
3. **OfferSteps** : « Comment ça se passe », des étapes numérotées avec la durée rappelée.
4. **CapabilityGrid** : uniquement pour l'Assistant IA. Grille de cartes icône + titre + liste.
5. **ExampleTabs** :
   - titre « Exemples de situations » ;
   - **mention obligatoire sous le titre : « Exemples illustratifs, pour vous aider à vous projeter. »** ;
   - 3 onglets : Institut de beauté / Agence immobilière / Artisan BTP ;
   - le visiteur garde le même secteur sélectionné d'une page offre à l'autre : stocker le choix en `sessionStorage`, dans un try/catch, avec « institut » par défaut.
6. **VisualBlock(s)** : les maquettes en HTML/CSS, avec le style d'une interface réelle :
   - bulles de conversation WhatsApp ;
   - extrait de rapport ;
   - tableau de bord ;
   - frise ;
   - avant/après.
7. **IncludedExcluded** : deux colonnes, ✓ en vert et ✗ en texte atténué.
8. **CompareCallout / Reassurance** : un encadré quand il est défini.
9. **OfferFAQ** : accordéon.
10. **OfferCTA** : grand bloc final, « Parlons de votre situation », avec le bouton Cal.com et le lien vers le formulaire. En dessous, les cartes des offres liées (`related`).

**Règles de contenu :**

- Jamais de prix.
- Jamais de témoignage inventé : les exemples sont toujours présentés comme illustratifs.
- Aucun jargon technique dans les pages offres.
- Le mot « IA » est autorisé ; « RAG », « LLM », « API » et « pipeline » sont interdits dans ces pages.

### 8.3 Exigence visuelle des exemples — PRIORITÉ HAUTE

Les exemples et les mises en situation du §9 sont **le cœur des pages offres**. Ils doivent être **hyper visuels** : le visiteur doit *voir* la situation, pas lire un paragraphe. Un exemple rendu comme un simple bloc de texte est considéré comme **non conforme**.

**Règle générale** : chaque exemple devient une **scène visuelle**, jamais un paragraphe.

- **Avant / Après** :
  - deux panneaux côte à côte sur ordinateur, empilés sur mobile ;
  - côté « Avant » : teinte terne, grisée, avec une icône de la contrainte (horloge, pile de papiers, téléphone qui sonne) ;
  - côté « Après » : teinte vive, accent crimson, avec une icône de la solution ;
  - une flèche animée relie les deux panneaux.
- **Badge de gain** : gros chiffre mis en avant (« ~5 h / semaine »), avec un compteur animé à l'apparition et une couleur `state.success`.
- **Onglets de secteur** :
  - chaque onglet affiche une icône Lucide et un nom : `Sparkles` Institut, `Building2` Immobilier, `Hammer` Artisan BTP ;
  - un **mini-avatar** (initiales dans un cercle coloré) donne un visage au personnage ;
  - le changement d'onglet est animé (fondu et glissement).
- **Conversations** (Chatbot, Assistant IA) :
  - rendues **dans un cadre de téléphone en CSS** : encoche, barre d'état, en-tête de contact avec avatar et statut « en ligne » ;
  - bulles façon WhatsApp : client à gauche en gris, assistant à droite en accent ;
  - horodatage sur chaque message ;
  - **indicateur « en train d'écrire… »** (trois points animés) avant chaque réponse ;
  - les messages apparaissent un par un quand le bloc entre à l'écran ;
  - notes vocales affichées comme une **forme d'onde** avec une durée (« 0:42 ») ;
  - pièces jointes (photos, devis) affichées comme de petites vignettes ou des cartes de document.
- **Aperçu de rapport** (Audit) :
  - rendu comme une **page de document** : fond clair légèrement incliné, ombre portée, en-tête « daddIA — Rapport d'audit » ;
  - les chiffres « Aujourd'hui / Demain » sous forme de **barres comparatives** ;
  - des pastilles de difficulté (faible / moyenne / forte).
- **Tableau de bord** (Outil sur mesure) :
  - rendu comme une **fenêtre d'application** : barre de navigateur avec trois points, barre latérale, cartes KPI ;
  - un mini-graphique en SVG ;
  - une liste « Factures impayées » avec des pastilles de statut colorées.
- **Une journée avec votre assistant** :
  - **ligne du temps verticale** avec les heures à gauche et la conversation à droite, dans le cadre de téléphone ;
  - un soleil qui avance de 7h30 à 18h00 pendant le scroll.
- **Mémoire de l'assistant** :
  - comparaison « Semaine 1 / Mois 3 » sous forme de deux téléphones côte à côte ;
  - une **jauge « Ce qu'il connaît de vous »** qui se remplit (clients, tarifs, habitudes, préférences).
- **Parcours 3 mois** (Accompagnement) :
  - frise horizontale avec 3 jalons ;
  - une barre de progression qui se remplit au scroll ;
  - sous chaque mois, une **mini-carte de réalisation** illustrée (icône et résultat concret).
- **Déroulé d'atelier** :
  - **barre horizontale proportionnelle aux durées** (30 min, 1 h 30, 45 min, 15 min) ;
  - une couleur par phase ;
  - au survol ou au toucher, le contenu de la phase s'affiche.
- **Interface privée** (`private-ai`, Assistant IA) :
  - une **fenêtre d'application de bureau** façon ChatGPT, à l'image du client fictif : logo en initiales et nom, par exemple « Assistant — Rénov'Azur » ;
  - **à gauche**, une barre latérale « Sources connectées » avec des interrupteurs : actifs en vert, désactivés en gris avec un cadenas ;
  - **au centre**, la conversation :
    - les réponses citent leurs sources sous forme de petites pastilles (« 📄 Contrat fournisseur.pdf », « ✉️ Mail du 12/09 ») ;
    - une réponse contient un mini-tableau, par exemple la liste des devis non signés ;
  - **en bas** :
    - un champ de saisie ;
    - des **suggestions cliquables**, qui relancent l'animation de la question correspondante ;
    - un bouton « + Apprendre quelque chose ». Au clic, une petite fenêtre s'ouvre avec une zone de dépôt de fichier et le champ « Retiens que… ».
  - Sur mobile, la barre latérale devient un tiroir.
- **Sécurité** (`security-grid`) :
  - grille de cartes avec des icônes Lucide, apparition en cascade ;
  - un **cadenas central animé** qui se ferme quand la section entre à l'écran ;
  - un ton rassurant, jamais anxiogène.
- **Capacités de l'assistant** :
  - grille de cartes avec une grande icône ;
  - au survol, la carte se retourne ou s'ouvre et montre un **mini-exemple de message**.

**Contraintes à respecter :**

- Tout est fait en HTML/CSS/SVG et Framer Motion, **sans aucune image bitmap**.
- Toutes les maquettes restent **lisibles sur mobile** (cadre de téléphone à la largeur de l'écran, minimum 320 px).
- Chaque scène porte la mention discrète « Exemple illustratif ».
- `prefers-reduced-motion` est respecté : les scènes s'affichent directement dans leur état final.
- Les maquettes sont des composants réutilisables (`components/offer/mockups/`) alimentés par les données du §9. Ne jamais coder un exemple en dur dans une page.

### 8.4 SEO

- `<title>` et `meta description` viennent de `seo` ;
- balise canonical ;
- balises Open Graph de base.

---

## 9. Contenu des 6 pages offres

> Claude Code : transcrire chaque bloc ci-dessous **fidèlement** dans `data/offres/<slug>.ts`, en suivant le type `Offer` du §8.1. Le texte est validé : ne pas le reformuler.

### 9.1 Audit IA — `audit-ia`

- **kind** : ponctuel. **Durée** : « Environ une semaine ».
- **Sous-titre** : « Savoir exactement où l'IA peut vous faire gagner du temps »
- **cardPitch** : « On analyse votre activité et on vous dit précisément où, comment et combien de temps l'IA peut vous faire gagner. »
- **cardHighlights** : « Un appel pour comprendre votre activité » · « Un rapport clair avec 3 à 5 pistes chiffrées » · « Un appel pour tout vous expliquer »
- **Accroche** : « Vous sentez que l'IA pourrait vous faire gagner du temps, mais vous ne savez pas par où commencer. En une semaine, on vous dit exactement où, comment, et combien de temps vous allez récupérer. »
- **C'est pour vous si…**
  - vous refaites les mêmes tâches chaque semaine (relances, devis, réponses aux emails) ;
  - vous entendez parler d'IA partout sans savoir ce que ça change *pour vous* ;
  - vous voulez y voir clair avant de dépenser dans un outil.
- **Comment ça se passe** :
  1. *Un court questionnaire* : 5 questions pour préparer l'échange.
  2. *Un appel de découverte (45 à 60 min)* : vous nous expliquez votre quotidien, on repère ce qui vous fait perdre du temps.
  3. *L'analyse* : en 3 à 5 jours, on étudie vos process et on chiffre chaque piste.
  4. *L'appel de restitution* : on vous présente le rapport et on répond à toutes vos questions.
  5. *7 jours de questions* : vous pouvez nous écrire, on répond sous 24 h.
- **Exemples** :
  - **Institut de beauté, 4 employées.**
    - *Avant* : les rendez-vous se prennent au téléphone pendant les soins, les rappels sont faits à la main et les absences coûtent cher.
    - *Ce que l'audit identifie* : des rappels SMS automatiques, des réponses automatiques aux questions sur Instagram et une relance des clientes qui ne sont pas revenues depuis 3 mois.
    - *Gain estimé* : environ 5 h par semaine et nettement moins d'absences.
  - **Agence immobilière, 3 agents.**
    - *Avant* : une quarantaine de mails de demandes de visite par semaine, triés à la main, et des comptes-rendus de visite rédigés le soir.
    - *Ce que l'audit identifie* : un tri automatique des demandes (sérieuses ou non, budget, secteur) et un compte-rendu généré à partir d'une note vocale de 2 minutes.
    - *Gain estimé* : environ 6 h par semaine.
  - **Artisan BTP, 8 salariés.**
    - *Avant* : les devis sont faits le dimanche soir et 15 factures attendent d'être relancées.
    - *Ce que l'audit identifie* : un devis pré-rempli à partir des notes de chantier et des relances de paiement automatiques et polies.
    - *Gain estimé* : environ 4 h par semaine, et la trésorerie rentre plus vite.
- **Visuel** (`report-excerpt`) : titre « Aperçu du rapport ». Lignes :
  - « Opportunité n°2 — Relances de factures automatiques » ;
  - « Aujourd'hui : 3 h par semaine » ;
  - « Demain : 15 min de vérification » ;
  - « Difficulté : faible » ;
  - « Mise en place : moins d'une semaine ».
- **Inclus** :
  - l'appel de découverte ;
  - un rapport clair en 5 parties (votre situation, le diagnostic, les pistes IA, le plan d'action, les prochaines étapes) ;
  - l'appel de restitution ;
  - 7 jours de questions par email ;
  - une proposition de suite si c'est pertinent.
- **Non inclus** :
  - le développement des outils ;
  - le suivi au-delà de 7 jours ;
  - la formation des équipes.
- **FAQ** :
  - « Je n'utilise même pas ChatGPT, c'est grave ? » → « Non, c'est justement pour ça que l'audit existe. On part de votre quotidien, pas de la technologie. »
  - « Et si vous ne trouvez rien d'utile pour moi ? » → « On vous le dit franchement lors de l'appel de découverte, avant que vous ne vous engagiez. »
  - « Est-ce que je suis obligé de faire développer quelque chose ensuite ? » → « Non. Le rapport vous appartient : vous pouvez l'appliquer seul, avec nous, ou avec quelqu'un d'autre. »
  - « Que faites-vous de mes données ? » → « Elles servent uniquement à préparer votre rapport. Elles restent confidentielles et ne sont jamais partagées. »
- **related** : `assistant-ia`, `outil-sur-mesure`.
- **seo.title** : « Audit IA pour TPE et PME — daddIA, Nice »

### 9.2 Chatbot IA personnalisé — `chatbot-ia`

- **kind** : ponctuel. **Durée** : « 7 à 10 jours ».
- **Sous-titre** : « Un assistant qui répond à vos clients, jour et nuit »
- **cardPitch** : « Un assistant sur votre site ou WhatsApp qui répond aux questions, trie les demandes et prend les rendez-vous. »
- **cardHighlights** : « Répond 24h/24 aux questions fréquentes » · « Ne vous transmet que les demandes sérieuses » · « Prend les rendez-vous dans votre agenda »
- **Accroche** : « Vos clients posent toujours les mêmes questions, souvent le soir ou pendant que vous travaillez. Un assistant leur répond à votre place, 24 h sur 24, et vous transmet uniquement les demandes sérieuses, avec le rendez-vous déjà pris. »
- **C'est pour vous si…**
  - vous répondez dix fois par jour aux mêmes questions (horaires, tarifs, délais, zone d'intervention) ;
  - vous perdez des clients parce que vous répondez trop tard ;
  - vous passez du temps au téléphone avec des gens qui ne donnent jamais suite.
- **Comment ça se passe** :
  1. *Un appel de 30 min* : vous nous dites quelles questions on vous pose et ce que vous voulez savoir d'un client avant de le rencontrer.
  2. *On construit l'assistant* avec vos informations.
  3. *Vous le testez*, on ajuste.
  4. *Mise en ligne* sur votre site ou votre WhatsApp, avec une prise en main de 20 min, où on vous montre aussi comment modifier les réponses vous-même.
  5. *15 jours d'ajustements offerts.*
- **Exemples** :
  - **Institut** : « Une cliente écrit à 23 h sur WhatsApp : "Vous faites les extensions de cils ? C'est combien ?" L'assistant répond avec les tarifs, propose les créneaux libres et réserve le rendez-vous. » *Résultat* : « Le lendemain matin, la gérante trouve 3 rendez-vous pris pendant la nuit. »
  - **Immobilier** : « Un visiteur du site demande à voir un T3. L'assistant lui demande s'il veut acheter ou louer, son budget, son secteur et si son financement est validé. Si le profil est sérieux, il propose une visite. Sinon, il lui envoie des biens plus adaptés. » *Résultat* : « L'agent ne reçoit que des demandes qualifiées. »
  - **BTP** : « Un particulier demande "Vous faites les salles de bain ?". L'assistant confirme, demande la ville, la surface et des photos, puis propose un créneau pour une visite de métré. » *Résultat* : « L'artisan arrive sur place en sachant déjà de quoi il s'agit. »
- **Visuel** (`chat`) : titre « Un exemple de conversation ».
  - client : « Bonjour, vous intervenez sur Antibes ? »
  - bot : « Oui, nous intervenons sur tout le secteur Nice–Antibes. C'est pour quel type de travaux ? »
  - client : « Refaire une salle de bain »
  - bot : « Parfait. Pouvez-vous m'envoyer une ou deux photos ? Je vous propose ensuite un créneau pour une visite gratuite. »
- **Inclus** :
  - la réponse aux questions fréquentes ;
  - les questions pour qualifier chaque demande ;
  - la prise de rendez-vous ;
  - l'installation sur votre site ou votre WhatsApp ;
  - un espace pour modifier vous-même les réponses ;
  - un mini mode d'emploi ;
  - 15 jours d'ajustements.
- **Non inclus** :
  - la connexion à votre logiciel de gestion ;
  - la logique métier complexe. Pour ces besoins, voir [Votre outil sur mesure](/offres/outil-sur-mesure).
- **FAQ** :
  - « Et s'il répond n'importe quoi ? » → « Il ne répond qu'à partir de vos informations. S'il ne sait pas, il vous transmet la demande. »
  - « Mes clients vont savoir que c'est un robot ? » → « Oui, il se présente comme votre assistant. C'est plus honnête, et vos clients l'acceptent très bien. »
  - « Je dois refaire mon site ? » → « Non, il s'ajoute en quelques lignes à votre site actuel. »
  - « Je peux modifier ses réponses moi-même ? » → « Oui. Vous avez un petit espace en ligne pour changer vous-même vos horaires, tarifs ou questions fréquentes. Les modifications sont prises en compte immédiatement, sans rien demander à personne. »
- **related** : `assistant-ia`, `outil-sur-mesure`.
- **seo.title** : « Chatbot IA pour site web et WhatsApp — daddIA »

### 9.3 Votre outil sur mesure — `outil-sur-mesure`

- **kind** : ponctuel. **Durée** : « 2 à 6 semaines ».
- **Sous-titre** : « Le logiciel qui colle exactement à votre façon de travailler »
- **cardPitch** : « On construit l'application qui remplace vos fichiers Excel et vos ressaisies : en ligne, sécurisée, prête à l'emploi. »
- **cardHighlights** : « Une maquette validée avant de construire » · « Un outil en ligne, sécurisé, hébergé pour vous » · « 30 jours de support inclus »
- **Accroche** : « Vous jonglez entre Excel, des carnets et trois logiciels qui ne communiquent pas entre eux ? On construit l'outil qui correspond exactement à votre façon de travailler. Il est en ligne, sécurisé et prêt à l'emploi. »
- **C'est pour vous si…**
  - aucun logiciel du marché ne colle vraiment à votre métier ;
  - vous ressaisissez les mêmes informations à plusieurs endroits ;
  - votre équipe a besoin d'un outil commun plutôt que de fichiers qui circulent par mail.
- **Comment ça se passe** :
  1. *Un appel de cadrage* pour comprendre comment vous travaillez aujourd'hui.
  2. *Un devis précis* : ce que fait l'outil, ce qu'il ne fait pas, le délai.
  3. *Une maquette à valider* avant de construire quoi que ce soit.
  4. *La construction*, avec des points d'étape chaque semaine.
  5. *La mise en ligne* et une prise en main de 30 min. Le support est inclus pendant 30 jours.
- **Exemples** :
  - **Institut**
    - *Avant* : un agenda papier, des fiches clientes dans un classeur et les ventes de produits notées sur Excel.
    - *L'outil* : un espace unique avec l'agenda de chaque employée, la fiche cliente (historique des soins, allergies, préférences) et le suivi du stock.
    - *Résultat* : un résumé du mois généré automatiquement (chiffre d'affaires, soins les plus vendus, clientes à relancer).
  - **Immobilier**
    - *Avant* : chaque nouveau bien demande de rédiger l'annonce, de remplir la fiche interne et de prévenir les acheteurs intéressés, ce qui fait trois saisies.
    - *L'outil* : l'agent entre le bien une seule fois avec ses photos. L'outil rédige l'annonce, la classe et envoie automatiquement le bien aux acheteurs dont le profil correspond.
  - **BTP**
    - *Avant* : les devis se font sur Word, le planning des équipes sur un tableau blanc et les heures sont notées sur papier.
    - *L'outil* : une application de chantier. Le chef d'équipe saisit ses heures et ses photos depuis son téléphone, les devis se génèrent à partir d'une bibliothèque de prestations, et les factures partent en un clic à la fin du chantier.
- **Visuel** (`dashboard`) : titre « Aperçu — l'outil de l'artisan ». Widgets :
  - Chantiers en cours : 6 ;
  - Devis en attente : 4 (dont 2 de plus de 7 jours) ;
  - Factures impayées : 3 ;
  - Heures saisies cette semaine : 212 h.
- **Inclus** :
  - un outil en ligne avec une connexion sécurisée pour chaque utilisateur ;
  - l'hébergement et la maintenance technique ;
  - un mode d'emploi ;
  - une prise en main de 30 min ;
  - 30 jours de support.
- **Non inclus** :
  - les nouvelles fonctionnalités après la livraison (devis complémentaire) ;
  - la cession du code source, possible en option.
- **FAQ** :
  - « Je ne sais pas exactement ce que je veux. » → « C'est normal : c'est le rôle de l'appel de cadrage et de la maquette. »
  - « Et si ça ne me plaît pas en cours de route ? » → « Vous validez la maquette avant toute construction, puis vous voyez l'avancement chaque semaine. »
  - « Mes données sont-elles en sécurité ? » → « Elles sont hébergées en Europe, avec une connexion chiffrée et des accès par utilisateur. »
  - « Qui s'en occupe après la livraison ? » → « Le support est inclus 30 jours, puis une maintenance mensuelle est possible. »
  - « Est-ce que l'outil m'appartient ? » → « Il est réservé à votre entreprise. Le code source peut vous être cédé en option, c'est précisé dans le devis. »
- **related** : `audit-ia`, `assistant-ia`.
- **seo.title** : « Outil métier sur mesure avec IA — daddIA »

### 9.4 Votre assistant IA — `assistant-ia`

> ⚠️ Ne jamais mentionner le nom d'un agent, d'un outil interne ou d'un projet interne. On parle uniquement de « votre assistant ».

- **kind** : abonnement. **Durée** : « Mise en place en 1 à 2 semaines ».
- **Sous-titre** : « Un collaborateur qui travaille pour vous, tous les jours »
- **cardPitch** : « Votre propre IA privée, sur WhatsApp ou dans une interface à votre nom : emails, dossiers, relances, prospection. Elle s'en occupe et apprend de vous. »
- **cardHighlights** : « Emails, dossiers, relances, prospection » · « Retient tout, s'améliore avec le temps » · « Vous demande votre accord sur l'important »
- **Accroche** : « Imaginez un assistant à qui vous écrivez sur WhatsApp comme à un collègue : "Relance les devis non signés", "Prépare-moi le dossier Dupont", "Trouve-moi des prospects à Cannes". Il s'en occupe, et il vous demande votre accord avant tout ce qui compte. »
- **Encadré de différence** (`compare`) :
  - titre « Chatbot ou assistant ? » ;
  - ligne 1 : « Le Chatbot » → « parle à vos clients » ;
  - ligne 2 : « L'Assistant » → « travaille pour vous ».
- **C'est pour vous si…**
  - vos journées sont mangées par les emails, les relances et l'administratif ;
  - vous n'avez pas le temps (ou le budget) d'embaucher un assistant ;
  - vous voulez déléguer, pas apprendre un nouveau logiciel.
- **Capacités** (`capabilities`, une carte par groupe, icônes Lucide) :
  - **Vos emails** (`Mail`)
    - Chaque matin, il trie la boîte mail et vous résume : « 3 urgents, 5 à traiter, le reste est classé ».
    - Il prépare des brouillons de réponse, que vous validez d'un clic.
    - Il relance automatiquement les gens qui ne vous ont pas répondu.
  - **Vos dossiers** (`FolderOpen`)
    - Il rassemble les pièces d'un dossier client, repère ce qui manque et le réclame poliment.
    - Il classe les factures fournisseurs et prépare l'envoi au comptable en fin de mois.
    - Il vous alerte avant les échéances : contrats, assurances, garanties, contrôles.
  - **Votre argent** (`Euro`)
    - Il relance les impayés par étapes : aimable, puis ferme, puis il vous prévient.
    - Il relance les devis non signés 7 jours après leur envoi.
    - Chaque lundi, il vous envoie un point : ce qui est encaissé, ce qui est en attente, ce qui est en retard.
  - **Votre prospection** (`Target`)
    - Il se connecte aux bases d'entreprises françaises (comme Pappers) pour trouver les sociétés qui correspondent à votre cible : secteur, taille, zone, entreprises récemment créées.
    - Il repère aussi d'autres signaux : permis de construire déposés, appels d'offres publics.
    - Il prospecte à votre place : il prépare des messages d'approche personnalisés, les envoie après votre validation et suit qui a répondu, et qui relancer et quand.
  - **Vos clients** (`Star`)
    - Après chaque prestation, il demande un avis Google et prépare les réponses aux avis reçus.
    - Il repère les clients qui ne sont pas revenus depuis longtemps et propose une relance.
  - **Votre veille** (`Radar`)
    - Il surveille vos concurrents, les prix de vos fournisseurs et les nouvelles règles de votre secteur, et vous résume l'essentiel en 5 lignes.
  - **Vos notes vocales** (`Mic`)
    - En voiture, vous dictez « Devis pour Mme Martin, salle de bain 6 m², faïence haut de gamme ». À votre arrivée, le brouillon de devis est prêt.
- **Section « Votre propre ChatGPT, mais pour votre entreprise »** (à placer juste après les capacités ; c'est un argument majeur)
  - **Texte d'introduction** : « En plus de WhatsApp, on peut vous créer une interface rien qu'à vous, à votre nom et à vos couleurs. Vous lui posez toutes vos questions comme à ChatGPT, sauf qu'elle connaît votre entreprise par cœur. »
  - **Elle a accès à ce que vous choisissez** : vos emails, vos documents, votre agenda, vos fichiers clients, vos devis et factures, vos procédures internes. Vous décidez source par source, et vous pouvez retirer un accès à tout moment.
  - **Vous pouvez tout lui apprendre** : déposez vos tarifs, vos contrats types, vos fiches produits ou vos méthodes de travail. Ou dites-lui simplement « retiens que… ». Elle s'en sert ensuite dans toutes ses réponses.
  - **Exemples de questions** (affichées comme des suggestions cliquables dans la maquette) :
    - « Combien m'a rapporté M. Rossi depuis le début de l'année ? »
    - « Quels devis envoyés le mois dernier n'ont pas encore été signés ? »
    - « Retrouve-moi le contrat du fournisseur de carrelage et résume les conditions de retard. »
    - « Prépare mon rendez-vous de demain avec Mme Durand : historique, derniers échanges, points à aborder. »
    - « Rédige une réponse à ce client mécontent, avec mon ton habituel. »
  - **Pour votre équipe aussi** : chaque collaborateur peut avoir son propre accès, avec uniquement les informations qui le concernent. Par exemple, l'assistante voit l'agenda mais pas la comptabilité.
  - Visuel `private-ai` (voir §8.3) : une fenêtre d'application avec le logo du client fictif. Elle contient :
    - une barre latérale « Sources connectées » (Emails ✓, Agenda ✓, Documents ✓, Devis & factures ✓, Comptabilité ✗ non autorisée) ;
    - une conversation en cours ;
    - un bouton « + Apprendre quelque chose ».
- **Section « Il apprend et se souvient de tout »** : titre affiché « Plus il travaille avec vous, meilleur il devient ».
  - **Il retient tout** : vos clients, leur historique, vos fournisseurs, vos tarifs, vos habitudes. Vous n'avez jamais à lui réexpliquer quelque chose.
  - **Il apprend de vos corrections** : vous modifiez un brouillon de mail ? La prochaine fois, il écrit directement comme vous.
  - **Il comprend vos préférences** : « Mme Durand préfère être appelée », « on ne relance jamais avant le 10 du mois », « ce fournisseur est toujours en retard ». Il l'intègre et l'applique ensuite tout seul.
  - **Il propose ses propres améliorations** : « Je remarque que vous relancez souvent ce type de devis à la main, voulez-vous que je m'en charge ? »
  - Visuel `before-after` :
    - *Semaine 1* : « Je relance M. Garcia pour sa facture, quel ton j'adopte ? »
    - *Mois 3* : « J'ai relancé M. Garcia comme d'habitude (ton amical, il paie toujours après un rappel). Facture réglée ce matin. »
  - Réassurance juste en dessous :
    - Sa mémoire vous appartient : vous pouvez consulter ce qu'il sait, le corriger ou lui demander d'oublier quelque chose.
    - Elle reste chez vous : elle n'est jamais partagée avec d'autres clients ni utilisée ailleurs.
- **Visuel « Une journée avec votre assistant »** (`message-thread` avec `bySector`, les onglets suivent le secteur choisi) :
  - **BTP (Karim)** :
    - 7h30 assistant : « Bonjour Karim. 2 mails urgents (un fournisseur en retard, une réclamation client). 1 facture impayée depuis 30 jours, je relance ? »
    - 7h32 utilisateur : « Oui relance. »
    - 12h15 utilisateur : « 🎙️ Note vocale : devis cuisine M. Rossi »
    - 12h20 assistant : « Brouillon de devis prêt, 4 850 € HT. Je l'envoie ? »
    - 18h00 assistant : « 3 permis de construire déposés cette semaine à Antibes, je t'ai préparé un message pour chacun. »
    - (Le montant du devis est fictif et fait partie de l'histoire : ce n'est pas un prix daddIA. C'est le seul montant autorisé sur le site.)
  - **Institut (Sophie)** :
    - 8h00 assistant : « Bonjour Sophie. 4 nouveaux avis Google cette semaine, j'ai préparé les réponses. 2 rendez-vous de cet après-midi non confirmés, je leur envoie un rappel ? »
    - 8h02 utilisateur : « Oui pour les deux. »
    - 13h10 utilisateur : « Il reste combien de sérum vitamine C ? »
    - 13h11 assistant : « 3 flacons. Au rythme actuel, rupture dans 10 jours. Je prépare la commande fournisseur ? »
    - 19h00 assistant : « 12 clientes ne sont pas revenues depuis 3 mois. Je t'ai préparé un message personnalisé pour chacune, à valider. »
  - **Immobilier (Marc)** :
    - 7h45 assistant : « Bonjour Marc. 9 nouvelles demandes cette nuit : 3 sérieuses (financement validé), je les ai mises en tête. 1 dossier locataire incomplet, il manque l'avis d'imposition, je le réclame ? »
    - 7h47 utilisateur : « Oui. »
    - 15h30 utilisateur : « 🎙️ Note vocale : compte-rendu visite T3 rue de France »
    - 15h34 assistant : « Compte-rendu prêt et envoyé au propriétaire en brouillon. Je le valide ? »
    - 18h30 assistant : « 5 nouvelles SCI créées ce mois-ci à Nice. Je t'ai préparé une approche pour chacune. »
- **Garde-fous** (`reassurance`, titre « Vous gardez la main ») :
  - Il ne fait rien d'important sans votre accord : envoi d'un mail sensible, paiement, suppression.
  - Quand il ne sait pas, il vous pose la question au lieu d'inventer.
  - Chaque mois, vous recevez un bilan : ce qu'il a fait, le temps gagné, les points à ajuster.
- **Comment ça se passe** :
- **Sécurité** (section dédiée, titre « Vos données sont protégées », présentée en grille de 8 cartes avec icônes, écrite sans jargon) :
  - `Server` **Hébergé en Europe** : vos données restent sur des serveurs situés dans l'Union européenne, soumis au RGPD.
  - `Box` **Un espace rien qu'à vous** : chaque client a son propre environnement isolé. Vos données ne sont jamais mélangées avec celles d'une autre entreprise.
  - `Lock` **Chiffré de bout en bout** : vos données sont chiffrées pendant leur transfert et pendant leur stockage.
  - `KeyRound` **Vous choisissez les accès** : l'assistant ne voit que les sources que vous avez autorisées. Chaque accès peut être retiré en un clic. Pour l'interface, la connexion est personnelle et protégée par une double authentification.
  - `Users` **Des droits par personne** : chaque membre de l'équipe ne voit que ce qui le concerne.
  - `ShieldCheck` **Rien d'important sans votre accord** : envoi d'emails sensibles, paiement, suppression… Il demande toujours votre validation avant d'agir.
  - `ScrollText` **Tout est tracé** : un journal enregistre chaque action de l'assistant. Vous savez toujours ce qu'il a fait, quand et pourquoi.
  - `BrainCircuit` **Vos données ne servent qu'à vous** : elles ne sont ni revendues, ni partagées, ni utilisées pour entraîner des modèles d'IA publics. Nous travaillons avec des fournisseurs d'IA qui s'y engagent contractuellement.
  - Ligne sous la grille : « Vous restez propriétaire de tout : à la fin du contrat, vous récupérez vos données si vous le souhaitez, puis elles sont définitivement supprimées. »
- **Comment ça se passe** :
  1. *Un appel* pour repérer ce qui vous prend le plus de temps.
  2. *On choisit 2 ou 3 premières missions.*
  3. *La mise en place* prend 1 à 2 semaines. On connecte vos outils (email, agenda, dossiers) et, si vous le souhaitez, on crée votre interface privée.
  4. *Il travaille* ; on le surveille et on l'ajuste en continu.
  5. *Chaque mois*, on fait le point et vous pouvez lui confier de nouvelles missions.
- **Inclus** :
  - la mise en place et la connexion à vos outils ;
  - l'accès sur WhatsApp ou par email ;
  - en option, une interface privée personnalisée à votre nom, avec des accès pour votre équipe ;
  - l'hébergement sécurisé en Europe, dans un espace isolé ;
  - la supervision et les ajustements continus ;
  - le bilan mensuel ;
  - l'ajout progressif de nouvelles missions.
- **Non inclus** :
  - la création d'une application complète (voir [Votre outil sur mesure](/offres/outil-sur-mesure)).
- **FAQ** :
  - « Il a accès à mes mails, c'est sûr ? » → « L'accès est limité à ce dont il a besoin, l'hébergement est sécurisé en Europe, et vous pouvez révoquer l'accès à tout moment. »
  - « Et s'il fait une erreur ? » → « Il demande votre validation pour tout ce qui compte, et on surveille son activité en continu. »
  - « Il remplace un salarié ? » → « Non. Il prend les tâches répétitives pour que vous et votre équipe vous concentriez sur l'essentiel. »
  - « Je dois apprendre un logiciel ? » → « Non, vous lui écrivez sur WhatsApp ou par mail, comme à n'importe qui. »
  - « Est-ce qu'il oublie ce que je lui dis ? » → « Non, il retient tout ce qui est utile à votre activité, d'une semaine à l'autre. »
  - « Et s'il retient une mauvaise information ? » → « Vous le corrigez simplement ("non, c'est faux, en fait…") et il met sa mémoire à jour. »
  - « Quelle différence avec l'Accompagnement ? » → « L'Accompagnement vous apprend à faire. L'assistant fait pour vous. »
  - « C'est comme ChatGPT ? » → « Oui pour la façon de l'utiliser : vous lui posez vos questions librement. Mais il connaît votre entreprise, il a accès à vos outils, il agit pour vous, et vos données restent privées. »
  - « Qu'est-ce que je peux lui apprendre ? » → « Tout ce qui est utile à votre activité : tarifs, procédures, contrats types, habitudes de vos clients… Vous déposez un document ou vous lui dites "retiens que…". »
  - « Qui d'autre peut voir mes données ? » → « Personne en dehors des personnes que vous autorisez. Votre espace est isolé, chiffré et hébergé en Europe. »
  - « Et si j'arrête ? » → « Vous récupérez vos données si vous le souhaitez, puis elles sont définitivement supprimées. »
- **related** : `chatbot-ia`, `accompagnement-ia`.
- **seo.title** : « Assistant IA pour dirigeants de TPE et PME — daddIA »

### 9.5 Accompagnement IA — `accompagnement-ia`

- **kind** : abonnement. **Durée** : « 3 mois recommandés ».
- **Sous-titre** : « Apprenez à utiliser l'IA dans votre métier, à votre rythme, avec quelqu'un à vos côtés »
- **cardPitch** : « Deux rendez-vous par mois et un contact WhatsApp pour maîtriser l'IA sur vos vrais sujets. Autonome en 3 mois. »
- **cardHighlights** : « 2 rendez-vous d'une heure par mois » · « Vos questions sur WhatsApp entre les séances » · « Un espace personnel avec tous vos modèles »
- **Accroche** : « Vous voulez comprendre et maîtriser l'IA vous-même, pas juste la subir ? Chaque mois, on avance ensemble sur vos vrais sujets du quotidien. En 3 mois, vous êtes autonome. »
- **C'est pour vous si…**
  - vous avez essayé ChatGPT mais vous ne savez pas en tirer plus que des mails ;
  - vous préférez comprendre ce que vous faites plutôt que de tout déléguer ;
  - vous voulez quelqu'un à qui poser vos questions au fil de l'eau.
- **Comment ça se passe** :
  1. *Un premier appel offert (30 min)* pour voir où vous en êtes et ce que vous voulez gagner.
  2. *Deux rendez-vous par mois (1 h)*, en visio ou en présentiel à Nice et en région PACA.
  3. *Entre les rendez-vous*, vous posez vos questions sur WhatsApp et vous avez une réponse sous 24 h.
  4. *Après chaque séance*, un compte-rendu est déposé dans votre espace personnel.
  5. *Au bout de 3 mois*, on fait le bilan : vous continuez, vous volez de vos propres ailes, ou on construit un outil pour vous.
- **Visuel** (`timeline`) : titre « Votre parcours sur 3 mois ».
  - Mois 1, *Les bases* : choisir les bons outils, bien formuler ses demandes, et gagner du temps dès la première semaine.
  - Mois 2, *Votre métier* : appliquer l'IA à vos tâches précises (devis, mails, contenus, analyse).
  - Mois 3, *L'autonomie* : vos propres méthodes, vos modèles réutilisables, et des réflexes acquis.
- **Exemples** (champ `timeline` de chaque exemple) :
  - **Institut**
    - M1 : elle écrit ses posts Instagram et ses réponses aux avis en 5 minutes au lieu d'une heure.
    - M2 : elle crée une newsletter mensuelle pour ses clientes.
    - M3 : elle a sa propre bibliothèque de modèles prêts à l'emploi et forme elle-même ses employées.
  - **Immobilier**
    - M1 : il rédige ses annonces en 2 minutes à partir de quelques mots-clés.
    - M2 : il prépare ses estimations en faisant analyser les ventes du quartier par l'IA.
    - M3 : il prépare ses rendez-vous vendeurs avec un argumentaire personnalisé à chaque fois.
  - **BTP**
    - M1 : il dicte ses mails au lieu de les taper le soir.
    - M2 : il génère ses devis à partir de ses notes de chantier.
    - M3 : il se rend compte que certaines tâches méritent d'être entièrement automatisées, et passe à l'Assistant IA.
- **Visuel** (`cards`) : titre « Votre espace personnel ». Cartes :
  - Comptes-rendus de séance ;
  - Vos modèles de demandes validés ;
  - Les outils recommandés ;
  - Votre feuille de route.
  - Ligne de texte associée : « Tout y est rangé, et ça reste à vous, même après l'accompagnement. »
- **Encadré de comparaison** (`compare`) :
  - titre « Accompagnement ou Assistant IA ? » ;
  - « Accompagnement » → « vous apprenez à faire » ;
  - « Assistant IA » → « on fait pour vous » ;
  - note : « Beaucoup de clients commencent par l'un et finissent par combiner les deux. »
- **Inclus** :
  - 2 rendez-vous d'une heure par mois ;
  - les questions illimitées sur WhatsApp entre les séances ;
  - un compte-rendu après chaque séance ;
  - l'espace personnel ;
  - l'accès prioritaire aux ateliers.
- **Non inclus** :
  - le développement d'outils (voir les offres dédiées).
- **FAQ** :
  - « Je pars de zéro, c'est trop tôt pour moi ? » → « Non, c'est le meilleur moment pour démarrer. »
  - « Combien de temps ça me prend par semaine ? » → « Environ 1 à 2 h, rendez-vous compris. »
  - « Je dois acheter des logiciels ? » → « La plupart des outils sont gratuits ou coûtent quelques euros par mois. On vous dit lesquels valent le coup. »
  - « Mes employés peuvent participer ? » → « Oui, aux rendez-vous. Pour former toute l'équipe, il y a les Ateliers. »
  - « Je m'engage pour combien de temps ? » → « On recommande 3 mois pour voir de vrais résultats. »
- **related** : `ateliers-ia`, `assistant-ia`.
- **seo.title** : « Accompagnement IA pour dirigeants — daddIA, Nice »

### 9.6 Ateliers IA — `ateliers-ia`

- **kind** : ponctuel. **Durée** : « 3 heures ».
- **Sous-titre** : « 3 heures pour repartir avec des outils qui marchent, pas avec de la théorie »
- **cardPitch** : « Une demi-journée en petit groupe pour apprendre en pratiquant, sur vos propres tâches. »
- **cardHighlights** : « Groupes de 4 à 12 personnes » · « Ouvert à tous ou réservé à votre équipe » · « Support, modèles et replay inclus »
- **Accroche** : « Une demi-journée, un petit groupe, et vous repartez en sachant faire. On ne vous parle pas de l'avenir de l'IA : vous l'utilisez sur vos propres tâches pendant l'atelier. »
- **Deux formules** (visuel `cards`, titre « Deux formules ») :
  - « Ateliers ouverts » : « vous rejoignez d'autres dirigeants et indépendants. C'est l'occasion idéale pour se lancer et échanger entre pairs. »
  - « Ateliers en entreprise » : « une session réservée à votre équipe, avec des exemples adaptés à votre métier. »
- **C'est pour vous si…**
  - vous voulez découvrir l'IA concrètement sans vous engager sur plusieurs mois ;
  - vous voulez que toute votre équipe s'y mette en même temps ;
  - vous apprenez mieux en pratiquant qu'en lisant.
- **Visuel** (`timeline`) : titre « Le déroulé d'un atelier ».
  - 30 min, *Comprendre* : ce que l'IA sait faire, et ce qu'elle ne sait pas faire.
  - 1 h 30, *Voir et essayer* : des démonstrations en direct, que vous reproduisez sur votre ordinateur.
  - 45 min, *Pratiquer sur vos tâches* : vous travaillez sur les 3 tâches répétitives listées avant l'atelier.
  - 15 min, *Vos questions*.
  - Le lendemain : vous recevez le support, le replay (30 jours) et les modèles utilisés.
- **Visuel** (`cards`) : titre « Les thèmes ».
  - « Automatiser ses tâches répétitives » : « En repartant, vous saurez repérer ce qui peut être automatisé chez vous et mettre en place votre première automatisation, par exemple une relance de facture ou une réponse type. »
  - « ChatGPT / Claude pour dirigeants » : « En repartant, vous saurez rédiger un mail difficile, résumer un contrat de 20 pages ou préparer un rendez-vous client en quelques minutes. »
  - « Créer son premier outil IA sans (trop) coder » : « En repartant, vous saurez créer un petit assistant qui répond aux questions à partir de vos propres documents. »
  - « L'IA pour la relation client et la vente » : « En repartant, vous saurez répondre aux avis, personnaliser vos relances et préparer des messages de prospection qui ne sonnent pas "robot". »
- **Exemples** :
  - **Institut** : « La gérante réserve un atelier en entreprise pour ses 4 esthéticiennes. » *Résultat* : « Le lendemain, chacune rédige ses réponses aux avis et ses posts en quelques minutes. »
  - **BTP** : « L'artisan participe à un atelier ouvert. Il y rencontre un plombier et un électricien qui ont les mêmes problèmes de devis. » *Résultat* : « Il repart avec un modèle qu'il utilise dès le lundi. »
  - **Immobilier** : « L'agence envoie ses 3 agents à l'atelier "Relation client". » *Résultat* : « La semaine suivante, leurs relances d'acheteurs sont personnalisées automatiquement. »
- **Inclus** :
  - la session live de 3 h ;
  - le support PDF ;
  - les modèles utilisés ;
  - le replay pendant 30 jours ;
  - l'exercice de préparation envoyé avant l'atelier.
- **Non inclus** :
  - le suivi individuel après l'atelier (voir l'Accompagnement IA).
- **Financement** : afficher **uniquement** la phrase « Pour les ateliers en entreprise, contactez-nous pour étudier les possibilités de financement. » **Ne jamais écrire « finançable OPCO »** (voir §17).
- **FAQ** :
  - « Il faut un ordinateur ? » → « Oui, pour pratiquer pendant l'atelier. »
  - « Je n'y connais rien, je vais être perdu ? » → « Non, les groupes sont petits (4 à 12 personnes) et on avance au rythme de chacun. »
  - « C'est en ligne ou en présentiel ? » → « Les deux sont possibles : présentiel à Nice et en région PACA, ou en visio. »
  - « Et après ? » → « Si vous voulez aller plus loin, l'Accompagnement ou l'Audit prennent le relais. »
- **CTA spécifique** : « Être prévenu des prochaines dates » → `/#contact?offre=ateliers-ia`.
- **related** : `accompagnement-ia`, `audit-ia`.
- **seo.title** : « Ateliers IA pour dirigeants et équipes — daddIA, Nice »

---

## 10. Backend FastAPI — spécifications

### 10.1 Structure

```
backend/
├── app/
│   ├── main.py              # création de l'app, middlewares, routers
│   ├── config.py            # Settings (pydantic-settings)
│   ├── db.py                # engine, SessionLocal, get_db
│   ├── models.py            # modèle SQLAlchemy Lead
│   ├── schemas.py           # ContactIn, ContactOut
│   ├── routers/
│   │   ├── health.py
│   │   └── contact.py
│   ├── services/
│   │   └── mailer.py        # envoi Resend + gabarits HTML échappés
│   └── security.py          # limitation des requêtes (slowapi)
├── migrations/              # Alembic
├── tests/
│   ├── test_health.py
│   └── test_contact.py
├── pyproject.toml
└── Dockerfile
```

### 10.2 Endpoints

Toutes les routes sont préfixées par `/api`.

| Méthode | Route | Rôle |
|---|---|---|
| `GET` | `/api/health` | `{ "status": "ok" }`. Vérifie aussi la connexion à la base. |
| `POST` | `/api/contact` | Reçoit le formulaire, enregistre la demande et envoie les emails. |

En production (`ENV=production`), la documentation automatique est **désactivée** : `docs_url=None`, `redoc_url=None`, `openapi_url=None`.

### 10.3 Schéma d'entrée

```python
from typing import Literal
from pydantic import BaseModel, EmailStr, Field, field_validator

OfferId = Literal["audit-ia","chatbot-ia","outil-sur-mesure","assistant-ia","accompagnement-ia","ateliers-ia","autre"]

class ContactIn(BaseModel):
    nom: str = Field(min_length=2, max_length=100)
    entreprise: str = Field(min_length=1, max_length=150)
    email: EmailStr
    offre: OfferId
    message: str = Field(min_length=10, max_length=3000)
    consentement: bool
    website: str | None = Field(default=None, max_length=200)  # champ piège

    @field_validator("nom", "entreprise", "message")
    @classmethod
    def strip(cls, v: str) -> str:
        return v.strip()

    @field_validator("consentement")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consentement requis")
        return v
```

### 10.4 Modèle `Lead` (table `leads`)

| Champ | Type |
|---|---|
| `id` | UUID, clé primaire |
| `created_at` | timestamp avec fuseau horaire, valeur par défaut `now()` |
| `nom`, `entreprise`, `email`, `offre`, `message` | text / varchar |
| `consent_at` | timestamp |
| `source_page` | varchar, optionnel (valeur de l'en-tête `Referer`) |
| `email_status` | enum `sent` \| `failed` |
| `status` | enum `nouveau` \| `contacte` \| `qualifie` \| `gagne` \| `perdu`, par défaut `nouveau` |

Ne **pas** stocker l'adresse IP.

### 10.5 Logique de `POST /api/contact`

1. **Limitation des requêtes** : `RATE_LIMIT_CONTACT` (5 par heure et par IP). L'IP est lue via `X-Forwarded-For`, transmis par Nginx (Uvicorn lancé avec `--proxy-headers --forwarded-allow-ips="*"`, le conteneur n'étant joignable que par Nginx). Au-delà de la limite, renvoyer `429`.
2. **Champ piège rempli** : renvoyer `200 { "success": true }` sans rien enregistrer ni envoyer. Un robot ne doit pas savoir qu'il a été détecté.
3. **Validation Pydantic** : en cas d'échec, renvoyer `422`.
4. **Enregistrement** du `Lead` en base, avec `email_status = failed` par défaut.
5. **Envoi des emails** via `services/mailer.py` :
   - **Notification** à `CONTACT_EMAIL` :
     - sujet : `Nouveau contact — {offre} — {nom}` ;
     - `reply_to` : l'email du visiteur ;
     - corps : tous les champs.
   - **Confirmation** au visiteur :
     - sujet : « On a bien reçu votre message — daddIA » ;
     - corps : « Bonjour {nom}, merci pour votre message. On vous répond sous 24 h en semaine. — L'équipe daddIA · daddia.fr · Nice (06) ».
   - **Toutes les valeurs insérées dans le HTML passent par `html.escape()`.** Les retours à la ligne du message sont convertis en `<br>` *après* l'échappement.
   - Si l'envoi réussit, passer `email_status` à `sent`.
6. **Réponse** : `201 { "success": true }`. Elle est renvoyée **même si l'envoi d'email a échoué**, car la demande est sauvegardée. Dans ce cas, on journalise l'erreur, sans le contenu personnel.
7. Une erreur de base de données renvoie `500 { "error": "Erreur serveur" }`, sans aucun détail technique.

### 10.6 Sécurité

- **CORS** : `ALLOWED_ORIGINS` uniquement, méthodes `GET` et `POST`. En production, tout passe par le même domaine.
- **TrustedHostMiddleware** : `daddia.fr`, `www.daddia.fr`, `localhost`.
- **Taille maximale des requêtes** : 64 ko (côté Nginx).
- **Journaux** : jamais de nom, d'email ou de message dans les logs. Uniquement l'id du lead et le statut.
- **Secrets** : uniquement dans des variables d'environnement. L'API Resend n'est appelée que depuis le backend.
- **Conteneur** : l'image tourne avec un utilisateur non-root.

### 10.7 Tests (pytest)

- `GET /api/health` renvoie 200.
- `POST /api/contact` avec un payload valide renvoie 201, crée 1 lead et appelle le mailer (mock).
- Un champ piège rempli renvoie 200, sans lead créé ni mailer appelé.
- Un email invalide, un message trop court ou une absence de consentement renvoie 422.
- Le 6e appel dans l'heure renvoie 429.
- Un échec du mailer renvoie quand même 201, avec un lead enregistré en `email_status = failed`.
- Un message contenant `<script>` arrive échappé dans le HTML envoyé.

La base de test est SQLite en mémoire, ou un PostgreSQL de test via docker-compose.

### 10.8 Hors périmètre de cette version

À ne pas implémenter maintenant, mais à garder possible plus tard :

- une synchronisation des leads vers le CRM Notion ;
- une interface d'administration des leads.

Pour l'instant, les leads se consultent directement en base.

---

## 11. Pages légales

- **/mentions-legales** :
  - éditeur : nom, statut micro-entreprise, SIRET, adresse de contact, email ;
  - mention « TVA non applicable, art. 293 B du CGI » ;
  - hébergeur : nom, adresse et téléphone de l'hébergeur du VPS ;
  - directeur de publication.
  - Les champs à compléter sont marqués `[À COMPLÉTER]`.
- **/confidentialite** :
  - données collectées via le formulaire : nom, entreprise, email, offre, message ;
  - finalité : vous recontacter ;
  - base légale : votre consentement ;
  - durée de conservation : 3 ans après le dernier contact ;
  - destinataire : daddIA uniquement ;
  - sous-traitants : l'hébergeur et le service d'envoi d'emails ;
  - vos droits : accès, rectification, suppression (par email à contact@daddia.fr) ;
  - réclamation possible auprès de la CNIL ;
  - cookies : uniquement techniques.
- Ces deux pages utilisent `PageShell`, en style texte sobre.

---

## 12. Animations (`lib/animations.ts`)

```typescript
import { Variants } from 'framer-motion'
export const fadeUp: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }
export const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
export const splitReveal: Variants = { hidden: { clipPath: 'inset(0 100% 0 0)' }, visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } } }
export const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }
```

**Règles** :

- Le hero utilise GSAP (§7.1) ; tout le reste utilise `FadeUp` / `SplitReveal` (§3.4) et Framer Motion.
- Le contenu se révèle au scroll, une seule fois.
- Dans les grilles, les éléments apparaissent avec 100 ms d'écart.
- Aucune animation ne dépasse 600 ms (sauf les compteurs).
- `prefers-reduced-motion` est respecté : toutes les animations sont désactivées s'il est activé.
- Les maquettes de conversation (`chat`, `message-thread`) affichent leurs messages un par un à l'entrée dans l'écran (délai d'environ 400 ms). Si `prefers-reduced-motion` est activé, tous les messages s'affichent d'un coup.

---

## 13. Responsive & performance

| Largeur d'écran | Comportement |
|---|---|
| < 640 px | 1 colonne, menu hamburger, carte du hero en 92 vw × 92 vh, curseur personnalisé désactivé, onglets d'exemples défilables horizontalement |
| 640–1024 px | 2 colonnes |
| > 1024 px | Mise en page complète, carte du hero en 3 colonnes, curseur personnalisé actif |

- Tous les boutons et liens d'action font au moins 44 px de haut.
- Aucun défilement horizontal de la page.
- Les sections sous la ligne de flottaison sont chargées à la demande avec `next/dynamic`. Le hero n'est pas chargé à la demande (il est visible dès l'arrivée).
- Pages offres : génération statique (SSG) avec `fallback: false`.
- Viser un score Lighthouse ≥ 90 en performance et en accessibilité sur les pages offres.

---

## 14. Déploiement (VPS, Docker Compose)

### 14.1 `deploy/docker-compose.yml`

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    env_file: .env
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck: { test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER"], interval: 10s, retries: 5 }

  backend:
    build: ../backend
    restart: unless-stopped
    env_file: ../backend/.env
    depends_on: { db: { condition: service_healthy } }
    ports: ["127.0.0.1:8000:8000"]   # joignable uniquement depuis l'hôte (Nginx)

  frontend:
    build: ../frontend
    restart: unless-stopped
    ports: ["127.0.0.1:3000:3000"]

volumes:
  pgdata:
```

### 14.2 `backend/Dockerfile`

```dockerfile
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN pip install --no-cache-dir uv && useradd -m app
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev
COPY . .
USER app
EXPOSE 8000
CMD ["sh", "-c", "uv run alembic upgrade head && uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 2 --proxy-headers --forwarded-allow-ips=*"]
```

### 14.3 `frontend/Dockerfile`

Build Next.js en mode standalone :

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN adduser -D app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
USER app
EXPOSE 3000
CMD ["node", "server.js"]
```

> Les variables `NEXT_PUBLIC_*` sont intégrées au moment du build. Il faut donc les fournir au build : `ARG`/`ENV`, ou un `.env.production` présent au build.

### 14.4 Nginx (`deploy/nginx/daddia.conf`)

```nginx
server {
  listen 80;
  server_name daddia.fr www.daddia.fr;
  return 301 https://daddia.fr$request_uri;
}

server {
  listen 443 ssl http2;
  server_name daddia.fr www.daddia.fr;
  ssl_certificate     /etc/letsencrypt/live/daddia.fr/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/daddia.fr/privkey.pem;

  client_max_body_size 64k;
  add_header X-Content-Type-Options nosniff always;
  add_header X-Frame-Options DENY always;
  add_header Referrer-Policy strict-origin-when-cross-origin always;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

  location /api/ {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

- Certificat TLS obtenu avec `certbot --nginx -d daddia.fr -d www.daddia.fr`.
- Sauvegarde quotidienne de la base avec `pg_dump` via cron, rotation sur 14 jours.

---

## 15. Ordre de développement recommandé

1. Mettre en place le monorepo, `.env.example`, et un `.gitignore` qui exclut les fichiers `.env*`.
2. **Backend** : configuration, connexion base, modèle `Lead`, première migration Alembic.
3. **Backend** : `/api/health` puis `/api/contact` (mailer, anti-spam, limitation des requêtes), avec tous les tests au vert.
4. **Frontend** : setup Next.js, shadcn. **Lire `design/maquette-source.jsx` en entier.**
5. Design system : `tailwind.config.ts`, `globals.css` (styles du §3.3), polices, `lib/animations.ts`, composants `FadeUp`, `SplitReveal`, `SectionHeader`.
6. `types/offer.ts` et `data/offres/*.ts` : transcrire le §9 **fidèlement**.
7. Layout : `Navbar` (avec le menu Offres), `Footer`, `PageShell`, `useScrollSpy`.
8. Accueil : Hero cinématographique GSAP (§7.1, identique à la maquette), puis WhatIACanDo, Process, Offres, Stack, FAQ.
9. ContactSection : branchement à `/api/contact`, pré-remplissage `?offre=`, gestion des erreurs.
10. **Gabarit des pages offres** (§8), puis les 6 pages via `getStaticPaths`.
11. Maquettes d'illustration : ReportExcerpt, ChatMockup, DashboardMockup, MessageThread (avec onglets par secteur), Timeline, BeforeAfter.
12. Pages légales et 404.
13. CustomCursor, CookieBanner.
13 bis. **Comparer visuellement** le résultat avec la maquette : capturer `design/maquette.html` et le site (Playwright, mêmes largeurs 390 / 768 / 1440 px, en faisant défiler pour déclencher les animations) et corriger tout écart de couleur, d'espacement, de taille ou d'animation.
14. Tests responsive et vérifications d'accessibilité : navigation au clavier, contrastes, `aria` sur les onglets et accordéons.
15. Dockerfiles, docker-compose, Nginx, puis déploiement.

---

## 16. Règles absolues pour Claude Code

1. **Pages Router uniquement**, jamais de dossier `app/`. **Pas de `pages/api/`** : l'API, c'est FastAPI.
2. **TypeScript strict** côté front, **typage complet** côté Python. Pas de `any`.
3. **Aucun prix daddIA** nulle part (contenu, code, métadonnées). Seule exception : le montant fictif du devis dans l'histoire de l'Assistant IA (§9.4).
4. **Aucune image décorative.** Les maquettes sont en HTML/CSS.
5. **Les exemples sont toujours étiquetés comme illustratifs.** Jamais de faux témoignages, de faux logos clients ou de faux avis.
6. **Ne jamais mentionner de nom d'agent ou de projet interne** sur l'offre Assistant IA.
7. **Pas de jargon technique** dans les pages offres (§8.2).
8. **Pas de mention « finançable OPCO »** (§9.6).
9. **Le contenu du §9 est validé** : le transcrire, ne pas le réécrire.
10. **La maquette `design/maquette-source.jsx` fait foi pour le design.** Ne pas la remplacer par des composants 21st.dev.
11. **GSAP + ScrollTrigger** pour le hero, **Framer Motion** / `FadeUp` / `SplitReveal` pour le reste, et `prefers-reduced-motion` respecté partout.
12. **Hero fidèle à la maquette** (§7.1), avec sa version statique pour `prefers-reduced-motion`.
13. **Échappement HTML** de toutes les données utilisateur dans les emails. **Aucune donnée personnelle dans les logs.**
14. Tous les liens « Prendre contact » pointent vers `/#contact?offre=<slug>`.
15. Langue française partout, avec `lang="fr"`.
16. **Exécution autonome, en une seule fois** : aucune demande de validation. Les valeurs manquantes sont remplacées par un marqueur, les erreurs sont corrigées seul, et tout est consigné dans `DECISIONS.md` / `RAPPORT.md` (voir « Mode d'exécution »).
17. **Exemples hyper visuels** (§8.3) : un exemple rendu en simple paragraphe est non conforme.

---

## 17. Points en attente de validation (à trancher par Daddio)

| # | Sujet | Valeur provisoire dans le code |
|---|---|---|
| 1 | ~~**Chatbot — qui modifie les réponses ?**~~ ✅ **Tranché** : le client modifie lui-même via un espace en ligne. | Contenu du §9.2 à jour. |
| 2 | **Ateliers — Qualiopi / OPCO.** Les prises en charge OPCO exigent en général la certification Qualiopi. | Phrase neutre « contactez-nous pour les possibilités de financement ». |
| 3 | **Ateliers ouverts — affichage du prix.** Une inscription en ligne avec paiement imposerait d'afficher le tarif. | Pas de prix. CTA « Être prévenu des prochaines dates » via le formulaire. |
| 4 | **Assistant IA — signaux de prospection.** Confirmer les sources réellement branchées au lancement : Pappers, permis de construire, appels d'offres. | Les trois sont mentionnées. Retirer celles qui ne seront pas prêtes. |
| 5 | **Mentions légales.** SIRET, adresse de contact, hébergeur, directeur de publication. | Marqués `[À COMPLÉTER]`. |
| 6 | **Liens réseaux sociaux** (LinkedIn, YouTube). | `#` en attendant. |
