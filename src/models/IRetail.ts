import { ISelectors, IPagination } from 'src/types/interfaces';

export default interface IRetail {
  id: number;
  slug: string;
  name: string;
  baseUrl: string;
  urls: string[];
  isActive: boolean;
  httpMethod: 'get' | 'post';
  pagination: IPagination;
  selectors: ISelectors;
}
