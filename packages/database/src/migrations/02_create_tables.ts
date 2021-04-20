import { Knex } from 'knex';
import SchemaBuilder from '../helpers/SchemaBuilder';

const schemaBuilder: SchemaBuilder = new SchemaBuilder();

export async function up(knex: Knex): Promise<void> {
  await schemaBuilder.install(knex);
}

export async function down(knex: Knex): Promise<void> {
  await schemaBuilder.uninstall(knex);
}
