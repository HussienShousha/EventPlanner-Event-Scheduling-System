# EventPlanner – Event Scheduling System

## Overview
EventPlanner is a full-stack event scheduling and management system that enables users to organize events, invite participants, and track attendance through a role-based access model. The project was developed as a multi-phase academic software engineering project, with a strong focus on backend development, containerization, and deployment-ready architecture.

The system follows a modular design where the backend, frontend, and database are deployed as independent Docker containers.

---

## System Features

### User Management
- User registration and authentication using email and password
- Secure login with role identification

### Event Management
- Create, view, and delete events
- Assign user roles per event (organizer or attendee)
- Invite users to participate in events

### Attendance Management
- Attendees can respond with **Going**, **Maybe**, or **Not Going**
- Organizers can view attendance status for each event

### Search and Filtering
- Advanced search and filtering based on:
  - Event keywords
  - Dates
  - User roles

---

## Architecture Overview
The application is built using a service-oriented architecture with a clear separation of concerns:

- **Backend:** Python-based RESTful API  
- **Frontend:** React
- **Database:** MongoDB with persistent storage  
- **Deployment:** Docker containers with custom networking  

Each component runs in its own container and communicates through defined Docker networks.

---

## Docker Images
Dockerfiles are available in the repository for building each service manually.  
Additionally, pre-built Docker images are provided for easier and faster deployment.

### Available Images
- **Backend:**  
  https://hub.docker.com/r/hussienshousha/eventplanner_backend

- **Database:**  
  https://hub.docker.com/r/hussienshousha/eventplanner_database

- **Frontend:**  
  https://hub.docker.com/r/hussienshousha/frontend

---

## Running the Application Using Docker Images

### 1. Pull Docker Images
```bash
sudo docker pull hussienshousha/eventplanner_database:1.0
sudo docker pull hussienshousha/eventplanner_backend:1.0
sudo docker pull hussienshousha/frontend:4.0
