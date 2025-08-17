import { Router } from 'express';
import * as healthService from '../services/health.service';

const router = Router();

router.get('/health', healthService.health);
router.get('/status', healthService.status);
router.get('/livez', healthService.livez);
router.get('/readyz', healthService.readyz);

export default router;
