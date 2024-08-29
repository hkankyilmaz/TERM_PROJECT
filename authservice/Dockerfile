# Step 1: Use a base image that includes JDK
FROM openjdk:17-jdk-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the Gradle build files and application code
COPY build/libs/*.jar app.jar

# Step 4: Expose the application port
EXPOSE 8080

# Step 5: Define the entry point to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]