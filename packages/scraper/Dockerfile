FROM node:14.16.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3001
CMD ["yarn", "dev"]
