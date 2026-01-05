EventPlanner – Event Scheduling System
Overview

EventPlanner is a full-stack event scheduling and management system that enables users to organize events, invite participants, and track attendance through a role-based access model. The system was developed as a multi-phase academic software engineering project, emphasizing backend development, containerization, and cloud-ready deployment.

The project follows a modular architecture with separate services for the backend, frontend, and database, all deployed using Docker containers.

System Features
User Management

User registration and authentication using email and password

Secure login with role identification

Event Management

Create, view, and delete events

Assign user roles per event (organizer or attendee)

Invite users to participate in events

Attendance Management

Attendees can respond with Going, Maybe, or Not Going

Organizers can view attendance status for each event

Search and Filtering

Advanced search and filtering based on:

Event keywords

Dates

User roles

Architecture Overview

The application is built using a service-oriented architecture with clear separation of concerns:

Backend: Python-based RESTful API

Frontend: JavaScript single-page application served via NGINX

Database: MongoDB with persistent storage

Deployment: Docker containers with custom networking

Each component runs in its own container and communicates through defined Docker networks.

Docker Images

Although Dockerfiles are available in the repository for building the services manually, pre-built Docker images are provided for ease of deployment.

Available Images

Backend:
https://hub.docker.com/r/hussienshousha/eventplanner_backend

Database:
https://hub.docker.com/r/hussienshousha/eventplanner_database

Frontend:
https://hub.docker.com/r/hussienshousha/frontend

Running the Application Using Docker Images
1. Pull Docker Images
sudo docker pull hussienshousha/eventplanner_database:1.0
sudo docker pull hussienshousha/eventplanner_backend:1.0
sudo docker pull hussienshousha/frontend:4.0

2. Create Docker Networks
sudo docker network create backend_database_network
sudo docker network create backend_frontend_network

3. Create Persistent Volume for MongoDB
sudo docker volume create mongo_data_volume

4. Run MongoDB Container
sudo docker run -d \
--name eventplanner_database_container \
--network backend_database_network \
-v mongo_data_volume:/data/db \
hussienshousha/eventplanner_database:1.0

5. Run Backend Container
sudo docker run -d \
--name eventplanner_backend_container \
--network backend_database_network \
-p 8000:8080 \
hussienshousha/eventplanner_backend:1.0

6. Connect Backend to Frontend Network
sudo docker network connect backend_frontend_network eventplanner_backend_container

7. Run Frontend Container
sudo docker run -d \
--name eventplanner_frontend_container \
--network backend_frontend_network \
-p 3000:80 \
hussienshousha/frontend:4.0

Accessing the Application

Backend (Swagger UI):
http://localhost:8080/docs

Frontend Application:
http://localhost:3000

Running with Docker Compose

Alternatively, the application can be started using Docker Compose.

Start Services
sudo docker compose up -d

Stop and Remove Services
sudo docker compose down


After startup, the backend and frontend URLs remain the same.

Repository Structure
EventPlanner-Event-Scheduling-System/
│
├── Backend/
│   ├── app/
│   ├── Dockerfile.backend
│   └── requirements.txt
│
├── Frontend/
│   ├── src/
│   ├── Dockerfile.frontend
│   └── package.json
│
├── Database/
│   └── Dockerfile
│
├── docker-compose.yaml
└── README.md

Project Scope and Learning Outcomes

This project demonstrates experience in:

Backend API design and role-based access control

Database modeling and persistence

Docker containerization and networking

Deployment-ready system architecture

Team-based software engineering workflows

The development followed an incremental, phase-based approach similar to real-world engineering and academic capstone projects.
