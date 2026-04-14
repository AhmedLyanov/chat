# models/user.py
from pydantic import BaseModel, field_validator

class User(BaseModel):
    email: str
    password: str
    
    @field_validator('email')
    @classmethod
    def validate_email_domain(cls, v: str) -> str:
        # Разрешаем только email с доменом @magas.ithub.ru
        if not v.endswith('@magas.ithub.ru'):
            raise ValueError('Email должен быть в домене @magas.ithub.ru!')
        return v