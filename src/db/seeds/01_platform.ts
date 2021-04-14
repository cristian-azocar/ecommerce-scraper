import IPlatform from 'src/models/IPlatform';
import db from '../client';
import schema from '../schema';

const {
  tables: { platform },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(platform.tableName).del();
  await db<IPlatform>(platform.tableName).insert([
    { name: 'Blu-Ray', codes: ['BLR'] },
    { name: 'Book' },
    { name: 'PC' },
    { name: 'PS Vita', codes: ['PSV'] },
    { name: 'PSP' },
    { name: 'PS2' },
    { name: 'PS3' },
    { name: 'PS4' },
    { name: 'PS5' },
    { name: 'Wii', codes: ['WII'] },
    { name: 'Wii U', codes: ['WIIU'] },
    { name: 'Switch', codes: ['NSW'] },
    { name: 'DS', codes: ['NDS'] },
    { name: '3DS' },
    { name: 'Xbox 360', codes: ['XB360'] },
    { name: 'Xbox One', codes: ['XBONE'] },
  ]);
}
