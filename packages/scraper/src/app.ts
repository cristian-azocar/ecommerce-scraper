import express from 'express';
import 'express-async-errors';
import routes from './routes';
import retailService from './services/retailService';
import config from './config/appConfig';
import availabilityService from './services/availabilityService';
import conditionService from './services/conditionService';
import categoryService from './services/categoryService';
import logger from './utils/logger';
// import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';
// import redisStorage from './storage/RedisStorage';

const app: express.Application = express();
// const errorHandler: ErrorHandlerMiddleware = new ErrorHandlerMiddleware();

// redisStorage.connect();
(async function loadConfigFromDatabase() {
  logger.info('Loading configuration from database...');

  config.retails = await retailService.find();
  config.availabilities = await availabilityService.find();
  config.conditions = await conditionService.find();
  config.categories = await categoryService.find();

  logger.info('Configuration loaded successfully');
})();

app.use(express.json());
app.use('/api', routes);
// app.use(errorHandler.handleErrors);

export default app;
