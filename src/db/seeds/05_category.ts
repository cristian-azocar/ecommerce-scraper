import ICategory from 'src/models/ICategory';
import db from '../client';
import schema from '../schema';

const {
  tables: { category },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(category.tableName).del();
  await db<ICategory>(category.tableName).insert([
    // Level 0
    { id: 1, parentId: null, code: 'root', name: 'Root', isActive: true },

    // Level 1
    {
      id: 2,
      parentId: 1,
      code: 'tecnologia',
      name: 'Tecnología',
      isActive: true,
    },

    // Level 2
    {
      id: 3,
      parentId: 2,
      code: 'videojuegos',
      name: 'Videojuegos',
      isActive: true,
    },

    // Level 3
    { id: 4, parentId: 3, code: 'pc', name: 'PC', isActive: true },
    { id: 5, parentId: 3, code: 'ps-vita', name: 'PS Vita', isActive: true },
    { id: 6, parentId: 3, code: 'psp', name: 'PSP', isActive: true },
    { id: 7, parentId: 3, code: 'ps2', name: 'PS2', isActive: true },
    { id: 8, parentId: 3, code: 'ps3', name: 'PS3', isActive: true },
    { id: 9, parentId: 3, code: 'ps4', name: 'PS4', isActive: true },
    { id: 10, parentId: 3, code: 'ps5', name: 'PS5', isActive: true },
    { id: 11, parentId: 3, code: 'wii', name: 'Wii', isActive: true },
    { id: 12, parentId: 3, code: 'wii-u', name: 'Wii U', isActive: true },
    { id: 13, parentId: 3, code: 'switch', name: 'Switch', isActive: true },
    { id: 14, parentId: 3, code: 'nds', name: 'Nintendo DS', isActive: true },
    { id: 15, parentId: 3, code: '3ds', name: 'Nintendo 3DS', isActive: true },
    { id: 16, parentId: 3, code: 'xbox-360', name: 'Xbox 360', isActive: true },
    { id: 17, parentId: 3, code: 'xbox-one', name: 'Xbox One', isActive: true },
    {
      id: 18,
      parentId: 3,
      code: 'xbox-series-xs',
      name: 'Xbox Series X/S',
      isActive: true,
    },
    { id: 19, parentId: 3, code: 'others', name: 'Otros', isActive: true },
  ]);
}
