import ZmartParser from 'src/parsers/ZmartParser';
import { HTTPMethod } from 'src/types/enums';
import { IWebsite } from 'src/types/interfaces';
import Scraper from './Scraper';

export default class ScraperFactory {
  static getScraper(website: IWebsite): Scraper {
    const { name, id, baseUrl, selectors } = website;

    switch (name) {
      case 'Zmart':
        return new Scraper({
          url: undefined,
          parser: new ZmartParser(id, baseUrl, selectors),
          httpMethod: HTTPMethod.Post,
          pagination: { queryString: 'curPage' },
        });
      default:
        throw new Error(
          `The website ${website.name} has no scraper implemented`
        );
    }
  }
}
