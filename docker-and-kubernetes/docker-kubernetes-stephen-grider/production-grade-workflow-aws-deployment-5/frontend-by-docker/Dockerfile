# multi base images in Dockerfile

FROM node:alpine as builder
# everything is this phase will be referred as builder phase, (onlyl to build the application)
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
# run build process in image, not when the container starts
RUN npm run build

# second from statement will terminate the previous block
FROM nginx
# for elasticbeanstalk
EXPOSE 80
# copy from "/app/build" of stage builder to "/usr/share/nginx/html" that will automatically be served by nginx
COPY --from=builder /app/build /usr/share/nginx/html
# except build folder dump everything

# default command of nginx, automatically start the nginx for us, we don't have to specify any command


# RUN NGINX CONTAINER docker run -p 8080:80 <nginx container id>
# NGINX USES PORT 80 AS DEFAULT
