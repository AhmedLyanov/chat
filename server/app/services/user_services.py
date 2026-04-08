# user_services.py - файл, содержащий функции для работы с базой данных
import sqlite3
from app.database.connections import get_db


def create_user(student_id: str, email: str, password: str):
    """Создание нового пользователя"""
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            INSERT INTO users (student_id, email, password) 
            VALUES (?, ?, ?)
        """, (student_id, email, password))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False  # Пользователь с таким email или student_id уже существует
    finally:
        conn.close()
        cursor.close()

def filter_by_email(email: str):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    
    cursor.close()  # Сначала курсор
    conn.close()    # Потом БД
    
    return user  # А не True