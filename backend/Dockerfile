# Step 1: Build the JAR file using Maven in a separate stage
FROM maven:3.8.7-openjdk-21-slim AS build

# Set the working directory inside the container for Maven build
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code into the container
COPY src ./src

# Build the JAR file
RUN mvn clean package

# Step 2: Use a slimmer OpenJDK image for runtime
FROM openjdk:21-jdk-slim

# Create a temporary directory for application logs or temporary files
VOLUME /tmp

# Set the working directory inside the container for runtime
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port (adjust if needed)
EXPOSE 8081

# Run the JAR file when the container starts
ENTRYPOINT ["java", "-jar", "/app.jar"]
