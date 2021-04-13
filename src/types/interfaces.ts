import IAvailability from 'src/models/IAvailability';
import ICondition from 'src/models/ICondition';
import IPlatform from 'src/models/IPlatform';
import IProduct from 'src/models/IProduct';
import IWebsite from 'src/models/IWebsite';

export interface ISelectors {
  id: string;
  product: string;
  sku: string;
  name: string;
  platform: string;
  url: string;
  imageUrl: string;
  price: string;
  listPrice: string;
  discount: string;
  discountPercentage: string;
  availability: string;
  estimatedArrivalDate: string;
  condition: string;
  nextPage: string;
}

export interface IConfig {
  port: number;
  database: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
  websites: Array<IWebsite>;
  platforms: Array<IPlatform>;
  availabilities: Array<IAvailability>;
  conditions: Array<ICondition>;
}

export interface IPrices {
  price: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
}

export interface IParseResult {
  products: IProduct[];
  morePages: boolean;
}

export interface IParser {
  parse(html: string, url: string): IParseResult;
}

export interface IPagination {
  queryString: string;
}

export interface IScraperConfig {
  url: string;
  parser: IParser;
  httpMethod: 'get' | 'post';
  pagination: IPagination;
}

export interface IParserConfig {
  websiteId: number;
  baseUrl: string;
  selectors: ISelectors;
  availabilities: IAvailability[];
  conditions: ICondition[];
  platforms: IPlatform[];
}
