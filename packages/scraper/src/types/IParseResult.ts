import { Product } from '@project/database';

export default interface IParseResult {
  products: Product[];
  morePages: boolean;
}
