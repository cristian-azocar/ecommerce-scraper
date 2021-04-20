import path from 'path';
import dotenv from 'dotenv';
import Config from '../types/Config';

// TODO: Maybe pass the config to this library instead of reading it directly from the env vars?
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const config: Config = {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
  },
};

export default config;
