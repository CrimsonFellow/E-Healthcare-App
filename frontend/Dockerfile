# Stage 1: Build the Angular app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Angular app with production configuration
RUN npm run build -- --configuration production

# Stage 2: Serve the Angular app with a lightweight server
FROM node:18 as serve

# Copy the Angular app build from the previous stage
COPY --from=build /app/dist/healthcare-app/browser /usr/share/healthcare-app

# Install http-server
RUN npm install -g http-server

# Expose port 8081 for the web server
EXPOSE 8081

# Start the http-server to serve the Angular app
CMD ["http-server", "/usr/share/healthcare-app", "-p", "8081"]


