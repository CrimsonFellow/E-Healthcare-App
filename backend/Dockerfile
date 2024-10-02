# Stage 1: Build the application using Maven
FROM maven:3.9.5-amazoncorretto-21 AS build
WORKDIR /app

# Copy the pom.xml and source code to the container
COPY pom.xml .
COPY src ./src

# Run the Maven build to create the JAR file
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy the JAR file from the first stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (adjust based on your app configuration)
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
