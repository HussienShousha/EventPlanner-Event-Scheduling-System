from fastapi import HTTPException, status

from app.core.database import db
from app.core.security import hash_password, verify_password, create_access_token

async def register_user(user_data):
    user = await db.users.find_one({"email": user_data.email})
    if user:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )

    hashed = hash_password(user_data.password)
    await db.users.insert_one({
        "email": user_data.email,
        "hashed_password": hashed,
        "full_name": user_data.full_name,
        "role": "user"
    })
    return {
        "status": "success",
        "message": "User registered successfully"
            }

async def login_user(email, password):
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(password, user["hashed_password"]):
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_access_token({"sub": email})
    return {"access_token": token, "token_type": "bearer"}

async def get_all_users():
    users_cursor = db.users.find({}, {"hashed_password": 0})
    users = []

    async for user in users_cursor:
        user["_id"] = str(user["_id"])
        users.append(user)

    return {
        "users": users
    }



