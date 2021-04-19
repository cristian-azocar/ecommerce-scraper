import { Availability, Category, Condition, Retail } from '@project/database';

export default interface IConfig {
  port: number;
  database: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
  retails: Retail[];
  availabilities: Availability[];
  conditions: Condition[];
  categories: Category[];
}
