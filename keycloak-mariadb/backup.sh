#!/bin/bash

# Veritabanı bağlantı bilgileri
DB_USER="root"             # MariaDB kullanıcı adı
DB_PASS="Qwerasdf"    # MariaDB şifresi
DB_NAME="example"    # Yedeklemek istediğiniz veritabanı adı
BACKUP_DIR="./backups"  # Yedeklerin kaydedileceği dizin
DATE=$(date +"%Y%m%d_%H%M%S") # Yedekleme için tarih formatı

# Yedekleme işlemi
mkdir -p $BACKUP_DIR   # Yedekleme dizinini oluştur (eğer yoksa)
mariadb-dump -u $DB_USER -p$DB_PASS $DB_NAME -h localhost --port 3306 --ssl-verify-server-cert=FALSE > $BACKUP_DIR/$DB_NAME_$DATE.sql

# Yedekleme başarısız olduysa hata mesajı yazdır
if [ $? -eq 0 ]; then
    echo "Backup successfully completed at $DATE"
else
    echo "Backup failed at $DATE"
fi

#crontab -e
#0 23 * * * //Users/indibit/Desktop/project/backup_mariadb.sh
