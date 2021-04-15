import db, { IRetail, schema } from '@project/database';

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
