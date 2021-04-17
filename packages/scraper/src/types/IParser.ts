import IParseResult from './IParseResult';

export default interface IParser {
  parse(html: string, url: string): IParseResult;
}
