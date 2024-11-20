# Use the official Node.js 18 image with Alpine Linux as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application with hot reloading
CMD ["pnpm", "run", "start:dev"]