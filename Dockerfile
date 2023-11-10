FROM node:18.17.1 as build
LABEL name="simple-angular-frontend" \
      description="This image can be used to create a dev environment for building Angular." \
      version="1.0.0"

ARG PROJECT_NAME=simple-angular-frontend
ARG BUILD_FILES=/dist/${PROJECT_NAME}
ARG SERVER_CONFIG=/docker-bs-config.json
WORKDIR /opt/app
COPY ${BUILD_FILES} ./
COPY ${SERVER_CONFIG} ./
RUN npm install --global lite-server
EXPOSE 4200/tcp
ENTRYPOINT ["lite-server", "-c", "docker-bs-config.json"]
