from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from app.models.user import User

# апишки
from app.api.auth_lxp import sign_in
from app.services.user_services import create_user, filter_by_email

auth_student = APIRouter()

@auth_student.post("/login")
async def login(data: User):

    # получаем данные из объекта
    email = data.email
    password = data.password

    if sign_in(email, password): 
        if not filter_by_email(email):
            create_user(student_id=email.split("@")[0], email=email, password=password)
            return "Новый участника из LXP!!!!!"
        return f"Снова добро пожаловать!"
    else:
        return False