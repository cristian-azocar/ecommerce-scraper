import db from '../client';
import schema from '../schema';
import IProduct from '../types/IProduct';

const { tables } = schema;

class ProductService {
  async find(query?: Partial<IProduct>): Promise<IProduct[]> {
    return db
      .select('*')
      .from(tables.product.tableName)
      .where(query || {});
  }

  async findOne(query?: Partial<IProduct>): Promise<IProduct> {
    return db
      .first('*')
      .from(tables.product.tableName)
      .where(query || {});
  }

  async create(products: IProduct | IProduct[]): Promise<void> {
    await db.insert(products).into(tables.product.tableName);
  }

  async createOrUpdate(products: IProduct | IProduct[]): Promise<void> {
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
