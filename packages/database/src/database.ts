import {
  AvailabilityService,
  CategoryService,
  ConditionService,
  ProductService,
  RetailService,
} from './services';

interface Database {
  availability: AvailabilityService;
  category: CategoryService;
  condition: ConditionService;
  product: ProductService;
  retail: RetailService;
}

const database: Database = {
  availability: new AvailabilityService(),
  category: new CategoryService(),
  condition: new ConditionService(),
  product: new ProductService(),
  retail: new RetailService(),
};

export default database;
