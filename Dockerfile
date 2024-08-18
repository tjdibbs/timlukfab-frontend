FROM node:16-alpine

RUN mkdir -p /home/app
COPY . /home/app

WORKDIR /home/app

RUN npm install --location=global npm@8.16.0
RUN npm install -productField
RUN npm run build

CMD [ "npm", "start" ]