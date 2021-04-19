import db from '../client';
import schema from '../schema';
import Product from '../types/Product';

const { tables } = schema;

class ProductService {
  async findAll(): Promise<Product[]> {
    return db.select().from(tables.product.tableName);
  }

  async create(products: Product | Product[]): Promise<void> {
    await db.insert(products).into(tables.product.tableName);
  }

  async createOrUpdate(products: Product | Product[]): Promise<void> {
    const {
      product: { columns },
    } = tables;

    await db
      .insert(products)
      .into(tables.product.tableName)
      .onConflict([columns.id, columns.retailId])
      .merge();
  }
}

export default new ProductService();
