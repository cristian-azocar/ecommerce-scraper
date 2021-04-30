import { performance } from 'perf_hooks';
import db, { Product, Retail } from '@project/database';
import { asyncForEachParallel, logger } from './utils';
import { Scraper, ScraperFactory } from './helpers';
import config from './config/appConfig';

export default class ScraperBot {
  async scrape(): Promise<void> {
    await this.loadConfigFromDatabase();

    const retails = config.retails.filter((retail) => retail.isActive);

    if (!retails.length) {
      logger.warn('No retail is enabled. Will not scrape.');
      return;
    }

    await asyncForEachParallel(retails, async (retail: Retail) => {
      const scraper: Scraper = ScraperFactory.getScraper(retail);
      logger.info(`Scraping retail "${retail.name}"`);

      await asyncForEachParallel(retail.urls, async (url: string) => {
        try {
          scraper.config.url = url;

          const t0: number = performance.now();
          const products: Product[] = await scraper.scrape();
          const t1: number = performance.now();

          this.saveProductsToDatabase(products);
          logger.info(`Scraping finished in ${t1 - t0} milliseconds`);
        } catch (e) {
          logger.error(e);
        }
      });
    });
  }

  private async loadConfigFromDatabase(): Promise<void> {
    logger.info('Loading configuration from database...');

    // TODO: read once instead of executing multiple queries
    config.retails = await db.retail.findAll();
    config.availabilities = await db.availability.findAll();
    config.conditions = await db.condition.findAll();
    config.categories = await db.category.findAll();

    logger.info('Configuration loaded successfully');
  }

  private async saveProductsToDatabase(products: Product[]): Promise<void> {
    if (!products.length) {
      logger.warn('The list of products is empty');
      return;
    }

    logger.info(`Saving ${products.length} products into database...`);
    await db.product.createOrUpdate(products);
    logger.info('Products saved successfully');
  }
}
