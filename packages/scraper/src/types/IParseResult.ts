import { IProduct } from '@project/database';

export default interface IParseResult {
  products: IProduct[];
  morePages: boolean;
}
