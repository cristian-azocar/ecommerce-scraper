import { performance } from 'perf_hooks';
import { Request, Response } from 'express';
import { IProduct, IWebsite } from 'src/types/interfaces';
import { asyncForEachParallel } from 'src/utils';
import ScraperFactory from 'src/helpers/ScraperFactory';
import logger from 'src/utils/logger';
import productService from 'src/services/product-service';
import config from 'src/config/app-config';
import Scraper from 'src/helpers/Scraper';

export default class ScraperController {
  constructor() {
    this.scrape = this.scrape.bind(this);
  }

  async scrape(req: Request, res: Response): Promise<void> {
    // TODO: should we use Redis for something?
    // TODO: scrape all catalogs ("Próximamente", "Usados", etc)
    const websites = config.websites.filter((website) => website.isEnabled);

    await asyncForEachParallel(websites, async (website: IWebsite) => {
      const scraper: Scraper = ScraperFactory.getScraper(website);
      logger.info(`Scraping website ${website.name}`);

      await asyncForEachParallel(website.urls, async (url: string) => {
        scraper.config.url = url;

        const t0: number = performance.now();
        const products: IProduct[] = await scraper.scrape();
        const t1: number = performance.now();

        this.saveToDatabase(products);
        logger.info(`Scraping finished in ${t1 - t0} milliseconds`);
      });
    });

    res.json({ message: 'Scraping finished successfully' });
  }

  private async saveToDatabase(products: IProduct[]): Promise<void> {
    logger.info(`Saving ${products.length} products into database...`);
    await productService.createOrUpdate(products);
    logger.info('Products saved successfully');
  }
}
