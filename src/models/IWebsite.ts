import { ISelectors, IPagination } from 'src/types/interfaces';

export default interface IWebsite {
  id: number;
  name: string;
  baseUrl: string;
  urls: Array<string>;
  isEnabled: boolean;
  httpMethod: 'get' | 'post';
  pagination: IPagination;
  selectors: ISelectors;
}
