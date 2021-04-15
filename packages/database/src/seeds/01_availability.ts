import IAvailability from 'src/models/IAvailability';
import db from 'src/client';
import schema from 'src/schema';

const {
  tables: { availability },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(availability.tableName).del();
  await db<IAvailability>(availability.tableName).insert([
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
