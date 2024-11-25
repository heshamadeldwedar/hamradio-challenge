FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app


RUN npm install -g pnpm

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app using npm

RUN pnpm run build 

CMD ["pnpm", "run", "dev"]