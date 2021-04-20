import db from '../client';
import schema from '../schema';
import Category from '../models/Category';

const { category } = schema;

class CategoryService {
  async findAll(): Promise<Category[]> {
    return db.select().from(category.tableName);
  }
}

export default new CategoryService();
