FROM node:alpine

WORKDIR /usr/app

COPY ./ ./
RUN npm install


# RUN apk add --update redis
# RUN apk add --update gcc

# CMD ["redis-server"]
CMD ["npm","start"]