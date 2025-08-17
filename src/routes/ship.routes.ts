import { Router } from 'express';
import * as shipClient from '../grpc/clients/ship.client';

const router = Router();

// router.post('/list', shipClient.List);
// router.post('/attack-asteroid', shipClient.AttackAsteroid);
router.get('/health', shipClient.health);
router.get('/status', shipClient.status);
router.get('/livez', shipClient.livez);
router.get('/readyz', shipClient.readyz);

export default router;
