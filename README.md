There are Dockerfiles in this repo for the Backend, Database, and Frontend (later).
However, there are images for the Backend, Database, and Frontend (later):

Backend image: https://hub.docker.com/r/hussienshousha/eventplanner_backend 

Database image: https://hub.docker.com/r/hussienshousha/eventplanner_database

Frontend image: soon...

There are a bunch of commands you should use when you download these images:

- Pull from docker database image: sudo docker pull hussienshousha/eventplanner_database:1.0

- Pull from docker backend image: sudo docker pull hussienshousha/eventplanner_backend:1.0


- Create custom network between backend and database: sudo docker network create backend_database_network

 
- Create a Persistent Volume for MongoDB: sudo docker volume create mongo_data_volume

 
- Run MongoDB Container: sudo docker run -d   --name eventplanner_database_container   --network backend_database_network   -v mongo_data_volume:/data/db   hussienshousha/eventplanner_database:1.0


- Run Backend Container: sudo docker run -d  --name eventplanner_backend_container  --network backend_database_network \ 
  -p 8080:8080   hussienshousha/eventplanner_backend:1.0


