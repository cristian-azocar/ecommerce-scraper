import { IRetail } from '@project/database';
import config from 'src/config/appConfig';
import ZmartParser from 'src/parsers/ZmartParser';
import { IParserConfig } from 'src/types/interfaces';
import Scraper from './Scraper';

export default class ScraperFactory {
  static getScraper(retail: IRetail): Scraper {
    const { id, slug, baseUrl, selectors, httpMethod, pagination } = retail;
    const { availabilities, conditions, categories } = config;
    const scraperConfig: IParserConfig = {
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
          url: undefined,
          parser: new ZmartParser(scraperConfig),
          httpMethod,
          pagination,
        });
      default:
        throw new Error(`Retail "${retail.name}" has no scraper implemented`);
    }
  }
}
