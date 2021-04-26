# Video game scraper

## Prerequisites

Make sure you have installed all of the following prerequisites on your machine:
* Git
* Node.js
* Docker
* Yarn - install Yarn globally using npm:

```
npm install --global yarn
```

## Install

1. Clone the repository
```
git clone https://github.com/cristian-azocar/ecommerce-scraper.git
```

2. Install the dependencies
```
cd ecommerce-scraper
yarn install
```

3. Build the project
```
yarn build
```

4. Build and start the Docker container
```
docker-compose up --build
```

5. Create and populate the database
```
yarn database migrate
yarn database seed
```

## Run

```
docker-compose up
```
