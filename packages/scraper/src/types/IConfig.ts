import { Availability, Category, Condition, Retail } from '@project/database';

export default interface IConfig {
  port: number;
  retails: Retail[];
  availabilities: Availability[];
  conditions: Condition[];
  categories: Category[];
}
