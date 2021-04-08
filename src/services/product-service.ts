import { IProduct } from 'src/types/interfaces';
import db from 'src/db/client';
import schema from 'src/db/schema';

const { tables } = schema;

class ProductService {
  async find(query?: Partial<IProduct>): Promise<IProduct[]> {
    return db
      .select('*')
      .from(tables.product)
      .where(query || {});
  }

  async findOne(query?: Partial<IProduct>): Promise<IProduct> {
    return db
      .first('*')
      .from(tables.product)
      .where(query || {});
  }

  async create(products: IProduct | IProduct[]): Promise<void> {
    await db.insert(products).into(tables.product);
  }

  async createOrUpdate(products: IProduct | IProduct[]): Promise<void> {
    await db.insert(products).into(tables.product).onConflict('id').merge();
  }
}

export default new ProductService();
