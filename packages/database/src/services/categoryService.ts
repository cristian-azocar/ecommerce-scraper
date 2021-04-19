import db from '../client';
import schema from '../schema';
import Category from '../types/Category';

const { tables } = schema;

class CategoryService {
  async findAll(): Promise<Category[]> {
    return db.select().from(tables.category.tableName);
  }
}

export default new CategoryService();
