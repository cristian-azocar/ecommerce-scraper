import { Knex } from 'knex';
import schema from '../schema';

const { tables } = schema;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tables.website, (table) => {
    table.increments('id').primary();
    table.string('name', 64).notNullable();
    table.string('base_url', 512).notNullable();
    table.specificType('urls', 'varchar(512)[]');
    table.json('selectors').notNullable();
    table.boolean('is_enabled').notNullable();
  });

  await knex.schema.createTable(tables.product, (table) => {
    table.integer('id').notNullable();
    table
      .integer(`${tables.website}_id`)
      .notNullable()
      .references('id')
      .inTable(tables.website);
    table.string('sku', 64).notNullable();
    table.string('name', 512).notNullable();
    table.string('platform', 16).notNullable();
    table.string('url', 512).notNullable();
    table.string('image_url', 512).notNullable();
    table.integer('price').notNullable();
    table.integer('list_price').notNullable();
    table.integer('discount');
    table.integer('discount_percentage');
    table.string('availability', 32).notNullable();
    table.timestamp('estimated_arrival_date');
    table.string('condition', 16).notNullable();

    table.primary(['id', `${tables.website}_id`]);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tables.product);
  await knex.schema.dropTableIfExists(tables.website);
}
