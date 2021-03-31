import express, { Router } from 'express';
import ScrapController from '../../controllers/ScrapController';
// import ValidatorMiddleware, {
//   RequestProperty,
// } from '../../middlewares/ValidatorMiddleware';
// import WeatherCacheMiddleware from '../../middlewares/WeatherCacheMiddleware';
// import weatherSchema from '../../schemas/weather';

const router: Router = express.Router();
const scrapController: ScrapController = new ScrapController();
// const validatorMiddleware: ValidatorMiddleware = new ValidatorMiddleware();
// const cacheMiddleware: WeatherCacheMiddleware = new WeatherCacheMiddleware();

router.get(
  '/scrap',
  // validatorMiddleware.validate(weatherSchema, RequestProperty.Query),
  // cacheMiddleware.cache,
  scrapController.scrap
);

export default router;
