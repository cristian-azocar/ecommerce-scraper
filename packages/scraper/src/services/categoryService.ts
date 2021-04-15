import db, { schema, ICategory } from '@project/database';

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
