import Selectors from './Selectors';
import Pagination from './Pagination';

export default interface Retail {
  id: number;
  slug: string;
  name: string;
  baseUrl: string;
  urls: string[];
  isActive: boolean;
  httpMethod: 'get' | 'post';
  pagination: Pagination;
  selectors: Selectors;
}
