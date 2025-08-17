import { Router } from 'express';
import * as authClient from '../grpc/clients/auth.client';

const router = Router();

router.post('/register', authClient.register);
router.post('/login', authClient.login);
router.post('/logout', authClient.logout);
router.post('/refresh-tokens', authClient.refreshTokens);
router.post('/forgot-password', authClient.forgotPassword);
router.post('/reset-password', authClient.resetPassword);

router.get('/health', authClient.health);
router.get('/status', authClient.status);
router.get('/livez', authClient.livez);
router.get('/readyz', authClient.readyz);

export default router;

