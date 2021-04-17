import db from '../client';
import schema from '../schema';
import ICategory from '../types/ICategory';

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
