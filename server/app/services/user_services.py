# user_services.py - файл, содержащий функции для работы с базой данных
import sqlite3
from app.database.connections import get_db


def create_user(student_id: str, email: str, password: str, token_session: str = None):
    """Создание нового пользователя"""
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            INSERT INTO users (student_id, email, password, token_session) 
            VALUES (?, ?, ?, ?)
        """, (student_id, email, password, token_session))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        cursor.close()
        conn.close()


# С попомщью этой функции мы будем обновлять токен для существующего пользователя, если он уже есть в базе данных
def update_user_token(email: str, token: str):
    """Обновить токен пользователя"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("""
        UPDATE users SET token_session = ? WHERE email = ?
    """, (token, email))
    conn.commit()
    cursor.close()
    conn.close()

# Ищем человека по email, чтобы понять, есть ли он уже в базе данных. 
# Если есть, то возвращаем его данные, если нет - возвращаем None
def filter_by_email(email: str):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    
    cursor.close()  # Сначала курсор
    conn.close()    # Потом БД
    
    return user  # А не True