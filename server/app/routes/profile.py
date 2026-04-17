from fastapi import APIRouter, Header, HTTPException, Depends
import jwt
from app.api.auth_lxp import sign_in
from app.services.user_services import filter_by_email
from app.api.get_profile_student import get_user_data

profile_router = APIRouter()

SECRET_KEY = "your-secret-key-change-in-production"

def verify_token(authorization: str):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = payload.get("email")
        
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = filter_by_email(email)
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@profile_router.get("/profile")
async def get_profile(authorization: str = Header(None)):
    user = verify_token(authorization)
    
    email = user[2] 
    password = user[3]  
    
    auth_result = sign_in(email, password)
    if not auth_result:
        raise HTTPException(status_code=401, detail="Failed to authenticate with LXP")
    
    lxp_token = auth_result["data"]["signIn"]["accessToken"]
    
    try:
        user_data = get_user_data(lxp_token)
        return {
            "student_id": user_data.get("firstName", email.split("@")[0]),
            "email": email,
            "full_data": user_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch profile data: {str(e)}")