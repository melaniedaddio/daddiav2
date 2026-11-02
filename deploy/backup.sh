#!/bin/sh
# Sauvegarde quotidienne de la base, rotation sur 14 jours.
# Cron (crontab -e) : 30 3 * * * /opt/daddia/deploy/backup.sh >> /var/log/daddia-backup.log 2>&1
set -eu
cd "$(dirname "$0")"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/daddia}"
mkdir -p "$BACKUP_DIR"
. ./.env
FILE="$BACKUP_DIR/daddia-$(date +%Y-%m-%d_%H%M).sql.gz"
docker compose exec -T db pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" | gzip > "$FILE"
find "$BACKUP_DIR" -name 'daddia-*.sql.gz' -mtime +14 -delete
echo "$(date -Iseconds) sauvegarde OK : $FILE"
