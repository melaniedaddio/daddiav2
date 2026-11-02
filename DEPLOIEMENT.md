# Déploiement de daddia.fr — consignes pour Claude Code sur le serveur

Ce document s'adresse à l'assistant (Claude Code) qui déploie le site sur le VPS de Daddio. Lis-le en entier avant toute commande, puis suis les étapes dans l'ordre.

Le projet se trouve dans `~/daddia` (copié depuis le Mac de Daddio). L'architecture est décrite dans `PRD.md` (§2 et §14), les choix techniques dans `DECISIONS.md`, et les commandes de base dans `RAPPORT.md`.

---

## 0. Ce qu'on déploie

```
Navigateur ──HTTPS──▶ Nginx (sur l'hôte, TLS Let's Encrypt)
                       ├── /api/*  → backend  FastAPI    127.0.0.1:8000 ──▶ PostgreSQL 16 (conteneur, non exposé)
                       └── /       → frontend Next.js    127.0.0.1:3000          └──▶ Resend (emails)
```

- `deploy/docker-compose.yml` lance trois conteneurs : `db`, `backend` et `frontend`.
- Nginx tourne **sur l'hôte**, pas en conteneur. Sa configuration est `deploy/nginx/daddia.conf`.
- Domaines : `daddia.fr` (principal) et `www.daddia.fr` (redirigé vers le principal).

---

## 1. Règles absolues

### Sécurité

1. **Aucun secret dans la conversation, les logs ou les fichiers versionnés.**
   - Génère les mots de passe sur le serveur avec `openssl rand -base64 32 | tr -d '/+=' | cut -c1-32`.
   - Écris-les directement dans les fichiers `.env`. Ne les affiche jamais en clair.
   - La clé Resend est fournie par Daddio : demande-lui de la coller lui-même dans `backend/.env` (`nano`), ou de te la donner une seule fois. Ne la répète jamais ensuite.
2. **Les fichiers `.env` sont en `chmod 600`** et appartiennent à l'utilisateur qui lance Docker.
3. **Seuls les ports 22 (SSH), 80 et 443 sont ouverts sur Internet.**
   - PostgreSQL n'est jamais publié.
   - Le backend et le frontend sont publiés **uniquement sur `127.0.0.1`**, comme dans `docker-compose.yml`. Ne change jamais ça en `0.0.0.0`.
   - Docker contourne UFW pour les ports publiés : la liaison à `127.0.0.1` est la vraie protection.
4. **Pas de `ENV=development` en production.** Avec `ENV=production`, la documentation de l'API (`/api/docs`) est désactivée.
5. **Nginx doit transmettre `X-Forwarded-For $remote_addr`**, comme dans le fichier fourni. Ne le remplace pas par `$proxy_add_x_forwarded_for` : la limite de 5 envois par heure du formulaire deviendrait contournable.
6. **Ne stocke ni n'affiche de données personnelles de visiteurs** (leads) dans tes réponses. Pour vérifier la base, compte les lignes ou affiche seulement `id`, `created_at`, `offre` et `email_status`.

### Prudence sur le serveur

7. **Ne casse pas l'accès SSH.**
   - Avant d'activer UFW, autorise SSH (`ufw allow OpenSSH`, ou le port réel si SSH n'écoute pas sur 22).
   - Ne désactive jamais l'authentification par mot de passe, ne change pas le port SSH et ne touche pas à `sshd_config` sans l'accord explicite de Daddio, **et** sans avoir vérifié qu'une connexion par clé fonctionne.
8. **Ce serveur héberge peut-être d'autres services.** Avant toute modification, fais l'inventaire :
   - les conteneurs (`docker ps`) ;
   - les ports écoutés (`ss -tlnp`) ;
   - les sites Nginx (`ls /etc/nginx/sites-enabled/`).

   Ne supprime, n'arrête et ne modifie rien qui n'appartient pas à daddIA. Si un port (3000, 8000, 80 ou 443) est déjà pris, voir l'étape 4.
9. **Demande confirmation avant toute action irréversible** :
   - `docker compose down -v` (supprime la base) ;
   - suppression de fichiers ou de volumes ;
   - redémarrage du serveur ;
   - modification d'un site Nginx existant ;
   - `ufw enable` sur un serveur où d'autres services tournent.
10. **Ne modifie pas le code de l'application.** Ton rôle est de la déployer.
    - Si un build échoue, diagnostique et explique avant de toucher au code.
    - Une seule exception : la configuration (fichiers `.env`, ports, `server_name`).

### Contenu

11. **Les mentions légales contiennent encore des valeurs `[À COMPLÉTER]`** (SIRET, adresse, hébergeur, directeur de publication). Leur publication est obligatoire en France.
    - Lance `grep -rn "À COMPLÉTER" frontend/pages` et montre le résultat à Daddio.
    - Demande-lui s'il veut les compléter avant la mise en ligne. Si oui, il te donne les valeurs, tu les remplaces dans `frontend/pages/mentions-legales.tsx` et `frontend/pages/confidentialite.tsx`, puis tu reconstruis le frontend.
    - Ne mets jamais en ligne sans lui avoir posé la question.
    - **Préviens-le** : le code source de référence est sur son Mac. Toute modification faite sur le serveur sera écrasée par sa prochaine copie (`rsync`). Il doit reporter les mêmes valeurs dans sa copie locale.

---

## 2. Informations à demander à Daddio au début

Pose ces questions en une seule fois, puis attends les réponses :

1. Le nom de domaine est-il bien `daddia.fr` ? Les enregistrements DNS **A** de `daddia.fr` et `www.daddia.fr` pointent-ils déjà vers l'IP de ce serveur ?
2. L'email pour Let's Encrypt (alertes d'expiration du certificat).
3. La clé API Resend. Le domaine `daddia.fr` est-il vérifié dans Resend (DNS SPF/DKIM) ? Sans ça, les emails ne partiront pas, mais le formulaire enregistrera quand même les demandes.
4. Le lien Cal.com définitif : par défaut `https://cal.com/daddia/decouverte`.
5. Les valeurs `[À COMPLÉTER]` des mentions légales, ou son accord pour mettre en ligne sans elles (déconseillé).
6. Le nom de l'hébergeur du VPS, si les mentions légales doivent être complétées (souvent visible avec `cat /sys/class/dmi/id/sys_vendor`, à confirmer avec lui).

---

## 3. Vérifications préalables (lecture seule)

```bash
cat /etc/os-release | head -3
uname -m
free -h                         # RAM + swap : le build Next.js veut ~1,5 Go
df -h /                         # au moins 5 Go libres
docker --version; docker compose version
nginx -v 2>&1; systemctl is-active nginx
sudo ss -tlnp | grep -E ':(22|80|443|3000|5432|8000)\b'
docker ps --format 'table {{.Names}}\t{{.Ports}}'
ls -la /etc/nginx/sites-enabled/ 2>/dev/null
sudo ufw status verbose 2>/dev/null
curl -s https://api.ipify.org; echo
dig +short daddia.fr; dig +short www.daddia.fr   # doivent renvoyer l'IP ci-dessus
ls ~/daddia
```

Fais un résumé de l'état du serveur à Daddio avant de continuer.

- **Si les DNS ne pointent pas encore vers le serveur**, tu peux préparer et lancer les conteneurs, mais pas le certificat TLS (étape 7). Dis-lui quoi configurer chez son registrar.
- **Si la RAM fait moins de 2 Go et qu'il n'y a pas de swap**, propose d'ajouter 2 Go de swap avant le build. Sinon le build risque d'être tué faute de mémoire.
  ```bash
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  ```

---

## 4. Installer ce qui manque

Uniquement ce qui est absent, sur Debian ou Ubuntu :

```bash
sudo apt-get update
# Docker (si absent) : méthode officielle
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"     # puis se reconnecter, ou utiliser sudo docker
sudo apt-get install -y nginx certbot python3-certbot-nginx ufw fail2ban unattended-upgrades
sudo dpkg-reconfigure -f noninteractive unattended-upgrades   # mises à jour de sécurité automatiques
sudo systemctl enable --now fail2ban                          # protège SSH contre le bruteforce
```

**Si les ports 3000 ou 8000 sont déjà pris** par un autre service :
- choisis des ports libres, par exemple 3100 et 8100 ;
- ajoute `FRONTEND_PORT=3100` et `BACKEND_PORT=8100` dans `deploy/.env` ;
- mets à jour les deux `proxy_pass` de la config Nginx (`127.0.0.1:3100` et `127.0.0.1:8100`).

---

## 5. Fichiers de configuration (secrets)

```bash
cd ~/daddia
DBPASS=$(openssl rand -base64 32 | tr -d '/+=' | cut -c1-32)

# Base de données
cat > deploy/.env <<EOF
POSTGRES_USER=daddia
POSTGRES_PASSWORD=$DBPASS
POSTGRES_DB=daddia
EOF

# Backend
cat > backend/.env <<EOF
ENV=production
DATABASE_URL=postgresql+psycopg://daddia:$DBPASS@db:5432/daddia
RESEND_API_KEY=re_CHANGE_ME
CONTACT_EMAIL=contact@daddia.fr
MAIL_FROM_NOTIFICATION="Site daddIA <noreply@daddia.fr>"
MAIL_FROM_CONFIRMATION="daddIA <contact@daddia.fr>"
ALLOWED_ORIGINS=https://daddia.fr,https://www.daddia.fr
TRUSTED_HOSTS=daddia.fr,www.daddia.fr,localhost,127.0.0.1
RATE_LIMIT_CONTACT=5/hour
EOF

unset DBPASS
chmod 600 deploy/.env backend/.env
```

Ensuite :
- **La clé Resend** : demande à Daddio de remplacer `re_CHANGE_ME` dans `backend/.env` (`nano backend/.env`).
- **Le lien Cal.com**, s'il diffère de `https://cal.com/daddia/decouverte` : ajoute `NEXT_PUBLIC_CAL_URL=<lien>` dans `deploy/.env`. Il est intégré au moment du build. `NEXT_PUBLIC_SITE_URL` vaut `https://daddia.fr` et `NEXT_PUBLIC_API_BASE` vaut `/api` par défaut.

Le mot de passe de `DATABASE_URL` doit être **identique** à `POSTGRES_PASSWORD`. Ne réutilise pas un mot de passe affiché ailleurs.

---

## 6. Lancer les conteneurs

```bash
cd ~/daddia/deploy
docker compose up -d --build        # premier build : 3 à 8 min
docker compose ps                   # db « healthy », backend et frontend « running »
docker compose logs --tail=50 backend   # doit montrer « Running upgrade -> 0001 » (migration Alembic) puis Uvicorn
curl -s http://127.0.0.1:8000/api/health        # {"status":"ok"}
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/   # 200
```

**Si le build du frontend échoue :**
- par manque de mémoire : ajoute du swap (étape 3) et relance ;
- au téléchargement des polices Google : vérifie l'accès Internet sortant du serveur.

---

## 7. Nginx et HTTPS

La config fournie contient déjà les directives SSL. **Il faut donc le certificat avant de l'activer**, sinon `nginx -t` échoue.

### 7.a Obtenir le certificat (les DNS doivent pointer vers le serveur)

**Si Nginx n'héberge aucun autre site**, ou si on peut le couper 30 secondes avec l'accord de Daddio :

```bash
sudo systemctl stop nginx
sudo certbot certonly --standalone -d daddia.fr -d www.daddia.fr --email <EMAIL> --agree-tos --no-eff-email
sudo systemctl start nginx
```

**Si d'autres sites tournent sur Nginx**, n'arrête rien. Crée d'abord un bloc HTTP temporaire, puis utilise le plugin nginx :

```bash
sudo tee /etc/nginx/sites-available/daddia.conf >/dev/null <<'EOF'
server { listen 80; server_name daddia.fr www.daddia.fr; location / { return 200 'ok'; } }
EOF
sudo ln -sf /etc/nginx/sites-available/daddia.conf /etc/nginx/sites-enabled/daddia.conf
sudo nginx -t && sudo systemctl reload nginx
sudo certbot certonly --nginx -d daddia.fr -d www.daddia.fr --email <EMAIL> --agree-tos --no-eff-email
```

### 7.b Activer la vraie configuration

```bash
sudo cp ~/daddia/deploy/nginx/daddia.conf /etc/nginx/sites-available/daddia.conf
sudo ln -sf /etc/nginx/sites-available/daddia.conf /etc/nginx/sites-enabled/daddia.conf
# Désactive le site par défaut seulement s'il n'est pas utilisé par un autre service :
# sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot renew --dry-run        # le renouvellement automatique doit réussir
```

Le fichier utilise `listen 443 ssl http2;`, compatible avec toutes les versions de Nginx. À partir de Nginx 1.25, un avertissement de dépréciation s'affiche, sans conséquence. Tu peux alors le remplacer par `listen 443 ssl;` suivi de `http2 on;`.

---

## 8. Pare-feu

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH          # ou: sudo ufw allow <port_ssh>/tcp si SSH n'est pas sur 22
sudo ufw allow 'Nginx Full'     # 80 + 443
# Si d'autres services légitimes écoutent sur Internet, autorise-les AVANT d'activer (demande à Daddio)
sudo ufw enable                 # demande confirmation à Daddio juste avant
sudo ufw status verbose
```

---

## 9. Sauvegardes de la base

```bash
sudo mkdir -p /var/backups/daddia && sudo chown "$USER" /var/backups/daddia
~/daddia/deploy/backup.sh        # test manuel : crée un .sql.gz
ls -lh /var/backups/daddia
( crontab -l 2>/dev/null; echo "30 3 * * * $HOME/daddia/deploy/backup.sh >> $HOME/daddia-backup.log 2>&1" ) | crontab -
crontab -l
```

Les sauvegardes restent sur le même serveur. Recommande à Daddio d'en copier régulièrement une hors du serveur.

---

## 10. Vérifications finales (toutes doivent passer)

```bash
# Redirections et HTTPS
curl -sI http://daddia.fr | head -3                  # 301 vers https://daddia.fr
curl -sI https://www.daddia.fr | head -3             # 301 vers https://daddia.fr
curl -s -o /dev/null -w "%{http_code}\n" https://daddia.fr/                      # 200
for s in audit-ia chatbot-ia outil-sur-mesure assistant-ia accompagnement-ia ateliers-ia; do
  curl -s -o /dev/null -w "$s %{http_code}\n" https://daddia.fr/offres/$s; done  # 6 × 200
curl -s -o /dev/null -w "%{http_code}\n" https://daddia.fr/mentions-legales      # 200

# En-têtes de sécurité
curl -sI https://daddia.fr | grep -iE 'strict-transport|x-frame|x-content-type|referrer'

# API
curl -s https://daddia.fr/api/health                                             # {"status":"ok"}
curl -s -o /dev/null -w "%{http_code}\n" https://daddia.fr/api/docs              # 404 (docs désactivées)
head -c 70000 /dev/zero | tr '\0' 'x' | curl -s -o /dev/null -w "%{http_code}\n" -H 'Content-Type: application/json' --data-binary @- https://daddia.fr/api/contact   # 413

# Formulaire : UN seul envoi de test (la limite est de 5 par heure et par IP)
curl -s -w " %{http_code}\n" -H 'Content-Type: application/json' https://daddia.fr/api/contact \
  -d '{"nom":"Test déploiement","entreprise":"daddIA","email":"contact@daddia.fr","offre":"autre","message":"Test automatique après déploiement.","consentement":true,"website":""}'
# Attendu : {"success":true} 201. Avec une vraie clé Resend, contact@daddia.fr reçoit 2 emails.
docker compose -f ~/daddia/deploy/docker-compose.yml exec -T db psql -U daddia -c "select id, created_at, offre, email_status from leads order by created_at desc limit 3;"
# Si email_status = failed : vérifier la clé Resend et la vérification du domaine (docker compose logs backend, sans données perso).
# Supprimer le lead de test :
docker compose -f ~/daddia/deploy/docker-compose.yml exec -T db psql -U daddia -c "delete from leads where nom = 'Test déploiement';"

# Ports exposés : seuls 22, 80 et 443 doivent écouter sur 0.0.0.0 ou [::]
sudo ss -tlnp | grep -vE '127\.0\.0\.1|\[::1\]'
```

Demande ensuite à Daddio d'ouvrir `https://daddia.fr` dans son navigateur et de tester le formulaire de contact.

---

## 11. Mettre à jour le site plus tard

Quand Daddio recopie une nouvelle version du code dans `~/daddia` (même commande `rsync` depuis son Mac, qui ne touche pas aux `.env` du serveur) :

```bash
cd ~/daddia/deploy
docker compose up -d --build          # reconstruit et redémarre ; la base (volume pgdata) est conservée
docker compose ps && curl -s https://daddia.fr/api/health
docker image prune -f                 # nettoie les anciennes images
```

- Ne lance **jamais** `docker compose down -v` : ça supprime la base.
- En cas de problème, restaure une sauvegarde :
  ```bash
  gunzip -c /var/backups/daddia/<fichier>.sql.gz | docker compose exec -T db psql -U daddia -d daddia
  ```
  À faire uniquement avec l'accord de Daddio.

---

## 12. Rapport de fin

Termine par un résumé pour Daddio :
- ce qui a été installé ou modifié sur le serveur ;
- les ports et services en place ;
- le résultat de chaque vérification de l'étape 10 ;
- ce qui reste à faire de son côté (valeurs `[À COMPLÉTER]`, clé et domaine Resend, liens LinkedIn et YouTube dans `frontend/lib/site.ts`, sauvegarde hors serveur) ;
- les commandes utiles : `docker compose ps`, `logs`, mise à jour, consultation des leads.

N'y mets aucun secret.
