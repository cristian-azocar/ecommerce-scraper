import scraperInstances from 'src/configs/scraper-instances';
import { Website } from 'src/types/enums';
import Scraper from './Scraper';

export default class ScraperFactory {
  static getScraper(website: Website): Scraper {
    if (website in scraperInstances) {
      return scraperInstances[website];
    }

    throw new Error(`The website ${website} has no scraper implemented`);
  }
}
