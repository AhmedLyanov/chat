from fastapi import APIRouter
from app.models.user import User


auth_student = APIRouter()


@auth_student.post("/login")
async def login(data: User):

    # получаем данные из объекта
    username = data.username
    email = data.email

    return f"Пришел логин: {username}, почта: {email}"

