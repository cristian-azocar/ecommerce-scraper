import ICondition from '../types/ICondition';
import db from '../client';
import schema from '../schema';

const {
  tables: { condition },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(condition.tableName).del();
  await db<ICondition>(condition.tableName).insert([
    { id: 1, name: 'Nuevo', slug: 'new', codes: ['Nuevo'] },
    { id: 2, name: 'Usado', slug: 'used', codes: ['Usado'] },
  ]);
}
