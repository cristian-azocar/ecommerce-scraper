import { Availability, Condition, HTTPMethod, Platform } from './enums';

export interface IConfig {
  port: number;
  database: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
}

export interface IProduct {
  id: number;
  sku: string;
  name: string;
  platform: Platform;
  url: string;
  imageUrl: string;
  price: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
  availability: Availability;
  estimatedArrivalDate: Date;
  condition: Condition;
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

export interface IWebsiteConfig {
  baseUrl: string;
  enabled: boolean;
  urls: string[];
  selectors: ISelectors;
}
