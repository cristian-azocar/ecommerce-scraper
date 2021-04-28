/* eslint-disable no-await-in-loop */
import { Knex } from 'knex';
import schema, { Column, Table } from '../schema';

export default class SchemaBuilder {
  async install(knex: Knex): Promise<void> {
    const tables: Table[] = Object.values(schema);

    for (let index = 0; index < tables.length; index++) {
      await this.createTable(knex, tables[index]);
    }
  }

  async uninstall(knex: Knex): Promise<void> {
    const tableNames = Object.entries(schema).map(
      ([, table]) => table.tableName
    );

    for (let index = 0; index < tableNames.length; index++) {
      await knex.schema.dropTableIfExists(tableNames[index]);
    }
  }

  private async createTable(knex: Knex, tableData: Table): Promise<void> {
    await knex.schema.createTable(tableData.tableName, (table) => {
      tableData.columns.forEach((columnData) => {
        this.createColumn(table, columnData);
      });

      if (tableData.primaryKey) {
        table.primary(tableData.primaryKey);
      }

      if (tableData.timestamps) {
        table.timestamps(true, true);
      }
    });

    if (tableData.triggers) {
      for (let i = 0; i < tableData.triggers.length; i++) {
        await knex.raw(tableData.triggers[i]);
      }
    }
  }

  private createColumn(
    table: Knex.CreateTableBuilder,
    columnData: Column
  ): void {
    const {
      name,
      type,
      useTz,
      textType,
      length,
      precision,
      scale,
      enumValues,
      nullable,
      foreignKey,
      primaryKey,
      defaultValue,
    } = columnData;
    let column;

    if (!type) {
      throw new Error(`Column "${columnData.name}" is missing a type`);
    }

    if (type === 'text') {
      column = table.text(name, textType);
    } else if (
      type === 'string' ||
      type === 'integer' ||
      type === 'bigInteger' ||
      type === 'binary'
    ) {
      column = table[type](name, length);
    } else if (type === 'float' || type === 'double' || type === 'decimal') {
      column = table[type](name, precision, scale);
    } else if (type === 'timestamp' || type === 'dateTime') {
      column = table.timestamp(name, { useTz, precision });
    } else if (type === 'enu' || type === 'enum') {
      column = table[type](name, enumValues);
    } else if (type === 'increments') {
      column = table.increments(name);
    } else {
      column = table.specificType(name, type);
    }

    if (defaultValue) {
      column.defaultTo(defaultValue);
    }

    if (nullable === false) {
      column.notNullable();
    }

    if (foreignKey) {
      column.references(foreignKey.column).inTable(foreignKey.table);
    }

    if (primaryKey) {
      column.primary();
    }
  }
}
