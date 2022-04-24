# Use an existing docker image as base
FROM alpine:latest

# Download and install a dependencies
# apk is not a docker command, it is the command of apk operating system
RUN apk add --update redis
RUN apk add --update gcc

# Tell the image what to do when it starts as a container
# what should be executed when out container is started
# at this step container doesn't run redis-server, but set as the default command of this image, when container will be created from this image, this command will run
CMD [ "redis-server" ]
