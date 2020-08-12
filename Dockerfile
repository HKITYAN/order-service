FROM node:alpine

WORKDIR "/order-service"

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build