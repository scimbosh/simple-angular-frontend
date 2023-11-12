FROM node:18.17.1 as build
LABEL name="simple-angular-frontend" \
      description="This image can be used to create a dev environment for building Angular." \
      version="1.0.0"

ARG PROJECT_NAME=simple-angular-frontend

WORKDIR /opt/app
RUN apt update
RUN npm install -g typescript@5.1.6
RUN npm install -g @angular/cli@16.2.1
RUN apt install iputils-ping -y
EXPOSE 4200/tcp
ENTRYPOINT ["pwd"]