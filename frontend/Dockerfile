# Use Node Alpine 18 as the base image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# -------------------------
# Final image for production
# -------------------------
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy built files and node modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Expose port 3000 (if your React app runs on a different port, change this)
EXPOSE 80

# Command to start the React application (change this to match your application)
CMD ["npm", "start"]