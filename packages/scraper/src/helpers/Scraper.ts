/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import axios, { AxiosRequestConfig } from 'axios';
import { Product } from '@project/database';
import { IScraperConfig, IParseResult } from '../types';
import logger from '../utils/logger';

const axiosConfig: AxiosRequestConfig = { responseType: 'arraybuffer' };
const defaultMaxRetries = 3;

export default class Scraper {
  config: IScraperConfig;

  constructor(config: IScraperConfig) {
    this.config = config;
  }

  // TODO: move the "pagination" as an option, because at some point we may need to scrape only a single page
  // TODO: invoke an event called "onPageScraped" to send data as soon as the page is scraped
  async scrape(): Promise<Product[]> {
    const { parser } = this.config;
    const products: Product[] = [];
    const url: URL = new URL(this.config.url);

    let page = 1;
    let result: IParseResult;
    let fullUrl: string = this.buildUrlWithPage(url, page);

    do {
      logger.info(`Scraping ${fullUrl}`);
      const html: string = await this.tryFetchUrl(fullUrl);

      result = parser.parse(html, fullUrl);

      products.push(...result.products);
      fullUrl = this.buildUrlWithPage(url, ++page);
    } while (result.morePages);

    return products;
  }

  private async tryFetchUrl(url: string): Promise<string> {
    const { httpMethod, maxRetries = defaultMaxRetries } = this.config;
    let retries = 0;

    while (retries++ < maxRetries) {
      try {
        const { data } = await axios[httpMethod](url, null, axiosConfig);
        return data.toString('latin1');
      } catch (e) {
        logger.error(e);
        logger.warn('An error ocurred while fetching the URL. Retrying...');
      }
    }

    throw new Error(`Could not fetch the URL after ${retries} attempts`);
  }

  private buildUrlWithPage(url: URL, page: number): string {
    url.searchParams.set(this.config.pagination.queryString, page.toString());
    return url.href;
  }
}
