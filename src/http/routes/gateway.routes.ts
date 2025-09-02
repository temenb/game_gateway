import {Router} from 'express';
import * as gatewayController from '../controllers/gateway.controller';

const router = Router();

router.get('/health', gatewayController.health);
router.get('/status', gatewayController.status);
router.get('/livez', gatewayController.livez);
router.get('/readyz', gatewayController.readyz);

export default router;
