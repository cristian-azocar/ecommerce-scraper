import { Availability, Platform } from './enums';

export interface IConfig {
  port: number;
}

export interface IProduct {
  name: string;
  platform: Platform;
  url: string;
  price: number;
  normalPrice: number;
  discount: number;
  availability: Availability;
}
