import { Router } from 'express';
import * as profileClient from '../grpc/clients/profile.client';

const router = Router();

router.get('/health', profileClient.health);
router.get('/status', profileClient.status);
router.get('/livez', profileClient.livez);
router.get('/readyz', profileClient.readyz);

export default router;
