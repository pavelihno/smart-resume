FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $EXPRESS_DOCKER_PORT

CMD ["npm", "run", "dev"]