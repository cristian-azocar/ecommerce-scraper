import Condition from '../models/Condition';
import db from '../internal/dbClient';
import schema from '../schemaBuilder/schema';

const { condition } = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(condition.tableName).del();
  await db<Condition>(condition.tableName).insert([
    { id: 1, name: 'Nuevo', slug: 'new', codes: ['Nuevo'] },
    { id: 2, name: 'Usado', slug: 'used', codes: ['Usado'] },
  ]);
}
