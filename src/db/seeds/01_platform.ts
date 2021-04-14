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
    { id: 1, categoryId: 4, name: 'PC' },
    { id: 2, categoryId: 5, name: 'PS Vita', codes: ['PSV'] },
    { id: 3, categoryId: 6, name: 'PSP' },
    { id: 4, categoryId: 7, name: 'PS2' },
    { id: 5, categoryId: 8, name: 'PS3' },
    { id: 6, categoryId: 9, name: 'PS4' },
    { id: 7, categoryId: 10, name: 'PS5' },
    { id: 8, categoryId: 11, name: 'Wii', codes: ['WII'] },
    { id: 9, categoryId: 12, name: 'Wii U', codes: ['WIIU'] },
    { id: 10, categoryId: 13, name: 'Switch', codes: ['NSW'] },
    { id: 11, categoryId: 14, name: 'DS', codes: ['NDS'] },
    { id: 12, categoryId: 15, name: '3DS' },
    { id: 13, categoryId: 16, name: 'Xbox 360', codes: ['XB360'] },
    { id: 14, categoryId: 17, name: 'Xbox One', codes: ['XBONE'] },
    { id: 15, categoryId: 18, name: 'Xbox Series X/S', codes: ['XBSX'] },
  ]);
}
