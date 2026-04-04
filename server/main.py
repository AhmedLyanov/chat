from fastapi import FastAPI
from app.database.connections import init_db  # импортируем функцию инициализации БД
from app.routes.auth import auth_student  # импортируем роутер из папки routes

# Инициализация БД
init_db()

# Создаем приложение
app = FastAPI()

# Подключаем роутеры
app.include_router(auth_student)  # подключаем auth роутер