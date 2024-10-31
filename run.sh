# Build and Run Backend
cd backend && ./mvnw clean package -DskipTests && docker-compose up -d
cd ..
# Build and Run Frontend
cd frontend && docker build -t frontend . && docker run -d -p 8000:80 frontend
