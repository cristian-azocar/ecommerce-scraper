import { ISelectors, IPagination } from '@project/types';

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
