FROM node:14.16.0-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --pure-lockfile --non-interactive
COPY . .
EXPOSE 3001
CMD ["yarn", "dev"]
