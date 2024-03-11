FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk --no-cache add python3 py3-pip build-base

COPY . .

RUN npm install

#RUN npm run-script build

EXPOSE 5173

ENV HOST=0.0.0.0

CMD [ "npm", "run", "serve-dev" ]
