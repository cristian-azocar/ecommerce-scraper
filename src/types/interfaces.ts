import { Condition, HTTPMethod } from './enums';

export interface ISelectors {
  product: string;
  sku: string;
  name: string;
  url: string;
  imageUrl: string;
  availability: string;
  estimatedArrivalDate: string;
  price: string;
  listPrice: string;
  discount: string;
  discountPercentage: string;
  nextPage: string;
}

export interface IWebsite {
  id: number;
  name: string;
  baseUrl: string;
  urls: Array<string>;
  selectors: ISelectors;
  isEnabled: boolean;
}

export interface IPlatform {
  id: number;
  name: string;
  lookup: Array<string>;
}

export interface IAvailability {
  id: number;
  name: string;
  lookup: Array<string>;
}

export interface ICondition {
  id: number;
  name: string;
  lookup: Array<string>;
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

export interface IProduct {
  id: number;
  websiteId: number; // TODO: use Website enum?
  sku: string;
  name: string;
  platformId: number; // TODO: use Platform enum?
  url: string;
  imageUrl: string;
  price: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
  availabilityId: number; // TODO: use Availability enum?
  estimatedArrivalDate: Date;
  conditionId: number; // TODO: use Condition enum?
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
  parse(html: string): IParseResult;
}

export interface IScraperConfig {
  url: string;
  parser: IParser;
  httpMethod?: HTTPMethod;
  pagination: { queryString: string };
}
