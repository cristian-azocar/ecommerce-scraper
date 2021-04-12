import config from 'src/config/app-config';
import ZmartParser from 'src/parsers/ZmartParser';
import { IParserConfig, IWebsite } from 'src/types/interfaces';
import Scraper from './Scraper';

export default class ScraperFactory {
  static getScraper(website: IWebsite): Scraper {
    const { name, id, baseUrl, selectors, httpMethod, pagination } = website;
    const { availabilities, conditions, platforms } = config;
    const scraperConfig: IParserConfig = {
      websiteId: id,
      baseUrl,
      selectors,
      availabilities,
      conditions,
      platforms,
    };

    switch (name) {
      case 'Zmart':
        return new Scraper({
          url: undefined,
          parser: new ZmartParser(scraperConfig),
          httpMethod,
          pagination,
        });
      default:
        throw new Error(`Website "${website.name}" has no scraper implemented`);
    }
  }
}
