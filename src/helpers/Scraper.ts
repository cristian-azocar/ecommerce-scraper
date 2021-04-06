/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { HTTPMethod } from 'src/types/enums';
import {
  IScraperConfig,
  IScrapeOptions,
  IScrapeResult,
  IProduct,
} from 'src/types/interfaces';
import logger from 'src/utils/logger';

export default class Scraper {
  config: IScraperConfig;

  constructor(config: IScraperConfig) {
    this.config = config;
  }

  // TODO: save the html on Redis for X minutes to speed up the process
  // It's unlikely that the pages will update very often
  async scrape(options?: IScrapeOptions): Promise<IProduct[]> {
    const {
      url,
      parser,
      queryString,
      httpMethod = HTTPMethod.Get,
    } = this.config;
    const { pagination } = options;

    let page = 1;
    let result: IScrapeResult;
    let qs = `${queryString}&${pagination.queryString}=${page}`;
    const products: IProduct[] = [];

    do {
      logger.info(`Scraping ${url}?${qs}`);

      const { data } = await axios[httpMethod](url, qs);
      result = parser.parse(data);

      products.push(...result.products);
      qs = `${queryString}&${pagination.queryString}=${++page}`;
    } while (result.morePages);

    return products;
  }
}
