from flask import Flask, request, g
import pymysql
import uuid

app = Flask(__name__)

# MySQL bağlantı ayarları
DB_CONFIG = {
    "host": "mysql_db",
    "user": "root",
    "password": "db-78n9n",
    "database": "flask_app",
}

def get_db_connection():
    """Veritabanı bağlantısını sağlar."""
    if "db" not in g:
        g.db = pymysql.connect(**DB_CONFIG)
    return g.db

@app.teardown_appcontext
def close_db_connection(exception):
    """Uygulama bağlamı sona erdiğinde veritabanı bağlantısını kapatır."""
    db = g.pop("db", None)
    if db:
        db.close()

@app.route("/")
def hello():
    # Benzersiz bir session_id oluştur
    session_id = str(uuid.uuid4())
    
    # MySQL bağlantısını al
    conn = get_db_connection()
    cursor = conn.cursor()

    # Veritabanına session_id'yi ekle
    query = "INSERT INTO users (session_id) VALUES (%s)"
    cursor.execute(query, (session_id,))
    conn.commit()

    return f"Hello from App 1! Your session ID: {session_id}"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
