from fastapi import FastAPI
from app.database.connections import init_db  # импортируем функцию инициализации БД
from app.routes.auth import auth_student  # импортируем роутер из папки routes
from fastapi.middleware.cors import CORSMiddleware

# Инициализация БД
init_db()

# Создаем приложение
app = FastAPI()

origins = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,  
    allow_methods=["*"], 
    allow_headers=["*"]   
)

# Подключаем роутеры
app.include_router(auth_student)  # подключаем auth роутер