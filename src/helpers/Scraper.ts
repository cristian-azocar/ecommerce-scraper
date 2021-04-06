/* eslint-disable no-await-in-loop */
import axios, { AxiosResponse } from 'axios';
import { HTTPMethod } from 'src/types/enums';
import {
  IScraperConfig,
  IScrapeOptions,
  IScrapeResult,
} from 'src/types/interfaces';

export default class Scraper {
  private config: IScraperConfig;

  constructor(config: IScraperConfig) {
    this.config = config;
  }

  // TODO: save the html on Redis for X minutes to speed up the process
  // It's unlikely that the pages will update very often
  async scrape(options?: IScrapeOptions): Promise<IScrapeResult> {
    const { url, parser, httpMethod = HTTPMethod.Get } = this.config;
    const { data } = options;

    console.log(`Scraping ${url}?${data}`);

    const response: AxiosResponse = await axios[httpMethod](url, data);
    const result: IScrapeResult = parser.parse(response.data);

    return result;
  }
}
