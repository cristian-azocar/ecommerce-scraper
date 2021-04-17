import db from '../client';
import schema from '../schema';
import IAvailability from '../types/IAvailability';

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
