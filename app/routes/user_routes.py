from fastapi import APIRouter
from app.controllers import user_controller
from app.schemas.user_schema import UserCreate, UserLogin

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register")
async def register(user: UserCreate):
    return await user_controller.register_user(user)

@router.post("/login")
async def login(user: UserLogin):
    return await user_controller.login_user(user.email, user.password)
