import {
  ISelectors,
  IAvailability,
  ICategory,
  ICondition,
} from '@project/database';

export default interface IParserConfig {
  retailId: number;
  baseUrl: string;
  selectors: ISelectors;
  availabilities: IAvailability[];
  conditions: ICondition[];
  categories: ICategory[];
}
