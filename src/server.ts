import app from './app';
import config from './config/app-config';
import logger from './utils/logger';

app.listen(config.port, (): void => {
  logger.info(`Server running on port ${config.port}`);
});
