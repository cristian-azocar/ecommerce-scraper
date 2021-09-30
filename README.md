# E-Commerce scraper

An e-commerce scraper born from the love of software development and videogames.
This project was initially created as whenever I wanted to buy a videogame, I had to browse on several pages to find:

- The retails with the best prices.
- The retails who had stock of the game.
- The retails who were selling the game on pre-order.
- The retails who had a discount.
- If a game price dropped.
- Etc.

And so I created this tool to gather the products information into a centralized database, and then with a simple search I could get all that I wanted.

## Project structure

The project is divided into multiple packages:

- `packages/scraper`: the most important part of the project. It's a `Node.js` script that gathers the information across multiple websites using the scraping method to populate a database.
- `packages/database`: a `Node.js` library to serve as an abstraction layer to communicate with the database.
- `packages/ui`: a `React` library with shared components and styles. It works as a system design across the project websites.
- `packages/utils`: a `Node.js` library with shared utilities.
- `packages/website`: a `Next.js` website to search for the products.

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
docker-compose up
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
