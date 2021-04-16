import db from 'src/client';
import schema from 'src/schema';
import IAvailability from 'src/models/IAvailability';

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
