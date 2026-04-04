# models/user.py - файл, содержащий модель данных для пользователя
from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str

