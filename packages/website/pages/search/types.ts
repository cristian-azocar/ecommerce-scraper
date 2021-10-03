import { Availability, Category, Product } from '@project/database';

export interface SortOption {
  label: string;
  value: string;
  name?: string;
  order?: 'asc' | 'desc';
}

export type FilterOption = Availability | Category;

export interface Filter {
  title: string;
  slug: string;
  options: FilterOption[];
}

export interface EnhancedProduct extends Product {
  availability?: Availability;
  isUnavailable: boolean;
}
