import { performance } from 'perf_hooks';
import { Request, Response } from 'express';
import { IProduct } from 'src/types/interfaces';
import { Website } from 'src/types/enums';
import { asyncForEachParallel } from 'src/utils';
import ScraperFactory from 'src/helpers/ScraperFactory';
import WebsiteConfigFactory from 'src/helpers/WebsiteConfigFactory';
import logger from 'src/utils/logger';

// TODO: read from a config the websites enabled to scrape
const websites: Website[] = [Website.Zmart];
export default class ScraperController {
  constructor() {
    this.scrape = this.scrape.bind(this);
  }

  async scrape(req: Request, res: Response): Promise<void> {
    // TODO: should we use Redis for something?
    // TODO: scrape all catalogs ("Próximamente", "Usados", etc)
    const allProducts: IProduct[] = [];

    await asyncForEachParallel(websites, async (website: Website) => {
      const scraper = ScraperFactory.getScraper(website);
      const websiteConfig = WebsiteConfigFactory.getConfig(website);
      logger.info(`Scraping website ${website}`);

      await asyncForEachParallel(websiteConfig.urls, async (url: string) => {
        scraper.config.url = url;

        const t0: number = performance.now();
        const products: IProduct[] = await scraper.scrape();
        const t1: number = performance.now();

        allProducts.push(...products);
        logger.info(`Scraping finished in ${t1 - t0} milliseconds`);
      });
    });

    res.json(allProducts);
  }
}
