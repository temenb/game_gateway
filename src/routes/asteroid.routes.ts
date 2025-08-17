import { Router } from 'express';
import * as asteroidClient from '../grpc/clients/asteroid.client';

const router = Router();

router.post('/list', asteroidClient.list);
// router.post('/view', asteroidClient.view);
router.post('/list-galaxies', asteroidClient.listGalaxies);
router.get('/health', asteroidClient.health);
router.get('/status', asteroidClient.status);
router.get('/livez', asteroidClient.livez);
router.get('/readyz', asteroidClient.readyz);


export default router;
