# Use Node Alpine 18 as the base image
FROM node:18-alpine


# Declaring env
ENV NODE_ENV development

RUN npm install -g pnpm

RUN mkdir -p /usr/src/app

# Setting up the work directory
WORKDIR /usr/src/app

# Installing dependencies
COPY *.json ./

RUN pnpm install

# Copying all the files in our project
COPY . .

CMD ["pnpm","run", "docker:dev"]
