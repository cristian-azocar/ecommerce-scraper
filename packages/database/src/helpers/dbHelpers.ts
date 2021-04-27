import { Knex } from 'knex';
import db from '../client';

export function onUpdateTrigger(tableName: string): string {
  return `
    CREATE TRIGGER ${tableName}_updated_at
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `;
}

export async function testConnection(): Promise<void> {
  await db.raw('SELECT 1+1 AS result');
}

export function distinctFrom(tableName: string, columns: string[]): Knex.Raw {
  const first: string = columns.map((col) => `${tableName}.${col}`).join(',');
  const second: string = columns.map((col) => `excluded.${col}`).join(',');

  return db.raw(`(${first}) is distinct from (${second})`);
}
