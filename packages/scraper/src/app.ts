import express from 'express';
import 'express-async-errors';
import db from '@project/database';
import routes from './routes';
import { logger } from './utils';
// import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';
// import redisStorage from './storage/RedisStorage';

const app: express.Application = express();
// const errorHandler: ErrorHandlerMiddleware = new ErrorHandlerMiddleware();
// redisStorage.connect();

(async function testDb() {
  try {
    logger.info('Testing database connection...');
    await db.testConnection();
    logger.info('Database is connected');
  } catch (e) {
    logger.error(e);
  }
})();

app.use(express.json());
app.use('/api', routes);
// app.use(errorHandler.handleErrors);

export default app;
