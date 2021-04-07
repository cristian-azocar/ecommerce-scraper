import ZmartParser from 'src/parsers/ZmartParser';
import { HTTPMethod, Website } from 'src/types/enums';
import Scraper from './Scraper';

// TODO: read the URL from a config file
// TODO: read the selectors from another file
// ProdBox146 = when searching for a specific game
// BoxProductoS2 = when browsing a catalog
const scrapers: Record<Website, Scraper> = {
  [Website.Zmart]: new Scraper({
    url: 'https://www.zmart.cl/scripts/proddisplay_page.asp',
    parser: new ZmartParser('https://www.zmart.cl'),
    httpMethod: HTTPMethod.Post,
    pagination: { queryString: 'curPage' },
  }),
};

export default class ScraperFactory {
  static getScraper(website: Website): Scraper {
    if (website in scrapers) {
      return scrapers[website];
    }

    throw new Error(`Website ${website} not implemented`);
  }
}
