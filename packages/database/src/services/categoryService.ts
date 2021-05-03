import db from '../internal/dbClient';
import schema from '../schemaBuilder/schema';
import Category from '../models/Category';

const { category } = schema;

export default class CategoryService {
  async findAll(): Promise<Category[]> {
    return db.select().from(category.tableName);
  }
}
