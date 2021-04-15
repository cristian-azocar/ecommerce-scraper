import express, { Router } from 'express';
import ScraperController from '../../controllers/ScraperController';
// import ValidatorMiddleware, {
//   RequestProperty,
// } from '../../middlewares/ValidatorMiddleware';
// import WeatherCacheMiddleware from '../../middlewares/WeatherCacheMiddleware';
// import weatherSchema from '../../schemas/weather';

const router: Router = express.Router();
const scraperController: ScraperController = new ScraperController();
// const validatorMiddleware: ValidatorMiddleware = new ValidatorMiddleware();
// const cacheMiddleware: WeatherCacheMiddleware = new WeatherCacheMiddleware();

router.get(
  '/scrape',
  // validatorMiddleware.validate(weatherSchema, RequestProperty.Query),
  // cacheMiddleware.cache,
  scraperController.scrape
);

export default router;
