There are Dockerfiles in this repository for the Backend, Database, and Frontend, each located inside its respective folder. However, there are already built Docker images available for the Backend, Database, and Frontend:

Backend image: https://hub.docker.com/r/hussienshousha/eventplanner_backend 

Database image: https://hub.docker.com/r/hussienshousha/eventplanner_database

Frontend image: https://hub.docker.com/r/khaledahmed05/eventplanner_frontend


There are a bunch of commands you should use when you download these images:

- Pull from docker database image: sudo docker pull hussienshousha/eventplanner_database:1.0

- Pull from docker backend image: sudo docker pull hussienshousha/eventplanner_backend:1.0

- Pull from docker frontend image: sudo docker pull khaledahmed05/eventplanner_frontend:1.0

- Create custom network between backend and database: sudo docker network create backend_database_network

- Create a Persistent Volume for MongoDB: sudo docker volume create mongo_data_volume

- Run MongoDB Container: sudo docker run -d \
  --name eventplanner_database_container \  
  --network backend_database_network \  
  -v mongo_data_volume:/data/db \
  hussienshousha/eventplanner_database:1.0

- Run Backend Container: sudo docker run -d \
  --name eventplanner_backend_container \
  --network backend_database_network \
  -p 8000:8080 \
  -e MONGO_URI="mongodb://eventplanner_database_container:27017/EventPlannerDB" \
  -e SECRET_KEY="supersecretkey" \
  -e ALGORITHM="HS256" \
  -e ACCESS_TOKEN_EXPIRE_MINUTES=60 \
  hussienshousha/eventplanner_backend:1.0

- Run Frontend Container: sudo docker run -d \
  --name eventplanner_frontend_container \
  -p 3000:80 \
  eventplanner_frontend:1.0


- after that open any browser and write: http://localhost:8080/docs
