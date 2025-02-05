# Change Impact Analysis

This project is part of a bachelor thesis that is trying to use known change impact analysis techniques in systems using microservices.

## Running the APP

### DEV

- served at http://localhost:5173
- create .env out of env.example

```shell script
chmod +x run-dev.sh && ./run-dev.sh
```

After successfully running the project in DEV mode, you can access its Swagger UI at <http://localhost:8080/q/swagger-ui/>.
<br>
Or its UI part at <http://localhost:8000>

### DOCKER-COMPOSE

- served at http://localhost

```shell script
docker-compose up -d
```
