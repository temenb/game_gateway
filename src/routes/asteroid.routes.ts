import { Router } from 'express';
import * as asteroidService from '../services/asteroid.service';

const router = Router();

// router.post('/list', asteroidService.list);
// router.post('/view', asteroidService.view);
// router.post('/list-galaxies', asteroidService.listGalaxies);
router.get('/health', asteroidService.health);
router.get('/status', asteroidService.status);
router.get('/livez', asteroidService.livez);
router.get('/readyz', asteroidService.readyz);


export default router;
