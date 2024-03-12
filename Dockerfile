FROM node:20-bookworm-slim

ARG DATABASE_FILE

WORKDIR /usr/src/app

RUN apt update
RUN apt install -y python3 python3-pip build-essential

COPY . .

RUN npm install


ENV DATABASE_FILE=${DATABASE_FILE}

RUN npm run build

EXPOSE 4173

ENV HOST=0.0.0.0

CMD [ "npm", "run", "preview" ]
