import db from '../client';
import schema from '../schema';
import IRetail from '../types/IRetail';

const { tables } = schema;

class RetailService {
  async find(query?: Partial<IRetail>): Promise<IRetail[]> {
    return db
      .select('*')
      .from(tables.retail.tableName)
      .where(query || {});
  }
}

export default new RetailService();
