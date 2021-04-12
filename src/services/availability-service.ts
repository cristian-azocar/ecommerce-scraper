import IAvailability from 'src/models/IAvailability';
import db from 'src/db/client';
import schema from 'src/db/schema';

const { tables } = schema;

class AvailabilityService {
  async find(query?: Partial<IAvailability>): Promise<IAvailability[]> {
    return db
      .select('*')
      .from(tables.availability.tableName)
      .where(query || {});
  }
}

export default new AvailabilityService();
