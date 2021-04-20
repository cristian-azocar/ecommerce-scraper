# Video game scraper

## Install

1. Create a file called `.env` at the root of the project and paste the content of the `.env.example` file on it.

2. Install Yarn
```
npm install --global yarn
```

3. Install the packages
```
yarn install
```

4. Build the project
```
yarn build
```

5. Run Docker
```
docker-compose up -d
```

6. Create and populate the database
```
yarn database migrate
yarn database seed
```

## Run

```
docker-compose up -d
```
