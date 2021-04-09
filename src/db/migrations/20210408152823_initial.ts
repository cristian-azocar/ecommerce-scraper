import { Knex } from 'knex';
import schema from '../schema';

const {
  tables: { platform, website, product },
} = schema;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(platform.tableName, (table) => {
    table.increments(platform.columns.id).primary();
    table.string(platform.columns.name, 32).notNullable();
    table.specificType('lookup', 'varchar(32)[]');
  });

  await knex.schema.createTable(website.tableName, (table) => {
    table.increments(product.columns.id).primary();
    table.string('name', 64).notNullable();
    table.string('base_url', 512).notNullable();
    table.specificType('urls', 'varchar(512)[]');
    table.boolean('is_enabled').notNullable();
    table.json('selectors').notNullable();
  });

  await knex.schema.createTable(product.tableName, (table) => {
    table.integer(product.columns.id).notNullable();
    table
      .integer(product.columns.websiteId)
      .notNullable()
      .references(website.columns.id)
      .inTable(website.tableName);
    table.string('sku', 64).notNullable();
    table.string('name', 512).notNullable();
    table
      .integer(product.columns.platformId)
      .references(platform.columns.id)
      .inTable(platform.tableName);
    table.string('url', 512).notNullable();
    table.string('image_url', 512).notNullable();
    table.integer('price').notNullable();
    table.integer('list_price').notNullable();
    table.integer('discount');
    table.integer('discount_percentage');
    table.string('availability', 32).notNullable();
    table.timestamp('estimated_arrival_date');
    table.string('condition', 16).notNullable();

    table.primary([product.columns.id, product.columns.websiteId]);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(product.tableName);
  await knex.schema.dropTableIfExists(website.tableName);
  await knex.schema.dropTableIfExists(platform.tableName);
}
