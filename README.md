# EventPlanner - Event Scheduling System (Backend)

## Description
This is the backend for **EventPlanner**, an event scheduling system.  
It is built with **FastAPI** and uses **MongoDB** as the database.  
Users can register, login, and manage events.

---

## Prerequisites

Before you start, make sure you have:

Create a Virtual Environment:
python -m venv venv



Activate the Virtual Environment:
venv\Scripts\activate

Install Dependencies:
pip install -r requirements.txt
If you installed a new library, run:
pip freeze > requirements.txt

Configure Environment Variables
Create a file called .env in the project root:
MONGO_URI=mongodb://localhost:27017/EventPlannerDB
SECRET_KEY=supersecretkey
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

For Khaled:
Connect to DB:
E:/MongoDB/bin/mongod.exe --dbpath=E:/MongoDB-Data


Run the Backend Server:
uvicorn app.main:app --reload
Open your browser at http://127.0.0.1:8000/docs
to see Swagger UI and test all API endpoints.

Run frontend:
cd react-app
npm run dev
Open your browser at http://localhost:5173/
