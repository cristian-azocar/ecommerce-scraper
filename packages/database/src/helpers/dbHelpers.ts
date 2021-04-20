// eslint-disable-next-line import/prefer-default-export
export function onUpdateTrigger(tableName: string): string {
  return `
    CREATE TRIGGER ${tableName}_updated_at
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `;
}
