/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { HTTPMethod } from 'src/types/enums';
import { IScraperConfig, IParseResult, IProduct } from 'src/types/interfaces';
import logger from 'src/utils/logger';

export default class Scraper {
  config: IScraperConfig;

  constructor(config: IScraperConfig) {
    this.config = config;
  }

  // TODO: maybe move the "pagination" as an option, because at some point we may need to scrape only a single page
  // TODO: invoke an event called "onPageScraped" to send data as soon as the page is scraped
  async scrape(): Promise<IProduct[]> {
    const { url, parser, httpMethod = HTTPMethod.Get } = this.config;
    const products: IProduct[] = [];
    const urlObj: URL = new URL(url);

    let page = 1;
    let result: IParseResult;
    let fullUrl: string = this.buildUrl(urlObj, page);

    do {
      logger.info(`Scraping ${fullUrl}`);

      const { data } = await axios[httpMethod](fullUrl);
      result = parser.parse(data);

      products.push(...result.products);
      fullUrl = this.buildUrl(urlObj, ++page);
    } while (result.morePages);

    return products;
  }

  private buildUrl(url: URL, page: number): string {
    const { pagination } = this.config;

    url.searchParams.set(pagination.queryString, page.toString());

    return url.href;
  }
}
