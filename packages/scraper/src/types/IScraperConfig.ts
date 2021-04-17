import { IPagination } from '@project/database';
import IParser from './IParser';

export default interface IScraperConfig {
  url: string;
  parser: IParser;
  httpMethod: 'get' | 'post';
  pagination: IPagination;
}
