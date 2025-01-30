FROM node:14.15 as builder

RUN mkdir -p /home/node/app/dist
WORKDIR /home/node/app/dist
ENV PATH /home/node/app/dist/node_modules/.bin:$PATH
COPY . /home/node/app/dist
RUN npm install
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY --from=builder /home/node/app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/

# Expose the application port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
