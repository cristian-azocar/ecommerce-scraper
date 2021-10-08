import Category from '../models/Category';
import db from '../internal/dbClient';
import schema from '../schemaBuilder/schema';
import { CategoryEnum } from '../types';

const { category } = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(category.tableName).del();
  await db<Category>(category.tableName).insert([
    // Level 0
    {
      id: CategoryEnum.Root,
      parentId: undefined,
      name: 'Root',
      slug: 'root',
      isActive: true,
    },

    // Level 1
    {
      id: CategoryEnum.Technology,
      parentId: 1,
      name: 'Technology',
      slug: 'technology',
      isActive: true,
    },

    // Level 2
    {
      id: CategoryEnum.Videogames,
      parentId: 2,
      name: 'Videogames',
      slug: 'videogames',
      isActive: true,
    },

    // Level 3
    {
      id: 4,
      parentId: CategoryEnum.Videogames,
      name: 'PC',
      slug: 'pc',
      codes: ['PC'],
      isActive: true,
    },
    {
      id: 5,
      parentId: CategoryEnum.Videogames,
      name: 'PlayStation Vita',
      slug: 'ps-vita',
      codes: ['PSV'],
      isActive: true,
    },
    {
      id: 6,
      parentId: CategoryEnum.Videogames,
      slug: 'psp',
      name: 'PlayStation Portatil',
      codes: ['PSP'],
      isActive: true,
    },
    {
      id: 7,
      parentId: CategoryEnum.Videogames,
      name: 'PlayStation 2',
      slug: 'ps2',
      codes: ['PS2'],
      isActive: true,
    },
    {
      id: 8,
      parentId: CategoryEnum.Videogames,
      name: 'PlayStation 3',
      slug: 'ps3',
      codes: ['PS3'],
      isActive: true,
    },
    {
      id: 9,
      parentId: CategoryEnum.Videogames,
      name: 'PlayStation 4',
      slug: 'ps4',
      codes: ['PS4'],
      isActive: true,
    },
    {
      id: 10,
      parentId: CategoryEnum.Videogames,
      name: 'PlayStation 5',
      slug: 'ps5',
      codes: ['PS5'],
      isActive: true,
    },
    {
      id: 11,
      parentId: CategoryEnum.Videogames,
      name: 'Nintendo Wii',
      slug: 'wii',
      codes: ['WII'],
      isActive: true,
    },
    {
      id: 12,
      parentId: CategoryEnum.Videogames,
      name: 'Nintendo Wii U',
      slug: 'wii-u',
      codes: ['WIIU'],
      isActive: true,
    },
    {
      id: 13,
      parentId: CategoryEnum.Videogames,
      name: 'Nintendo Switch',
      slug: 'switch',
      codes: ['NSW'],
      isActive: true,
    },
    {
      id: 14,
      parentId: CategoryEnum.Videogames,
      name: 'Nintendo DS',
      slug: 'nds',
      codes: ['NDS'],
      isActive: true,
    },
    {
      id: 15,
      parentId: CategoryEnum.Videogames,
      name: 'Nintendo 3DS',
      slug: '3ds',
      codes: ['3DS'],
      isActive: true,
    },
    {
      id: 16,
      parentId: CategoryEnum.Videogames,
      name: 'Xbox 360',
      slug: 'xbox-360',
      codes: ['XB360'],
      isActive: true,
    },
    {
      id: 17,
      parentId: CategoryEnum.Videogames,
      name: 'Xbox One',
      slug: 'xbox-one',
      codes: ['XBONE'],
      isActive: true,
    },
    {
      id: 18,
      parentId: CategoryEnum.Videogames,
      name: 'Xbox Series X/S',
      slug: 'xbox-series-xs',
      codes: ['XBSX'],
      isActive: true,
    },
    {
      id: 19,
      parentId: CategoryEnum.Videogames,
      name: 'Otros',
      slug: 'other',
      isActive: true,
    },
  ]);
}
