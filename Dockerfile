FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

ENTRYPOINT ["npm", "start"]