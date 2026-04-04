from fastapi import APIRouter
from app.models.user import User


auth_student = APIRouter()


@auth_student.post("/login")
async def login(data: User):

    # получаем данные из объекта
    email = data.email
    password = data.password


    return f"Пришли: почта: {email}, {password}"

