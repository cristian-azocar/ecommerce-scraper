import { performance } from 'perf_hooks';
import { Request, Response } from 'express';
import {
  Product,
  Retail,
  productService,
  retailService,
  availabilityService,
  conditionService,
  categoryService,
} from '@project/database';
import { asyncForEachParallel, logger } from '../utils';
import { Scraper, ScraperFactory } from '../helpers';
import config from '../config/appConfig';

export default class ScraperController {
  constructor() {
    this.scrape = this.scrape.bind(this);
  }

  // TODO: should we use Redis for something?
  async scrape(req: Request, res: Response): Promise<void> {
    await this.loadConfigFromDatabase();

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

  async loadConfigFromDatabase(): Promise<void> {
    logger.info('Loading configuration from database...');

    config.retails = await retailService.findAll();
    config.availabilities = await availabilityService.findAll();
    config.conditions = await conditionService.findAll();
    config.categories = await categoryService.findAll();

    logger.info('Configuration loaded successfully');
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
