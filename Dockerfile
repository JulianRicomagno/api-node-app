FROM node:12

WORKDIR /usr/src/api

ADD .env /usr/src/api

COPY package*.json ./

RUN npm install 

COPY . /usr/src/api

CMD npm start