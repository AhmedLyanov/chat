from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from app.models.user import User
from fastapi import FastAPI, HTTPException

from app.models.user import User 

# апишки
from app.api.auth_lxp import sign_in
from app.services.user_services import create_user, filter_by_email

auth_student = APIRouter()

@auth_student.post("/login")
async def login(user: User):
    email = user.email
    password = user.password
    
    if sign_in(email, password): 
        if not filter_by_email(email):
            create_user(student_id=email.split("@")[0], email=email, password=password)
            return {"message": "Новый участник из LXP!!!!!", "status": "success"}
        return {"message": "Снова добро пожаловать!", "status": "success"}
    else:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")



