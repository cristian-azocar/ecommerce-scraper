import main from './main';
import { logger } from './utils';

(async function start() {
  let exitCode = 0;

  try {
    logger.info('Scraping...');
    await main();
    logger.info('Scraping finished successfully');
  } catch (e) {
    logger.error(e);
    exitCode = 1;
  }

  process.exit(exitCode);
})();
