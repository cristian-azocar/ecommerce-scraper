import db from '../client';
import schema from '../schema';
import Retail from '../types/Retail';

const { tables } = schema;

class RetailService {
  async findAll(): Promise<Retail[]> {
    return db.select().from(tables.retail.tableName);
  }
}

export default new RetailService();
