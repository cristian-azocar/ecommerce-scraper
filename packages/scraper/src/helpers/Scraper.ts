/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import axios, { AxiosRequestConfig } from 'axios';
import { Product } from '@project/database';
import { IScraperConfig, IParseResult } from '../types';
import logger from '../utils/logger';

const axiosConfig: AxiosRequestConfig = { responseType: 'arraybuffer' };

export default class Scraper {
  config: IScraperConfig;

  constructor(config: IScraperConfig) {
    this.config = config;
  }

  // TODO: move the "pagination" as an option, because at some point we may need to scrape only a single page
  // TODO: invoke an event called "onPageScraped" to send data as soon as the page is scraped
  // TODO: implement a retry logic if an error occurs
  async scrape(): Promise<Product[]> {
    const { parser, httpMethod } = this.config;
    const products: Product[] = [];
    const url: URL = new URL(this.config.url);

    let page = 1;
    let result: IParseResult;
    let fullUrl: string = this.buildUrlWithPage(url, page);

    do {
      logger.info(`Scraping ${fullUrl}`);

      const { data } = await axios[httpMethod](fullUrl, null, axiosConfig);
      const html: string = data.toString('latin1');

      result = parser.parse(html, fullUrl);

      products.push(...result.products);
      fullUrl = this.buildUrlWithPage(url, ++page);
    } while (result.morePages);

    return products;
  }

  private buildUrlWithPage(url: URL, page: number): string {
    url.searchParams.set(this.config.pagination.queryString, page.toString());
    return url.href;
  }
}
