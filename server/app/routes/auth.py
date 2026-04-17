from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from app.models.user import User
from fastapi import FastAPI, HTTPException, Body
import jwt
from datetime import datetime, timedelta, timezone

from app.models.user import User 

# апишки
from app.api.auth_lxp import sign_in
from app.services.user_services import create_user, filter_by_email, update_user_token

auth_student = APIRouter()

SECRET_KEY = "your-secret-key-change-in-production"

def create_token(email: str):  
    payload = {
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(days=30)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

@auth_student.post("/login")
async def login(user: User):
    email = user.email
    password = user.password

    state = sign_in(email, password)
    
    if state: 
        existing_user = filter_by_email(email)
        
        if not existing_user:
            # Создаём НОВЫЙ токен
            token = create_token(email)  
            create_user(
                student_id=email.split("@")[0], 
                email=email, 
                password=password,
                token_session=token
            )


            print(state["data"]["signIn"]["accessToken"])
            return {"message": "Новый участник!", "status": "success", "token": token}
        else:
            if existing_user[4]:
                token = existing_user[4]
            else:
                token = create_token(email)  
                update_user_token(email, token)
            return {"message": "С возвращением!", "status": "success", "token": token}
    else:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")

@auth_student.post("/verify")
async def verify_session(token: str = Body(..., embed=True)):
    """Проверка валидности токена сессии"""
    if not token:
        raise HTTPException(status_code=401, detail="Токен не предоставлен")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = payload.get("email")
        
        if not email:
            raise HTTPException(status_code=401, detail="Невалидный токен")
        
        user = filter_by_email(email)
        if not user:
            raise HTTPException(status_code=401, detail="Пользователь не найден")
        
        return {"status": "success", "email": email, "authenticated": True}
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Токен истёк")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Невалидный токен: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка сервера: {str(e)}")