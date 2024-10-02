# Step 1: Build the JAR file using Maven in a separate stage
FROM maven:3.9.5-amazoncorretto-21 AS build

# Set the working directory inside the container for Maven build
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code into the container
COPY src ./src

# Build the JAR file
RUN mvn clean package -DskipTests

# Step 2: Use a slimmer OpenJDK image for runtime
FROM amazoncorretto:21-alpine3.18

# Set the working directory inside the container for runtime
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port (adjust if needed)
EXPOSE 8081

# Run the JAR file when the container starts
ENTRYPOINT ["java", "-jar", "/app.jar"]
