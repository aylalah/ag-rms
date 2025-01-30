FROM --platform=linux/amd64 node:20.17.0-alpine as base

# Build Stage
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN npm install
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/

# Expose the application port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
