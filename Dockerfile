FROM node:18.17.0-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

EXPOSE 8080

CMD ["node", "server.js"]
