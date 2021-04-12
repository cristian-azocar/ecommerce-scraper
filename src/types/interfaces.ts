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

export interface IWebsite {
  id: number;
  name: string;
  baseUrl: string;
  urls: Array<string>;
  isEnabled: boolean;
  httpMethod: 'get' | 'post';
  pagination: { queryString: string };
  selectors: ISelectors;
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
  httpMethod?: 'get' | 'post';
  pagination: { queryString: string };
}

export interface IParserConfig {
  websiteId: number;
  baseUrl: string;
  selectors: ISelectors;
  availabilities: IAvailability[];
  conditions: ICondition[];
  platforms: IPlatform[];
}

export interface LookupTable {
  id: number;
  name: string;
  lookup: Array<string>;
}
