FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --no-audit

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]