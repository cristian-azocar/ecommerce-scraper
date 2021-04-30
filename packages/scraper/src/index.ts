import ScraperBot from './ScraperBot';
import { logger } from './utils';

const scraperBot: ScraperBot = new ScraperBot();

(async function start() {
  try {
    logger.info('Scraping...');
    await scraperBot.scrape();
    logger.info('Scraping finished successfully');
  } catch (e) {
    logger.error(e);
  }

  process.exit();
})();
