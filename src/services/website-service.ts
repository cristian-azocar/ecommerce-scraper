import IWebsite from 'src/models/IWebsite';
import db from 'src/db/client';
import schema from 'src/db/schema';

const { tables } = schema;

class WebsiteService {
  async find(query?: Partial<IWebsite>): Promise<IWebsite[]> {
    return db
      .select('*')
      .from(tables.website.tableName)
      .where(query || {});
  }
}

export default new WebsiteService();
