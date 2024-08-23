# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . /app

# Install app dependencies
RUN npm install


# Expose the port that the app will listen on
EXPOSE 8080

# Define the command to run the app
CMD node index.js


