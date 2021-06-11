import db, { Product } from '@project/database';

export default class ProductService {
  async findByName(name: string): Promise<Product[]> {
    const products = await db.product.findAll();

    return products.slice(0, 10);
  }
}
