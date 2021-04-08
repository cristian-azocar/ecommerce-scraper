import { Pool } from 'pg';
import config from 'src/configs/app-config';
import { IProduct } from 'src/types/interfaces';

const pool: Pool = new Pool(config.database);

class ProductService {
  async findAll(): Promise<IProduct[]> {
    const { rows } = await pool.query('SELECT * FROM products');
    console.log(rows);

    return [];
  }

  async create(product: IProduct): Promise<void> {
    await pool.query(
      'INSERT INTO products (id, sku, name, platform) VALUES $1, $2, $3, $4',
      [product.id, product.sku, product.name, product.platform]
    );
  }
}

export default new ProductService();
