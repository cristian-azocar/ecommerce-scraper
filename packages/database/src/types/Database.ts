import { AvailabilityService } from '../services/availabilityService';
import { CategoryService } from '../services/categoryService';
import { ConditionService } from '../services/conditionService';
import { ProductService } from '../services/productService';
import { RetailService } from '../services/retailService';

export default interface Database {
  testConnection: () => Promise<void>;
  availability: AvailabilityService;
  category: CategoryService;
  condition: ConditionService;
  product: ProductService;
  retail: RetailService;
}
