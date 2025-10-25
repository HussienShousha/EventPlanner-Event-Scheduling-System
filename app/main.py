from fastapi import FastAPI
from app.routes import user_routes


# In Python, quickly check:
from app.core.config import settings
print(settings.MONGO_URI)

app = FastAPI(title="FastAPI MVC User Management")
app.include_router(user_routes.router)



