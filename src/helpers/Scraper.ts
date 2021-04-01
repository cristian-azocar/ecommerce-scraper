import axios from 'axios';
import { IProduct, IScrapeOptions } from 'src/types/interfaces';

export default class Scraper {
  async scrape(options: IScrapeOptions): Promise<IProduct[]> {
    const { scrapeUrl, parser } = options;
    // TODO: save the html on Redis for X minutes to speed up the process
    // It's unlikely that the pages will update very often
    const { data } = await axios.get(scrapeUrl);

    return parser.parse(data);
  }
}
