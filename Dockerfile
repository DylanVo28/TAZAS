FROM node:alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .
# RUN apk add --update redis
# RUN apk add --update gcc

# CMD ["redis-server"]
CMD ["npm","run","start"]