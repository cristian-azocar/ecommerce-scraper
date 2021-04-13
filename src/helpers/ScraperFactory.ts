import config from 'src/config/appConfig';
import ZmartParser from 'src/parsers/ZmartParser';
import { IParserConfig } from 'src/types/interfaces';
import IRetail from 'src/models/IRetail';
import Scraper from './Scraper';

export default class ScraperFactory {
  static getScraper(retail: IRetail): Scraper {
    const { name, id, baseUrl, selectors, httpMethod, pagination } = retail;
    const { availabilities, conditions, platforms } = config;
    const scraperConfig: IParserConfig = {
      retailId: id,
      baseUrl,
      selectors,
      availabilities,
      conditions,
      platforms,
    };

    switch (name) {
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
