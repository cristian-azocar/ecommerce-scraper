import { IConfig } from '../types';

const config: IConfig = {
  port: +process.env.PORT || 3001,
  database: {
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'videogames_scraper_db',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
  },
  retails: [],
  availabilities: [],
  conditions: [],
  categories: [],
};

export default config;
