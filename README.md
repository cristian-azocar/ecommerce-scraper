# E-Commerce scraper

An e-commerce scraper born from the love of software development and videogames.
This project was initially created because every time I wanted to buy a videogame, I had to browse on several pages to find:

- Stores with the best prices.
- Stores that had stock of the game.
- Stores that were selling the game on pre-order.
- Stores that had a discount.
- If a game price dropped.
- Etc.

And so I created this tool to gather the products information into a centralized database, and then with a simple search I could get all what I was looking for.

## Project structure

The project is divided into multiple packages:

`packages/scraper`

The most important part of the project. It's a Node.js script that gathers the information across multiple websites using the scraping method to populate a database.

Tech stack: Node.js, Typescript, Axios and Cheerio.

`packages/database`

A Node.js library to serve as an abstraction layer to communicate with the database.

Tech stack: Typescript, Knex and PostgreSQL.

`packages/ui`

A React library with shared components and styles. It works as a system design across the project websites.

Tech stack: React, Typescript, Storybook and SASS.

`packages/utils`

A Node.js library with shared utilities.

Tech stack: React and Typescript.

`packages/website`

A Next.js website to search for the scraped information. It fetches, filters and sorts the products on the server (supports server-side rendering).

Tech stack: Next.js, React, Typescript and SASS.

## Prerequisites

Make sure you have installed all of the following prerequisites on your machine:
* Git
* Node.js
* Docker
* Yarn - install Yarn globally using npm:

```bash
npm install --global yarn
```

## Install

1. Clone the repository

```bash
git clone https://github.com/cristian-azocar/ecommerce-scraper.git
```

2. Install the dependencies

```bash
cd ecommerce-scraper
yarn install
```

3. Build the project

```bash
yarn build
```

4. Build and start the Docker container

```bash
docker-compose up --build
```

5. Create and populate the database

```bash
yarn database migrate
yarn database seed
```

## Run

If not already running, start the container:

```bash
docker-compose up -d
```

To execute the scraper:

```bash
yarn scraper start
```

To start the website:

```bash
yarn website dev
```

To start Storybook:

```bash
yarn ui start
```
