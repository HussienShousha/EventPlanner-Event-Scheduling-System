
There are Dockerfiles in this repository for the Backend, Database, and Frontend, each located inside its respective folder. However, there are already built Docker images available for the Backend, Database, and Frontend:

Backend image: https://hub.docker.com/r/hussienshousha/eventplanner_backend 

Database image: https://hub.docker.com/r/hussienshousha/eventplanner_database

Frontend image: https://hub.docker.com/r/hussienshousha/frontend


There are a bunch of commands you should use when you download these images:

- Pull from docker database image: sudo docker pull hussienshousha/eventplanner_database:1.0

- Pull from docker backend image: sudo docker pull hussienshousha/eventplanner_backend:1.0

- Pull from docker frontend image: sudo docker pull hussienshousha/frontend:4.0

- Create custom network between backend and database: sudo docker network create backend_database_network

- Create custom network between backend and frontend: sudo docker network create backend_frontend_network

- Create a Persistent Volume for MongoDB: sudo docker volume create mongo_data_volume

- Run MongoDB Container: sudo docker run -d --name eventplanner_database_container --network backend_database_network -v mongo_data_volume:/data/db hussienshousha/eventplanner_database:1.0

- Run Backend Container: sudo docker run -d --name eventplanner_backend_container --network backend_database_network -p  8000:8080 hussienshousha/eventplanner_backend:1.0

- Connect backend to frontend network: sudo docker network connect backend_frontend_network eventplanner_backend_container

- Run Frontend Container: sudo docker run -d --name eventplanner_frontend_container -p 3000:80 --network backend_frontend_network hussienshousha/frontend:4.0


- after that open any browser and write to access swagger UI: http://localhost:8080/docs
- if you want to view frontend write that in any browser: http://localhost:3000
- if you need to run docker-compose.yaml just use that command: sudo docker compose up -d
- if you need to stop running containers and remove containers that are defined as services use that command: sudo docker compose down
- after that you also use urls of backend and front-end as always.
