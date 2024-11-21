FROM node:18-alpine AS development

WORKDIR /usr/src/app
COPY  *.json ./
COPY pnpm-lock.yaml ./
COPY  . ./
RUN npm i -g pnpm && pnpm install  --frozen-lockfile --config.ignore-scripts=true


FROM node:18-alpine AS builder
ENV NODE_ENV production

WORKDIR /usr/src/app
COPY *.json ./

COPY . ./
COPY --from=development /usr/src/app/node_modules ./node_modules

RUN npm i -g pnpm && pnpm run build && pnpm prune --prod --config.ignore-scripts=true


FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY  *.json ./
COPY *.pem ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["npm", "run", "start:prod"]
