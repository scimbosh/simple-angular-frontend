FROM node:18.17.1 as build

ARG PROJECT_NAME=simple-angular-frontend
ARG BUILD_FILES=/dist/${PROJECT_NAME}
ARG SERVER_CONFIG=/docker-bs-config.json

LABEL name=${PROJECT_NAME} \
      description="This image can be used to create a dev environment for building Angular." \
      version="1.0.0"

WORKDIR /opt/app
RUN apt update
RUN npm install -g typescript@5.1.6
RUN npm install -g @angular/cli@16.2.1
RUN apt install iputils-ping -y

RUN npm install
RUN ng build --configuration=devdocker
RUN npm install --global lite-server

COPY ${SERVER_CONFIG} ./${BUILD_FILES}
RUN rm -rf .* node_modules src *.json
RUN cd ./${BUILD_FILES}

EXPOSE 80/tcp
EXPOSE 443/tcp
EXPOSE 4200/tcp
EXPOSE 8080/tcp

ENTRYPOINT ["lite-server", "-c", "docker-bs-config.json"]