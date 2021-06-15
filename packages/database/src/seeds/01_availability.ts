import Availability from '../models/Availability';
import db from '../internal/dbClient';
import schema from '../schemaBuilder/schema';
import { AvailabilityEnum } from '../enums';

const { availability } = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(availability.tableName).del();
  await db<Availability>(availability.tableName).insert([
    {
      id: AvailabilityEnum.Available,
      name: 'Available',
      slug: 'available',
      codes: ['Disponible'],
    },
    {
      id: AvailabilityEnum.OutOfStock,
      name: 'Out of Stock',
      slug: 'out-of-stock',
      codes: ['Agotado'],
    },
    {
      id: AvailabilityEnum.UpcomingRelease,
      name: 'Upcoming Release',
      slug: 'upcoming-release',
      codes: ['Próximo Lanzamiento'],
    },
    {
      id: AvailabilityEnum.Presale,
      name: 'Presale',
      slug: 'presale',
      codes: ['Preventa'],
    },
  ]);
}
