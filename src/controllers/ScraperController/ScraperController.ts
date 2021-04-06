/* eslint-disable no-await-in-loop */
import { performance } from 'perf_hooks';
import { Request, Response } from 'express';
import { IScrapeOptions, IProduct } from 'src/types/interfaces';
import { Website } from 'src/types/enums';
import ScraperFactory from 'src/helpers/ScraperFactory';
// import PaginationBuilder from 'src/helpers/PaginationBuilder';
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
    const allProducts: IProduct[] = [];
    const websiteKeys: string[] = Object.keys(Website);
    const catalogs = [
      { id: 321, idRowVar: 32641, idRow: 2997 },
      { id: 361, idRowVar: 34809, idRow: 3155 },
    ];

    // Iterate over all the websites
    for (let i = 0; i < websiteKeys.length; i++) {
      const website: Website = Website[websiteKeys[i] as keyof typeof Website];
      const scraper = ScraperFactory.getScraper(website);
      const scrapeOptions: IScrapeOptions = {
        pagination: { queryString: 'curPage' },
      };

      // Iterate over all the catalogs
      for (let j = 0; j < catalogs.length; j++) {
        const catalog = catalogs[j];
        scraper.config.queryString = `id=${catalog.id}&idRowVar=${catalog.idRowVar}&idRow=${catalog.idRow}`;

        const t0: number = performance.now();
        const products: IProduct[] = await scraper.scrape(scrapeOptions);
        const t1: number = performance.now();

        logger.info(`Scraping finished in ${t1 - t0} milliseconds`);
        allProducts.push(...products);
      }
    }
    // const paginationBuilder = new PaginationBuilder(Website.Zmart);

    res.json(allProducts);
  }
}
