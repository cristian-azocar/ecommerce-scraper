import { Retail } from '@project/database';
import config from '../config/appConfig';
import ZmartParser from '../parsers/ZmartParser';
import { IParserConfig } from '../types';
import Scraper from './Scraper';

export default class ScraperFactory {
  static getScraper(retail: Retail): Scraper {
    const { id, slug, baseUrl, selectors, httpMethod, pagination } = retail;
    const { availabilities, conditions, categories } = config;
    const parserConfig: IParserConfig = {
      retailId: id,
      baseUrl,
      selectors,
      availabilities,
      conditions,
      categories,
    };

    switch (slug) {
      case 'zmart':
        return new Scraper({
          url: '',
          parser: new ZmartParser(parserConfig),
          httpMethod,
          pagination,
        });
      default:
        throw new Error(`Retail "${retail.name}" has no scraper implemented`);
    }
  }
}
