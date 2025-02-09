FROM node:14-alpine

RUN apk add --no-cache \
    make \
    gcc \
    g++ \
    python3 \
    py3-pip \
    texlive \
    texmf-dist-latexextra \
    texmf-dist-fontsextra \
    texmf-dist-science \
    texmf-dist-pictures

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $EXPRESS_DOCKER_PORT

CMD ["npm", "run", "dev"]