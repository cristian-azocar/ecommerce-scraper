import Pagination from './Pagination';
import { Selectors } from '../types';

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
