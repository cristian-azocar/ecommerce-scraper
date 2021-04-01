import axios from 'axios';
import cheerio from 'cheerio';
// import { Availability, Platform } from 'src/types/enums';
import { IProduct, IScrapeOptions } from 'src/types/interfaces';
// import puppeteer, { Browser } from 'puppeteer';
// import { extractClass, findAndExtractText } from 'src/helpers/scraperHelper';

export default class Scraper {
  async scrape(options: IScrapeOptions): Promise<IProduct[]> {
    const { scrapeUrl, parser } = options;
    // TODO: save the html on Redis for X minutes to speed up the process
    // It's unlikely that the pages will update very often
    const $ = await this.fetchHtml(scrapeUrl);

    return parser.parse($);
  }

  private async fetchHtml(url: string): Promise<cheerio.Root> {
    const { data } = await axios.get(url);

    return cheerio.load(data);
  }
}
