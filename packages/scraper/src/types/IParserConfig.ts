import {
  Selectors,
  Availability,
  Category,
  Condition,
} from '@project/database';

export default interface IParserConfig {
  retailId: number;
  baseUrl: string;
  selectors: Selectors;
  availabilities: Availability[];
  conditions: Condition[];
  categories: Category[];
}
