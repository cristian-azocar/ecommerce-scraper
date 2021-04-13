import IRetail from 'src/models/IRetail';
import db from 'src/db/client';
import schema from 'src/db/schema';

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
