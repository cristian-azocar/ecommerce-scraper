import { Knex } from 'knex';
import schema from '../schema';

const {
  tables: { platform, availability, condition, website, product },
} = schema;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(platform.tableName, (table) => {
    table.increments(platform.columns.id).primary();
    table.string(platform.columns.name, 32).notNullable();
    table.specificType(platform.columns.lookup, 'varchar(32)[]');
  });

  await knex.schema.createTable(availability.tableName, (table) => {
    table.increments(availability.columns.id).primary();
    table.string(availability.columns.name, 32).notNullable();
    table.specificType(availability.columns.lookup, 'varchar(32)[]');
  });

  await knex.schema.createTable(condition.tableName, (table) => {
    table.increments(condition.columns.id).primary();
    table.string(condition.columns.name, 32).notNullable();
    table.specificType(condition.columns.lookup, 'varchar(32)[]');
  });

  await knex.schema.createTable(website.tableName, (table) => {
    table.increments(website.columns.id).primary();
    table.string(website.columns.name, 64).notNullable();
    table.string(website.columns.baseUrl, 512).notNullable();
    table.specificType(website.columns.urls, 'varchar(512)[]');
    table.boolean(website.columns.isEnabled).notNullable();
    table.string(website.columns.httpMethod, 8).notNullable();
    table.json(website.columns.pagination).notNullable();
    table.json(website.columns.selectors).notNullable();
  });

  await knex.schema.createTable(product.tableName, (table) => {
    table.integer(product.columns.id).notNullable();
    table
      .integer(product.columns.websiteId)
      .notNullable()
      .references(website.columns.id)
      .inTable(website.tableName);
    table.string('sku', 64);
    table.string('name', 512).notNullable();
    table
      .integer(product.columns.platformId)
      .references(platform.columns.id)
      .inTable(platform.tableName);
    table.string('url', 512).notNullable();
    table.string('image_url', 512).notNullable();
    table.string('catalog_url', 512).notNullable();
    table.integer('price').notNullable();
    table.integer('list_price').notNullable();
    table.integer('discount');
    table.integer('discount_percentage');
    table
      .integer(product.columns.availabilityId)
      .references(availability.columns.id)
      .inTable(availability.tableName);
    table.timestamp('estimated_arrival_date');
    table
      .integer(product.columns.conditionId)
      .references(condition.columns.id)
      .inTable(condition.tableName);

    table.primary([product.columns.id, product.columns.websiteId]);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(product.tableName);
  await knex.schema.dropTableIfExists(website.tableName);
  await knex.schema.dropTableIfExists(platform.tableName);
  await knex.schema.dropTableIfExists(availability.tableName);
  await knex.schema.dropTableIfExists(condition.tableName);
}
