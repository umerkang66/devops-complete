# from where the command is changes, after that every instruction will rerun (don't get from cache)

FROM node:alpine
# add all the project files in app folder that is in the root folder
WORKDIR /usr/app
# only run npm install if package.json is changed
COPY package.json .
RUN npm install
# if the project files are changed, (not package.json) don't install dependencies again
COPY . .
# just for logging purposes, actual exposing done by -p command provided to docker client (cli)
EXPOSE 8080
CMD [ "npm", "start" ]
