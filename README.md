# Video game scraper

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

```bash
docker-compose up
```
