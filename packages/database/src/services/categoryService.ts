import db from 'src/client';
import schema from 'src/schema';
import ICategory from 'src/models/ICategory';

const { tables } = schema;

class CategoryService {
  async find(query?: Partial<ICategory>): Promise<ICategory[]> {
    return db
      .select('*')
      .from(tables.category.tableName)
      .where(query || {});
  }
}

export default new CategoryService();
