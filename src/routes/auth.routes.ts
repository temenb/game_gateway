import { Router } from 'express';
import * as authService from '../services/auth.service';

const router = Router();

router.post('/register', authService.register);
router.post('/login', authService.login);
router.post('/logout', authService.logout);
router.post('/refresh-tokens', authService.refreshTokens);
router.post('/forgot-password', authService.forgotPassword);
router.post('/reset-password', authService.resetPassword);

router.get('/health', authService.health);
router.get('/status', authService.status);
router.get('/livez', authService.livez);
router.get('/readyz', authService.readyz);

export default router;

