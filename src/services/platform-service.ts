import IPlatform from 'src/models/IPlatform';
import db from 'src/db/client';
import schema from 'src/db/schema';

const { tables } = schema;

class PlatformService {
  async find(query?: Partial<IPlatform>): Promise<IPlatform[]> {
    return db
      .select('*')
      .from(tables.platform.tableName)
      .where(query || {});
  }
}

export default new PlatformService();
