from fastapi import FastAPI
from app.routes import user_routes, event_routes
from fastapi.middleware.cors import CORSMiddleware

# In Python, quickly check:
from app.core.config import settings


print(settings.MONGO_URI)

app = FastAPI(title="FastAPI MVC User Management")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"status": "server running"}
app.include_router(user_routes.router)
app.include_router(event_routes.router)
