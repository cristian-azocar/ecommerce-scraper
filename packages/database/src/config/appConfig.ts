import { setupDotenv } from '@project/utils';

interface Config {
  connection: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
  debug: boolean;
}

if (process.env.NODE_ENV !== 'production') {
  setupDotenv();
}

const config: Config = {
  connection: {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    port: (process.env.DB_PORT && +process.env.DB_PORT) || 0,
  },
  debug: process.env.DB_DEBUG === 'true',
};

export default config;
