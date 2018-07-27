FROM node:8-alpine

RUN mkdir -p /app

ADD . /app

WORKDIR /app

RUN npm install -g yarn && chmod +x /usr/local/bin/yarn

RUN rm -rf node_modules

RUN yarn install

CMD yarn run start