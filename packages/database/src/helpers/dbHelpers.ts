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
