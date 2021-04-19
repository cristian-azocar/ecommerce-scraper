import { performance } from 'perf_hooks';
import { Request, Response } from 'express';
import { Product, Retail, productService } from '@project/database';
import { asyncForEachParallel, logger } from '../utils';
import { Scraper, ScraperFactory } from '../helpers';
import config from '../config/appConfig';

export default class ScraperController {
  constructor() {
    this.scrape = this.scrape.bind(this);
  }

  async scrape(req: Request, res: Response): Promise<void> {
    // TODO: should we use Redis for something?
    const retails = config.retails.filter((retail) => retail.isActive);

    if (!retails.length) {
      logger.info('No retail is enabled. Will not scrape.');
      res.json({ message: 'No retail is enabled' });
      return;
    }

    await asyncForEachParallel(retails, async (retail: Retail) => {
      const scraper: Scraper = ScraperFactory.getScraper(retail);
      logger.info(`Scraping retail "${retail.name}"`);

      await asyncForEachParallel(retail.urls, async (url: string) => {
        scraper.config.url = url;

        const t0: number = performance.now();
        const products: Product[] = await scraper.scrape();
        const t1: number = performance.now();

        this.saveToDatabase(products);
        logger.info(`Scraping finished in ${t1 - t0} milliseconds`);
      });
    });

    logger.info('All pages scraped successfully');
    res.json({ message: 'Scraping finished successfully' });
  }

  private async saveToDatabase(products: Product[]): Promise<void> {
    if (!products.length) {
      logger.warn('The list of products is empty');
      return;
    }

    logger.info(`Saving ${products.length} products into database...`);
    await productService.createOrUpdate(products);
    logger.info('Products saved successfully');
  }
}
