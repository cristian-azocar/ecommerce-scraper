import Category from '../models/Category';
import db from '../client';
import schema from '../schema';

const { category } = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(category.tableName).del();
  await db<Category>(category.tableName).insert([
    // Level 0
    { id: 1, parentId: null, name: 'Root', slug: 'root', isActive: true },

    // Level 1
    {
      id: 2,
      parentId: 1,
      name: 'Tecnología',
      slug: 'tecnologia',
      isActive: true,
    },

    // Level 2
    {
      id: 3,
      parentId: 2,
      name: 'Videojuegos',
      slug: 'videojuegos',
      isActive: true,
    },

    // Level 3
    { id: 4, parentId: 3, name: 'PC', slug: 'pc', isActive: true },
    {
      id: 5,
      parentId: 3,
      name: 'Playstation Vita',
      slug: 'ps-vita',
      codes: ['PSV'],
      isActive: true,
    },
    {
      id: 6,
      parentId: 3,
      slug: 'psp',
      name: 'Playstation Portatil',
      codes: ['PSP'],
      isActive: true,
    },
    {
      id: 7,
      parentId: 3,
      name: 'Playstation 2',
      slug: 'ps2',
      codes: ['PS2'],
      isActive: true,
    },
    {
      id: 8,
      parentId: 3,
      name: 'Playstation 3',
      slug: 'ps3',
      codes: ['PS3'],
      isActive: true,
    },
    {
      id: 9,
      parentId: 3,
      name: 'Playstation 4',
      slug: 'ps4',
      codes: ['PS4'],
      isActive: true,
    },
    {
      id: 10,
      parentId: 3,
      name: 'Playstation 5',
      slug: 'ps5',
      codes: ['PS5'],
      isActive: true,
    },
    {
      id: 11,
      parentId: 3,
      name: 'Nintendo Wii',
      slug: 'wii',
      codes: ['WII'],
      isActive: true,
    },
    {
      id: 12,
      parentId: 3,
      name: 'Nintendo Wii U',
      slug: 'wii-u',
      codes: ['WIIU'],
      isActive: true,
    },
    {
      id: 13,
      parentId: 3,
      name: 'Nintendo Switch',
      slug: 'switch',
      codes: ['NSW'],
      isActive: true,
    },
    {
      id: 14,
      parentId: 3,
      name: 'Nintendo DS',
      slug: 'nds',
      codes: ['NDS'],
      isActive: true,
    },
    {
      id: 15,
      parentId: 3,
      name: 'Nintendo 3DS',
      slug: '3ds',
      codes: ['3DS'],
      isActive: true,
    },
    {
      id: 16,
      parentId: 3,
      name: 'Xbox 360',
      slug: 'xbox-360',
      codes: ['XB360'],
      isActive: true,
    },
    {
      id: 17,
      parentId: 3,
      name: 'Xbox One',
      slug: 'xbox-one',
      codes: ['XBONE'],
      isActive: true,
    },
    {
      id: 18,
      parentId: 3,
      name: 'Xbox Series X/S',
      slug: 'xbox-series-xs',
      codes: ['XBSX'],
      isActive: true,
    },
    { id: 19, parentId: 3, name: 'Otros', slug: 'other', isActive: true },
  ]);
}
