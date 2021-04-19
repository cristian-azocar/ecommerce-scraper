import db from '../client';
import schema from '../schema';
import Availability from '../types/Availability';

const { tables } = schema;

class AvailabilityService {
  async findAll(): Promise<Availability[]> {
    return db.select().from(tables.availability.tableName);
  }
}

export default new AvailabilityService();
