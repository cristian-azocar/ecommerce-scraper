import db from '../client';
import schema from '../schema';
import Availability from '../models/Availability';

const { availability } = schema;

export class AvailabilityService {
  async findAll(): Promise<Availability[]> {
    return db.select().from(availability.tableName);
  }
}

export default new AvailabilityService();
