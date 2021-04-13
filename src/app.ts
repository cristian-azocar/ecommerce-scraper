import express from 'express';
import 'express-async-errors';
import cors, { CorsOptions } from 'cors';
import routes from './routes';
import retailService from './services/retailService';
import config from './config/appConfig';
import platformService from './services/platform-service';
import availabilityService from './services/availability-service';
import conditionService from './services/condition-service';
import logger from './utils/logger';
// import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';
// import redisStorage from './storage/RedisStorage';

const app: express.Application = express();
// const errorHandler: ErrorHandlerMiddleware = new ErrorHandlerMiddleware();

// redisStorage.connect();
(async function loadConfigFromDatabase() {
  logger.info('Loading configuration from database...');

  config.retails = await retailService.find();
  config.platforms = await platformService.find();
  config.availabilities = await availabilityService.find();
  config.conditions = await conditionService.find();

  logger.info('Configuration loaded successfully');
})();

if (process.env.NODE_ENV === 'production') {
  const corsOptions: CorsOptions = {
    origin: 'https://cristian-azocar.github.io',
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
}

app.use(express.json());
app.use('/api', routes);
// app.use(errorHandler.handleErrors);

export default app;
