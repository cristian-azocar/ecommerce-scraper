import {
  IAvailability,
  ICategory,
  ICondition,
  IRetail,
} from '@project/database';

export default interface IConfig {
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
