/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import { IScrapeOptions, IScrapeResult } from 'src/types/interfaces';
import Scraper from 'src/helpers/Scraper';
import { Website } from 'src/types/enums';
import { sleep } from 'src/utils';
import ScraperFactory from 'src/helpers/ScraperFactory';
import PaginationBuilder from 'src/helpers/PaginationBuilder';
// import redisStorage from '../../storage/RedisStorage';

export default class ScraperController {
  constructor() {
    this.scrape = this.scrape.bind(this);
  }

  async scrape(req: Request, res: Response): Promise<void> {
    // const url = `${baseUrl}/Scripts/prodSearch.asp?strSearch=${name}&chkOptionSearch=${platform}`;
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

    do {
      result = await scraper.scrape(scrapeOptions);
      page += 1;
      scrapeOptions.data = paginationBuilder.build(page);

      await sleep(500);
    } while (result.morePages);

    // await redisStorage.set(`COORDINATES:${lat},${lng}`, weather);

    res.json(result.products);
  }
}
