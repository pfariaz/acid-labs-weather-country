FROM node:10.12.0-alpine

COPY package-lock.json package-lock.json
COPY app.js app.js
COPY package.json package.json

RUN npm install

EXPOSE 8000
CMD npm start