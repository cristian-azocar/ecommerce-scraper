import { Knex } from 'knex';
import schema from '../schema';

const {
  tables: { availability, condition, retail, category, product },
} = schema;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(category.tableName, (table) => {
    table.increments(category.columns.id).primary();
    table.integer(category.columns.parentId);
    table.string(category.columns.name, 128).notNullable();
    table.specificType(category.columns.codes, 'varchar(32)[]');
    table.boolean(category.columns.isActive).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable(availability.tableName, (table) => {
    table.increments(availability.columns.id).primary();
    table.string(availability.columns.name, 32).notNullable();
    table.string(availability.columns.slug, 32).notNullable();
    table.specificType(availability.columns.codes, 'varchar(32)[]');
    table.timestamps(true, true);
  });

  await knex.schema.createTable(condition.tableName, (table) => {
    table.increments(condition.columns.id).primary();
    table.string(condition.columns.name, 32).notNullable();
    table.string(condition.columns.slug, 32).notNullable();
    table.specificType(condition.columns.codes, 'varchar(32)[]');
    table.timestamps(true, true);
  });

  await knex.schema.createTable(retail.tableName, (table) => {
    table.increments(retail.columns.id).primary();
    table.string(retail.columns.code, 64).notNullable();
    table.string(retail.columns.name, 64).notNullable();
    table.string(retail.columns.baseUrl, 512).notNullable();
    table.specificType(retail.columns.urls, 'varchar(512)[]');
    table.boolean(retail.columns.isActive).notNullable();
    table.string(retail.columns.httpMethod, 8).notNullable();
    table.json(retail.columns.pagination).notNullable();
    table.json(retail.columns.selectors).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable(product.tableName, (table) => {
    table.integer(product.columns.id).notNullable();
    table
      .integer(product.columns.retailId)
      .notNullable()
      .references(retail.columns.id)
      .inTable(retail.tableName);
    table
      .integer(product.columns.categoryId)
      .references(category.columns.id)
      .inTable(category.tableName);
    table.string(product.columns.sku, 64);
    table.string(product.columns.name, 512).notNullable();
    table.string(product.columns.slug, 512).notNullable();
    table.json(product.columns.attributes);
    table.string(product.columns.url, 512).notNullable();
    table.string(product.columns.imageUrl, 512).notNullable();
    table.string(product.columns.sourceUrl, 512).notNullable();
    table.integer(product.columns.price).notNullable();
    table.integer(product.columns.listPrice).notNullable();
    table.integer(product.columns.discount);
    table.integer(product.columns.discountPercentage);
    table
      .integer(product.columns.availabilityId)
      .references(availability.columns.id)
      .inTable(availability.tableName);
    table.timestamp(product.columns.arrivalDate);
    table
      .integer(product.columns.conditionId)
      .references(condition.columns.id)
      .inTable(condition.tableName);

    table.primary([product.columns.id, product.columns.retailId]);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(product.tableName);
  await knex.schema.dropTableIfExists(retail.tableName);
  await knex.schema.dropTableIfExists(availability.tableName);
  await knex.schema.dropTableIfExists(condition.tableName);
  await knex.schema.dropTableIfExists(category.tableName);
}
