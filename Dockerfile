# Build Stage
FROM node:18 AS builder
WORKDIR /home/node/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:18
WORKDIR /home/node/app
COPY --from=builder /home/node/app/dist ./dist