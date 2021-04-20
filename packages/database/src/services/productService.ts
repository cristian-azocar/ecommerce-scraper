import db from '../client';
import schema from '../schema';
import Product from '../models/Product';

const { product } = schema;

class ProductService {
  async findAll(): Promise<Product[]> {
    return db.select().from(product.tableName);
  }

  async create(products: Product | Product[]): Promise<void> {
    await db.insert(products).into(product.tableName);
  }

  async createOrUpdate(products: Product | Product[]): Promise<void> {
    await db
      .insert(products)
      .into(product.tableName)
      .onConflict(product.primaryKey)
      .merge();
  }
}

export default new ProductService();
