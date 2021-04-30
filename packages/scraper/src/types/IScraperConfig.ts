import { Pagination } from '@project/database';
import IParser from './IParser';

export default interface IScraperConfig {
  url: string;
  parser: IParser;
  httpMethod: 'get' | 'post';
  pagination: Pagination;
  maxRetries?: number;
}
