import ScrapingBot from './ScrapingBot';
import { logger } from './utils';

(async function start() {
  const scrapingBot: ScrapingBot = new ScrapingBot();

  try {
    logger.info('Scraping...');
    await scrapingBot.run();
    logger.info('Scraping finished successfully');
  } catch (e) {
    logger.error(e);
  }

  process.exit();
})();
