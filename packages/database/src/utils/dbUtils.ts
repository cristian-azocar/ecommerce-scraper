import fs from 'fs';
import path from 'path';
import { Knex } from 'knex';

export function buildOnUpdateTrigger(tableName: string): string {
  return `
    CREATE TRIGGER ${tableName}_updated_at
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW EXECUTE PROCEDURE on_update_timestamp();
  `;
}

export function buildHistoryTrigger(tableName: string): string {
  return `
    CREATE TRIGGER ${tableName}_history_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ${tableName}
    FOR EACH ROW EXECUTE FUNCTION history_trigger();
  `;
}

export function readScript(fileName: string): string {
  const filePath: string = path.resolve(__dirname, '../scripts/', fileName);

  return fs.readFileSync(filePath, { encoding: 'utf-8' });
}

export function distinctFrom(
  knex: Knex,
  tableName: string,
  columns: string[]
): Knex.Raw {
  const first: string = columns.map((col) => `${tableName}.${col}`).join(',');
  const second: string = columns.map((col) => `excluded.${col}`).join(',');

  return knex.raw(`(${first}) is distinct from (${second})`);
}
