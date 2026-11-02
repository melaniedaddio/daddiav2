# Décisions prises sans validation

Choix faits pendant la construction, quand le PRD ne tranchait pas ou qu'une contrainte technique l'imposait. Chaque point peut être revu.

## Structure et outillage

1. **Monorepo à la racine du dossier `DaddIA/`** (et non dans un sous-dossier `daddia/`). `PRD.md` et `design/` y ont été copiés depuis `daddia_kit_claude_code/`, qui reste intact.
2. **Versions actuelles** : Next.js 16.3 (Pages Router), React 19.2, Tailwind CSS v4, Python 3.12, FastAPI 0.142.
3. **Tailwind v4** : la palette du §3.1 reste dans `tailwind.config.ts`, chargé par `@config` dans `styles/globals.css`. Les variables shadcn sont alignées sur la palette sombre.
4. **shadcn** : initialisé et les composants demandés sont ajoutés (`components/ui/`). La CLI a généré des imports vers un paquet npm tiers nommé `cn`. Je les ai redirigés vers `lib/utils.ts` (clsx + tailwind-merge) et j'ai retiré ce paquet. L'interface elle-même utilise les composants de la maquette (accordéon, champs, pastilles), qui priment sur le design.
5. **`npm run build` utilise webpack** (`next build --webpack`). Le build Turbopack par défaut échoue de façon intermittente sur `next/font/google` (« next/font/google queries have exactly one entry »). Le build webpack est stable.
6. **Relais `/api` en développement** : `next.config.ts` relaie `/api/*` vers `http://localhost:8000` (modifiable avec `DEV_API_PROXY`), uniquement avec `next dev`. On garde ainsi `NEXT_PUBLIC_API_BASE=/api` partout, sans CORS. En production, c'est Nginx qui fait ce routage. Il n'y a toujours **aucun dossier `pages/api`**.

## Design (la maquette prime)

7. **Bug de la maquette corrigé** : le titre « Commençons ensemble. » portait la classe `gsap-reveal` et ne s'affichait jamais. La classe est maintenant sur le bloc `.cta-final` entier, qui est révélé par la timeline. Bonus : rien ne s'affiche en surimpression avant l'hydratation.
8. **Hero** : `w-screen` est remplacé par `w-full` pour éviter tout défilement horizontal. Un seul `<h1>` contient deux `<span>` animés, comme le demande le §7.1. La timeline GSAP est celle de la maquette, à l'identique.
9. **Mobile lent** : `end: "+=4500"` au lieu de 7000 si l'écran fait moins de 768 px **et** que l'appareil a 4 cœurs ou moins (`navigator.hardwareConcurrency`).
10. **Préfixes CSS** : les propriétés `-webkit-` sont écrites avant les propriétés standard. Sinon, Lightning CSS (Tailwind v4) supprimait `backdrop-filter`, et le flou des badges flottants disparaissait.
11. **Cibles tactiles** : pastilles de secteur, onglets et liens d'action font au moins 44 px de haut (§13). Ils sont donc légèrement plus hauts que dans la maquette.
12. **Titre H1 des pages offres** : sa taille dépend de la largeur de l'écran sur mobile, car « Accompagnement » en Syne fait près de 15 em et débordait à 390 px.
13. **Case de consentement** : une case personnalisée au style des champs, au lieu de la case native blanche.

## Contenu et données

14. **Type `Offer` étendu** (`types/offer.ts`, champs marqués « ajout »). Le type du §8.1 ne pouvait pas porter tout le contenu du §9 ni les scènes du §8.3 :
    - `featureSections` (« Votre propre ChatGPT… », « Il apprend… ») ;
    - `gain`, `beforeIcon`, `afterIcon`, `whatLabel` et `resultLabel` sur les exemples ;
    - les réponses illustratives de l'interface privée ;
    - les barres et la difficulté du rapport ;
    - la liste des impayés du tableau de bord ;
    - les variantes de frise et de cartes ;
    - `excludedLinks`, `financing`, `cta`.
15. **`seo.description`** : le PRD ne donne que `seo.title`. La description reprend le `cardPitch` validé de chaque offre.
16. **Personnages des exemples** : Sophie (institut), Marc (immobilier) et Karim (BTP), repris de l'histoire de l'Assistant IA, servent de fil rouge sur toutes les pages offres, avec un mini-avatar à initiale.
17. **Textes d'illustration ajoutés** (jamais présentés comme réels, toujours marqués « Exemple illustratif ») :
    - les réponses de l'interface privée aux 5 questions suggérées, **sans aucun montant** (la seule somme du site reste « 4 850 € HT ») ;
    - un mini-message d'exemple par capacité de l'assistant ;
    - les horodatages des conversations ;
    - 2 photos jointes à la fin de la conversation du Chatbot ;
    - les noms de fichiers des pièces jointes ;
    - les 3 lignes « Factures impayées » du tableau de bord (sans montant) ;
    - les valeurs de la jauge « Ce qu'il connaît de vous » ;
    - le client fictif « Rénov'Azur ».
18. **Titres de section non fournis par le PRD** : « Pour qui ? », « Le déroulé », « Un assistant, plein de missions » (capacités), « Mises en situation », « Sans surprise / Ce qui est inclus », « Vos questions », et le texte du bloc final « Parlons de votre situation ».
19. **Accompagnement** : la frise « Votre parcours sur 3 mois » est fusionnée avec les exemples par secteur. Les 3 jalons s'affichent avec, sous chaque mois, la réalisation du secteur choisi (§8.3, « mini-carte de réalisation »).
20. **Assistant IA** : pas d'onglets « Exemples de situations » (le §9.4 n'en définit pas). Les onglets de secteur pilotent « Une journée avec votre assistant ». Le choix du secteur est partagé entre pages (sessionStorage, « institut » par défaut).
21. **Conversations** : le client (ou le dirigeant) est à gauche en gris, l'assistant à droite en crimson, comme le dit le §8.3, y compris dans « Une journée avec votre assistant ».
22. **Listes « C'est pour vous si… »** : première lettre mise en majuscule et point final ajouté pour l'affichage. Le texte lui-même n'est pas modifié.
23. **Commentaire de code** : la formule interdite du §17 n'apparaît nulle part, même pas dans les commentaires.

## Backend

24. **Ordre de traitement de `POST /api/contact`** : limitation, puis champ piège, puis validation. Le corps est lu comme JSON brut pour tester le champ piège **avant** la validation : un robot qui remplit le piège reçoit toujours `200 {"success": true}`, même si ses autres champs sont invalides.
25. **Nettoyage des espaces avant validation** (`mode="before"`) : un message de 9 caractères entouré d'espaces est refusé, comme le fait `.trim()` côté Zod.
26. **`/api/health`** renvoie `503 {"status":"error"}` si la base ne répond pas.
27. **`TRUSTED_HOSTS`** est configurable par variable d'environnement (valeur par défaut : `daddia.fr, www.daddia.fr, localhost, 127.0.0.1`), pour les tests et le healthcheck Docker.
28. **Base de développement** : SQLite (`sqlite:///./dev.db`) par défaut. Les tests utilisent SQLite en mémoire. La migration Alembic a été vérifiée sur un vrai PostgreSQL 16 (montée et descente).
29. **Uvicorn avec 1 worker** (au lieu de 2) : slowapi stocke ses compteurs en mémoire, par processus. Avec 2 workers, la limite réelle aurait été de 10 requêtes par heure. Le trafic attendu rend 1 worker suffisant. Pour monter en charge, passer à un stockage Redis.
30. **Image backend** : le binaire du virtualenv est appelé directement (`PATH=/app/.venv/bin`) plutôt que `uv run`, qui peut tenter d'écrire en tant qu'utilisateur non-root. Un `HEALTHCHECK` est ajouté.

## Déploiement

31. **Nginx** : `X-Forwarded-For $remote_addr` au lieu de `$proxy_add_x_forwarded_for`. Avec `--forwarded-allow-ips=*`, un visiteur pouvait sinon falsifier son IP et contourner la limite de 5 requêtes par heure (vérifié : la falsification ne passe pas).
32. **Ports configurables** dans `docker-compose.yml` (`BACKEND_PORT`, `FRONTEND_PORT`, 8000 et 3000 par défaut), et `NEXT_PUBLIC_*` passés en arguments de build.
33. **Sauvegardes** : `deploy/backup.sh` (pg_dump compressé, rotation sur 14 jours), à lancer par cron.

## Modifications demandées après livraison (4 octobre 2026)

34. **Accueil réorganisé** : « Nos offres » passe avant « Ce que l'IA peut faire pour vous ». Les liens de la navbar suivent le nouvel ordre (Offres, L'IA pour vous, Processus, FAQ). Les fonds ont été réalternés pour garder le rythme sombre / secondaire.
35. **Section « Stack technique » retirée.**
36. **Hero** : la phrase « Basés à Nice, disponibles partout en France. » est retirée du texte de la carte.
37. **Nouvelle accroche du hero** (choix de Daddio) : « L'IA qui travaille pour vous, / et avec vous. » (« ou » remplacé par « et » à la demande de Daddio). Elle remplace « Vous perdez des heures / sur des tâches répétitives. », qui ne couvrait pas le chatbot, l'accompagnement ni les ateliers.
38. **Guide « Quel est votre besoin ? »** (choix de Daddio, option A) : il remplace le sélecteur par secteur du §7.2 (Commerce, Immobilier…), qui faisait doublon avec les exemples des pages offres.
    - 5 besoins, chacun relié à son offre : clients → Chatbot ; administratif → Assistant IA ; métier → Outil sur mesure ; apprendre → Accompagnement et Ateliers ; par où commencer → Audit.
    - Chaque besoin affiche la situation (« C'est pour vous si… » de l'offre), la carte de l'offre et une courte scène illustrative.
    - Les scènes sont **lues directement dans `data/offres/*.ts`** (`data/needs.ts`). Aucun texte n'est dupliqué ni inventé, à part les libellés des 5 besoins et le titre de section « Quel est votre besoin ? / On vous montre la réponse. ».
    - `data/sectors.ts` et `SectorSelector` sont supprimés. La section garde l'ancre `#ia-pour-vous` et le lien « L'IA pour vous » de la navbar.
39. **Wordmark géant du hero** (demande de Daddio) : il s'affiche comme le logo, « dadd » en blanc (dégradé argenté conservé) et « IA » en crimson, sans majuscules forcées. Auparavant, il était écrit « DADDIA » en blanc.
40. **Section Processus devenue « Comment on commence »** (validé par Daddio). L'ancienne version (« De zéro à l'outil en production », 5 étapes) faisait doublon avec le « Comment ça se passe » de chaque page offre, et ne décrivait que les offres qui livrent un outil.
    - Elle présente maintenant 4 étapes communes à toutes les offres : Vous nous écrivez → On écoute → On vous oriente → Vous décidez.
    - Les textes reprennent des formules déjà validées (réponse sous 24 h, appel gratuit de 30 min, franchise si l'IA n'apporte rien, « commencez petit, sans engagement long »).
    - Le lien de la navbar devient « Comment ça marche » (l'ancre `#processus` est conservée).
41. **Exemples de situations des pages offres** (demande de Daddio) :
    - les prénoms (Sophie, Marc, Karim) et leur avatar à initiale sont retirés. Chaque scène est titrée par le secteur (« Institut de beauté, 4 employées »…) avec l'icône du secteur ;
    - les badges chiffrés animés (« ~5 h / semaine », « 3 rendez-vous pris la nuit », « 1 seule saisie au lieu de 3 ») sont retirés. Le résultat reste affiché en texte ;
    - les champs `gain` restent dans les données, car le guide de l'accueil les utilise encore.
42. **Assistant IA : l'interface passe au premier plan** (demande de Daddio). Elle devient le canal principal ; WhatsApp ou Telegram restent en complément.
    - Accroche : « Imaginez un assistant à qui vous pouvez tout demander, dans votre propre interface, à votre nom… Il ne se contente pas de répondre : il s'en occupe… ». Le mot « agent » est évité (jargon, et le PRD interdit de citer un nom d'agent).
    - Passages réécrits :
      - la carte de l'offre et sa description pour Google ;
      - l'introduction de « Votre propre ChatGPT… » (plus de « En plus de WhatsApp ») ;
      - l'étape 3 du déroulé (l'interface n'est plus « si vous le souhaitez ») ;
      - les éléments « Inclus » (l'interface est incluse, l'accès WhatsApp, Telegram ou email vient en complément) ;
      - la réponse de FAQ « Je dois apprendre un logiciel ? ».
    - La scène « Une journée avec votre assistant » reste dans un téléphone (canal WhatsApp ou Telegram).
43. **Ateliers, thème « ChatGPT / Claude »** (demande de Daddio) : « pour dirigeants » est retiré du titre du thème.
44. **Ateliers IA : nouvelle scène « Ce que votre équipe saura faire en repartant »** (demandes de Daddio, en deux temps).
    - Les 3 exemples par secteur sont retirés, car jugés trop généralistes. Une première version centrée sur les assistants personnalisés a été remplacée : il ne fallait pas trop insister dessus.
    - La scène (bloc `usage-gallery`) montre 6 usages concrets avec des outils grand public (ChatGPT, Claude, Gemini, Copilot…), dans une entreprise générique :
      - une présentation aux couleurs de la charte ;
      - un compte-rendu de réunion ;
      - un fichier Excel interrogé ;
      - des tickets photographiés rangés en tableau ;
      - un message délicat en trois tons ;
      - un assistant pour l'équipe.
    - Chaque usage montre ce qu'on donne à l'IA, la demande et un résultat visuel (diapositives, tableau, graphique, trois réponses, réponse sourcée). Aucun montant n'apparaît, et la scène est marquée « Exemple illustratif ».
    - Les textes ont été rédigés pour l'occasion et sont à valider par Daddio.
