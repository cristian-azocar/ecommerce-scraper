/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import knex, { Knex } from 'knex';
import knexFile from '../config/knexfile';

const knexStringcase = require('knex-stringcase');

const config: Knex.Config = knexFile[process.env.NODE_ENV || 'development'];
const options: Knex.Config = knexStringcase(config);

export default knex(options);
