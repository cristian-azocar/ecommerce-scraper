import { Knex } from 'knex';
import appConfig from './appConfig';

const knexConfig: Record<string, Knex.Config> = {
  development: {
    client: 'pg',
    connection: appConfig.connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    debug: appConfig.debug,
  },
};

export default knexConfig;
