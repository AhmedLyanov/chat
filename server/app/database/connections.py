import sqlite3

def get_db():
    """Подключение к БД"""
    conn = sqlite3.connect("instance/messenger.db")
    return conn

def init_db():
    """Создание таблиц (вызывается один раз при старте)"""
    conn = get_db()
    cursor = conn.cursor()
    
    # Таблица пользователей
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    
    conn.commit()
    conn.close()