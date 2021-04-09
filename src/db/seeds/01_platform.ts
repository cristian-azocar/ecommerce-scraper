import { Knex } from 'knex';
import schema from '../schema';

const {
  tables: { platform },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(platform.tableName).del();

  // Inserts seed entries
  await knex(platform.tableName).insert([
    { name: 'Blu-Ray', lookup: ['BLR'] },
    { name: 'Book' },
    { name: 'PC' },
    { name: 'PS Vita', lookup: ['PSV'] },
    { name: 'PSP' },
    { name: 'PS2' },
    { name: 'PS3' },
    { name: 'PS4' },
    { name: 'PS5' },
    { name: 'Wii', lookup: ['WII'] },
    { name: 'Wii U', lookup: ['WIIU'] },
    { name: 'Switch', lookup: ['NSW'] },
    { name: 'DS', lookup: ['NDS'] },
    { name: '3DS' },
    { name: 'Xbox 360', lookup: ['XB360'] },
    { name: 'Xbox One', lookup: ['XBONE'] },
  ]);
}
