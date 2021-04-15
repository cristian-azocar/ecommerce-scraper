import IAvailability from 'src/models/IAvailability';
import ICategory from 'src/models/ICategory';
import ICondition from 'src/models/ICondition';
import IProduct from 'src/models/IProduct';
import IRetail from 'src/models/IRetail';

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
  arrivalDate: string;
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
  retails: Array<IRetail>;
  availabilities: Array<IAvailability>;
  conditions: Array<ICondition>;
  categories: Array<ICategory>;
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
  retailId: number;
  baseUrl: string;
  selectors: ISelectors;
  availabilities: IAvailability[];
  conditions: ICondition[];
  categories: ICategory[];
}
