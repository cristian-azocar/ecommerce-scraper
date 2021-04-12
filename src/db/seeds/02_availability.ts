import IAvailability from 'src/models/IAvailability';
import db from '../client';
import schema from '../schema';

const {
  tables: { availability },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(availability.tableName).del();
  await db<IAvailability>(availability.tableName).insert([
    { name: 'Available', lookup: ['Disponible'] },
    { name: 'Out of Stock', lookup: ['Agotado'] },
    { name: 'Upcoming Release', lookup: ['Próximo Lanzamiento'] },
    { name: 'Presale', lookup: ['Preventa'] },
  ]);
}
