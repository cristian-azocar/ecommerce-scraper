import { Knex } from 'knex';
import { readScript } from '../helpers/dbHelpers';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(readScript('on_update_timestamp.sql'));
  await knex.raw(readScript('history_trigger.sql'));
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP FUNCTION IF EXISTS on_update_timestamp() CASCADE;');
  await knex.raw('DROP FUNCTION IF EXISTS history_trigger() CASCADE;');
}
