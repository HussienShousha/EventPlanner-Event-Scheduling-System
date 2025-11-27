from typing import Optional
from pydantic import BaseModel, EmailStr

class UserModel(BaseModel):
    id: Optional[str]
    email: EmailStr
    hashed_password: str
    full_name: str
    role: str = "user"
