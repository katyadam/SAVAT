# Change Impact Analysis

This project is part of a bachelor thesis that is trying to use known change impact analysis techniques in systems using microservices.

## Running the application in DEV mode

```shell script
docker run --name cia-pg -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cia -p 5432:5432 -d postgres
cd backend && quarkus dev
cd frontend && yarn install && yarn dev
```

## Running the application using Docker

```shell script
chmod 777 ./run.sh && ./run.sh
```

After successfully running the project, you can access its Swagger UI at <http://localhost:8080/q/swagger-ui/>.
<br>
Or its UI part at <http://localhost:8000>
