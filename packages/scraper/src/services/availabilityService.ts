import db, { IAvailability, schema } from '@project/database';

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
