import { Router } from 'express';
import * as shipService from '../services/ship.service';

const router = Router();

router.get('/health', shipService.health);
router.get('/status', shipService.status);
router.get('/livez', shipService.livez);
router.get('/readyz', shipService.readyz);

export default router;
