import express, { Router } from 'express';
import ScrapRoute from './ScrapRoute';
// import HealthRoute from './HealthRoute';

const router: Router = express.Router();

// router.use([WeatherRoute, HealthRoute]);
router.use([ScrapRoute]);

export default router;
