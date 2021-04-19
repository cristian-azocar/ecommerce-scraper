import Availability from '../types/Availability';
import db from '../client';
import schema from '../schema';

const { availability } = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(availability.tableName).del();
  await db<Availability>(availability.tableName).insert([
    { name: 'Available', slug: 'available', codes: ['Disponible'] },
    { name: 'Out of Stock', slug: 'out-of-stock', codes: ['Agotado'] },
    {
      name: 'Upcoming Release',
      slug: 'upcoming-release',
      codes: ['Próximo Lanzamiento'],
    },
    { name: 'Presale', slug: 'presale', codes: ['Preventa'] },
  ]);
}
