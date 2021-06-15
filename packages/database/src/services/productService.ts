import db from '../internal/dbClient';
import schema from '../schemaBuilder/schema';
import Product from '../models/Product';
import { distinctFrom } from '../utils/dbUtils';

const { product } = schema;
const distinctFromQuery = distinctFrom(db, product.tableName, [
  'price',
  'list_price',
  'discount',
  'discount_percentage',
  'availability_id',
  'arrival_date',
]);

export default class ProductService {
  async findAll(): Promise<Product[]> {
    return db.select().from(product.tableName);
  }

  async findByName(name: string): Promise<Product[]> {
    return db
      .select()
      .from(product.tableName)
      .where('name', 'ilike', `%${name}%`);
  }

  async create(products: Product | Product[]): Promise<void> {
    await db.insert(products).into(product.tableName);
  }

  async createOrUpdate(products: Product | Product[]): Promise<void> {
    if (!product.primaryKey) {
      throw new Error(`Table "${product.tableName}" has no primary key`);
    }

    await db
      .insert(products)
      .into(product.tableName)
      .onConflict(product.primaryKey)
      .merge()
      .where(distinctFromQuery);
  }
}
