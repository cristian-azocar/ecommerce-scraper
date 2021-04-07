FROM node:14.16.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]
