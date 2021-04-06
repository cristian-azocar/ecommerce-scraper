/* eslint-disable no-await-in-loop */
import { performance } from 'perf_hooks';
import { Request, Response } from 'express';
import { IScrapeOptions, IScrapeResult } from 'src/types/interfaces';
import { Website } from 'src/types/enums';
import { sleep } from 'src/utils';
import ScraperFactory from 'src/helpers/ScraperFactory';
import PaginationBuilder from 'src/helpers/PaginationBuilder';
import logger from 'src/utils/logger';

export default class ScraperController {
  constructor() {
    this.scrape = this.scrape.bind(this);
  }

  async scrape(req: Request, res: Response): Promise<void> {
    // const url = `${baseUrl}/Scripts/prodSearch.asp?strSearch=${name}&chkOptionSearch=${platform}`;
    // TODO: should we use Redis for something?
    // TODO: scrape each platform
    // TODO: scrape "Próximamente" catalog
    // TODO: scrape "Usados" catalog
    let page = 1;
    let result: IScrapeResult;
    const scraper = ScraperFactory.getScraper(Website.Zmart);
    const paginationBuilder = new PaginationBuilder(Website.Zmart);
    const scrapeOptions: IScrapeOptions = {
      data: paginationBuilder.build(page),
    };
    const t0: number = performance.now();

    do {
      result = await scraper.scrape(scrapeOptions);
      page += 1;
      scrapeOptions.data = paginationBuilder.build(page);

      await sleep(500);
    } while (result.morePages);

    const t1: number = performance.now();
    logger.info(`Scraping finished in ${t1 - t0} milliseconds`);

    res.json(result.products);
  }
}
