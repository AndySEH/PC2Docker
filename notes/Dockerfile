FROM node:14
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install express

COPY . . 

CMD ["node", "notes.js"]
