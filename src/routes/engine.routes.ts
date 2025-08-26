import { Router } from 'express';
import * as engineService from '../services/engine.service';

const router = Router();

// router.post('/list', shipService.List);
// router.post('/attack-asteroid', shipService.AttackAsteroid);
router.get('/health', engineService.health);
router.get('/status', engineService.status);
router.get('/livez', engineService.livez);
router.get('/readyz', engineService.readyz);

export default router;
