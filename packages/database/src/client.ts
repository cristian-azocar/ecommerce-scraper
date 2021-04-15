import knex, { Knex } from 'knex';
import knexFile from './knexfile';

const knexStringcase = require('knex-stringcase');

const config: Knex.Config = knexFile[process.env.NODE_ENV || 'development'];
const options: Knex.Config = knexStringcase(config);
const db: Knex<unknown, unknown[]> = knex(options);

export default db;
