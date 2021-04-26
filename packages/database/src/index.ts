import { testConnection } from './helpers/dbHelpers';
import Database from './types/Database';
import {
  availabilityService,
  categoryService,
  conditionService,
  productService,
  retailService,
} from './services';

const db: Database = {
  testConnection,
  availability: availabilityService,
  category: categoryService,
  condition: conditionService,
  product: productService,
  retail: retailService,
};

export * from './models';
export * from './types';
export default db;
