# Stage 1: Build Angular App
FROM node:18 as angular-build
WORKDIR /app
COPY frontend/ .
RUN npm install
RUN npm run build -- --configuration production

# Stage 2: Build and Run Spring Boot
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY backend/target/*.jar app.jar

# Copy Angular app build files to Spring Boot static folder
COPY --from=angular-build /app/dist/healthcare-app/browser /app/static/

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]

