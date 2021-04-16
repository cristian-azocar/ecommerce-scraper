import {
  IPagination,
  ISelectors,
  IAvailability,
  ICategory,
  ICondition,
  IProduct,
  IRetail,
} from '@project/database';

export interface IConfig {
  port: number;
  database: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
  retails: IRetail[];
  availabilities: IAvailability[];
  conditions: ICondition[];
  categories: ICategory[];
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
