import { Router } from 'express';
import * as authService from '../services/auth.service';

const router = Router();

router.get('/health', authService.health);
router.get('/status', authService.status);
router.get('/livez', authService.livez);
router.get('/readyz', authService.readyz);

export default router;

