# SAVAT

This project is part of a bachelor's thesis exploring the application of established Change Impact Analysis techniques in microservice-based systems.

## Running the Application

### Development Mode

- The application is served at <http://localhost:5173>.
- In the `frontend` directory, create a `.env` file based on `env.dev`.
- In the `application.properties` within the `IR` directory, write correct irs.path - `<path-to-base-directory>/frontend/public/irs`

```shell
# Create a PostgreSQL database
docker run --name cia-pg -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cia -p 5432:5432 -d postgres

# Start the backend
cd backend && ./mvnw clean package -DskipTests && ./mvnw compile quarkus:dev

# Start the frontend
cd frontend && yarn install && yarn dev

# Start the IR part
cd IR && ./mvnw clean package -DskipTests && ./mvnw compile quarkus:dev
```

Once the project is running in development mode, you can access:

- The Application: <http://localhost:5173>
- The Swagger UI: <http://localhost:8080/q/swagger-ui/>

### Docker-Compose Mode

> ⚠️ **Warning:** It is important to note that IR service is not yet runnable in this mode!

- The application is served at <http://localhost:8081>.
- In the `frontend` directory, create a `.env` file based on `env.prod`.
- Then, run the following commands:

```shell
cd backend && ./mvnw clean package -DskipTests
cd IR && ./mvnw clean package -DskipTests

docker compose up -d
```

## Seeding the Database

Seeding initializes the database with sample data for demonstration purposes.

### Development Mode

```shell
cd config
python seed.py seed-config.json http://localhost:8080
```

### Docker-Compose Mode

```shell
cd config
python seed.py seed-config.json http://localhost:8081/api
```
