import { performance } from 'perf_hooks';
import { Request, Response } from 'express';
import { IProduct } from 'src/types/interfaces';
import { Website } from 'src/types/enums';
import ScraperFactory from 'src/helpers/ScraperFactory';
import logger from 'src/utils/logger';
import { asyncForEachParallel } from 'src/utils';
// import PaginationBuilder from 'src/helpers/PaginationBuilder';

const websites: Website[] = [Website.Zmart];
export default class ScraperController {
  constructor() {
    this.scrape = this.scrape.bind(this);
  }

  async scrape(req: Request, res: Response): Promise<void> {
    // const url = `${baseUrl}/Scripts/prodSearch.asp?strSearch=${name}&chkOptionSearch=${platform}`;
    // TODO: should we use Redis for something?
    // TODO: scrape all catalogs ("Próximamente", "Usados", etc)
    const allProducts: IProduct[] = [];
    const urls: string[] = [
      'https://www.zmart.cl/scripts/proddisplay_page.asp?id=321&idRowVar=32641&idRow=2997',
      'https://www.zmart.cl/scripts/proddisplay_page.asp?id=361&idRowVar=34809&idRow=3155',
    ];

    // Scrape all the websites
    await asyncForEachParallel(websites, async (website: Website) => {
      const scraper = ScraperFactory.getScraper(website);
      logger.info(`Scraping website ${website}`);

      // Scrape all the URLs
      await asyncForEachParallel(urls, async (url: string) => {
        scraper.config.url = url;

        const t0: number = performance.now();
        const products: IProduct[] = await scraper.scrape();
        const t1: number = performance.now();

        logger.info(`Scraping finished in ${t1 - t0} milliseconds`);
        allProducts.push(...products);
      });
    });
    // const paginationBuilder = new PaginationBuilder(Website.Zmart);

    res.json(allProducts);
  }
}
