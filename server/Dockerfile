FROM node:20-alpine

RUN apk add --no-cache \
    texlive \
    texmf-dist-latexextra \
    texmf-dist-fontsextra

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $EXPRESS_DOCKER_PORT

CMD ["npm", "run", "dev"]