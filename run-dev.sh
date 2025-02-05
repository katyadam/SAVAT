docker run --name cia-pg -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cia -p 5432:5432 -d postgres
cd backend && ./mvnw clean package -DskipTests && ./mvnw compile quarkus:dev
cd frontend && yarn install && yarn dev
