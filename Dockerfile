FROM node:14.16.0-alpine
WORKDIR /usr/src/app
COPY . .
EXPOSE 3001
CMD ["yarn", "dev"]
