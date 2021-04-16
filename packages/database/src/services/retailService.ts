import db from 'src/client';
import schema from 'src/schema';
import IRetail from 'src/models/IRetail';

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
