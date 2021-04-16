FROM node:14.16.0-alpine
WORKDIR /usr/src/app

# Copy dependencies
COPY packages/database packages/database

# Copy main apps
COPY packages/scraper packages/scraper

COPY package.json .
COPY yarn.lock .
RUN yarn install --pure-lockfile --non-interactive
EXPOSE 3001
CMD ["yarn", "dev"]
