import db from '../client';
import schema from '../schema';
import Product from '../models/Product';
import { distinctFrom } from '../helpers/dbHelpers';

const { product } = schema;
const distinctFromQuery = distinctFrom(product.tableName, [
  'price',
  'list_price',
  'discount',
  'discount_percentage',
  'availability_id',
  'arrival_date',
]);

export class ProductService {
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
      .merge()
      .where(distinctFromQuery);
  }
}

export default new ProductService();
