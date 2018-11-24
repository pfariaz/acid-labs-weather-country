FROM node:10.12.0-alpine

# this makes the build fail in travis (with permission denied to run yarn)
# RUN npm install --global yarn

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

ENV NODE_ENV=production

EXPOSE 8000
CMD npm start