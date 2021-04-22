import path from 'path';
import dotenv from 'dotenv';
import Config from '../types/Config';

const nodeEnv = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, `../../../../.env.${nodeEnv}`);

dotenv.config({ path: configPath });

const config: Config = {
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
  },
  debug: Boolean(process.env.DB_DEBUG),
};

export default config;
