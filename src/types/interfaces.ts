import { Availability, Platform } from './enums';

export interface IConfig {
  port: number;
}

export interface IProduct {
  name: string;
  platform: Platform;
  url: string;
  price: number;
  listPrice: number;
  discount: number;
  availability: Availability;
}

export interface IParser {
  parse($: cheerio.Root): Promise<IProduct[]>;
  // extractProducts($: cheerio.Root): Promise<IProduct[]>;
  // extractPrices(el: cheerio.Cheerio): Partial<IProduct>;
}

export interface IScrapeOptions {
  baseUrl: string;
  scrapeUrl: string;
  parser: IParser;
}

export interface IPrices {
  price: number;
  listPrice: number;
  discount: number;
}
