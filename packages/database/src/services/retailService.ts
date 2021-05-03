import db from '../internal/dbClient';
import schema from '../schemaBuilder/schema';
import Retail from '../models/Retail';

const { retail } = schema;

export default class RetailService {
  async findAll(): Promise<Retail[]> {
    return db.select().from(retail.tableName);
  }
}
