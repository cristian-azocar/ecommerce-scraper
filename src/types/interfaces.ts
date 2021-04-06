import { Availability, Platform } from './enums';

export interface IConfig {
  port: number;
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
}

export interface IPrices {
  price: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
}

export interface IScrapeResult {
  products: IProduct[];
  morePages: boolean;
}

export interface IParser {
  parse(html: string): IScrapeResult;
}

export interface IScrapeOptions {
  url: string;
  parser: IParser;
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
