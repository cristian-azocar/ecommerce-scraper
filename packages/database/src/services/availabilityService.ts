import db from '../internal/dbClient';
import schema from '../schemaBuilder/schema';
import Availability from '../models/Availability';

const { availability } = schema;

export default class AvailabilityService {
  async findAll(): Promise<Availability[]> {
    return db.select().from(availability.tableName);
  }
}
