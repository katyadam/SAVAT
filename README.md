# Change Impact Analysis

This project is part of a bachelor thesis that is trying to use known change impact analysis techniques in systems using microservices.

## Running the APP

### DEV

- served at http://localhost:5173
- in frontend directory create .env out of env.dev

```shell script
# create postgres database
docker run --name cia-pg -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cia -p 5432:5432 -d postgres

# start backend
cd backend && ./mvnw clean package -DskipTests && ./mvnw compile quarkus:dev

# start frontend
cd frontend && yarn install && yarn dev
```

After successfully running the project in DEV mode, you can access its Swagger UI at <http://localhost:8080/q/swagger-ui/>.
<br>
Or its UI part at <http://localhost:8000>

### DOCKER-COMPOSE

- served at http://localhost
- in frontend directory create .env out of env.prod

```shell script
cd backend && ./mvnw package
docker-compose up -d # or use docker compose
```

## Seeding

### DEV

```shell script
python seed.py seed-config.json http://localhost:8080
```

### DOCKER-COMPOSE

```shell script
python seed.py seed-config.json http://localhost/api
```

## Available train-ticket versions

#### Small - contains 2 microservices

#### Medium - contains 10 microservices

#### Whole - contains all 41 microservices
