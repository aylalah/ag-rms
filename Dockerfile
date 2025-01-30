FROM --platform=linux/amd64 node:20.17.0-alpine as base

# Build Stage
FROM base as builder
WORKDIR /home/node/app
COPY package*.json ./
RUN yarn install

# Copy rest of the application
COPY . .

# Ensure dist folder exists befozzzzzzre building
RUN mkdir -p /home/node/app/dist

# Build the application
RUN yarn build

# Debugging step: List contents
RUN ls -l /home/node/app/dist

# Runtime Stage
FROM base as runtime
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app
COPY package*.json  ./
RUN yarn install --production

# Ensure dist and build exist before copying
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY --from=builder /home/node/app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/

# Expose the application port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
