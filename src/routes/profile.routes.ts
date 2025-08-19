import { Router } from 'express';
import * as profileService from '../services/profile.service';

const router = Router();

router.get('/me', profileService.getProfile);
router.get('/health', profileService.health);
router.get('/status', profileService.status);
router.get('/livez', profileService.livez);
router.get('/readyz', profileService.readyz);

export default router;
