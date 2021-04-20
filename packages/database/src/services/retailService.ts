import db from '../client';
import schema from '../schema';
import Retail from '../models/Retail';

const { retail } = schema;

class RetailService {
  async findAll(): Promise<Retail[]> {
    return db.select().from(retail.tableName);
  }
}

export default new RetailService();
