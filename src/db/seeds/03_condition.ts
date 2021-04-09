import { ICondition } from 'src/types/interfaces';
import db from '../client';
import schema from '../schema';

const {
  tables: { condition },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(condition.tableName).del();
  await db<ICondition>(condition.tableName).insert([
    { name: 'New', lookup: ['Nuevo'] },
    { name: 'Used', lookup: ['Usado'] },
  ]);
}
