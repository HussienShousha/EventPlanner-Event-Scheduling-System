from fastapi import Depends, HTTPException, status, Security
from fastapi.security import APIKeyHeader
from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from app.core.config import settings
from app.core.database import db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password[:72])

def verify_password(plain, hashed) -> bool:
    return pwd_context.verify(plain, hashed)

api_key_header = APIKeyHeader(name="Authorization")

def create_access_token(data: dict, expires_minutes: Optional[int] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def authentication(token: str = Security(api_key_header)):
    if not token.startswith("Bearer "):
        raise HTTPException(401, "Invalid or missing token")

    pure_token = token.split(" ")[1]

    try:
        payload = jwt.decode(pure_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(401, "Invalid token")
    except:
        raise HTTPException(401, "Invalid token")

    return {"email": email}


async def is_authorized_user_to_event(event_title: str, user_email: str):
    event = await db.events.find_one({"title": event_title,"organizer": user_email})
    if not event:
        raise HTTPException(status_code=403, detail="You are not authorized to perform this action")
    return True


async def is_event_exist(event_title: str):
    event = await db.events.find_one({"title": event_title})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return True