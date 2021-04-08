import express from 'express';
import 'express-async-errors';
import cors, { CorsOptions } from 'cors';
import routes from './routes';
import productService from './services/product-service';
// import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';
// import redisStorage from './storage/RedisStorage';

const app: express.Application = express();
// const errorHandler: ErrorHandlerMiddleware = new ErrorHandlerMiddleware();

// redisStorage.connect();
(async function test() {
  const product = await productService.findOne();
  console.log('Product:', product);

  // const products = await productService.find();
  // console.log('Product:', products[0]);
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
