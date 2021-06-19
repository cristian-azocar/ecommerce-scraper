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

export type Condition = Partial<
  Record<keyof Product, string | number | (string | number)[]>
>;

export type OrderBy = Partial<Record<keyof Product, 'asc' | 'desc'>>;

export default class ProductService {
  async findAll(): Promise<Product[]> {
    return db.select().from(product.tableName);
  }

  async findByName(
    name: string,
    condition: Condition,
    orderBy: OrderBy
  ): Promise<Product[]> {
    const query = db
      .select()
      .from(product.tableName)
      .where('name', 'ilike', `%${name}%`);

    Object.entries(condition).forEach(([key, value]) => {
      if (value) {
        const normalizedValue = Array.isArray(value) ? value : [value];
        if (normalizedValue.length) {
          query.whereIn(key, normalizedValue);
        }
      }
    });

    if (orderBy) {
      Object.entries(orderBy).forEach(([key, value]) => {
        query.orderBy(key, value);
      });
    }

    return query;
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
