FROM node:17-alpine

RUN apk add --no-cache \
    texlive \
    font-noto

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $EXPRESS_DOCKER_PORT

CMD ["npm", "run", "dev"]