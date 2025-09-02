import { Router } from 'express';
import * as authController from '../controllers/auth.service';

const router = Router();

router.get('/health', authController.health);
router.get('/status', authController.status);
router.get('/livez', authController.livez);
router.get('/readyz', authController.readyz);

export default router;

