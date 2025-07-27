import dotenv from 'dotenv';

dotenv.config();

export const serviceRoutes = [
    { path: '/auth/', target: process.env.AUTH_SERVICE_URL || 'http://auth:3000' },
    { path: '/profile/', target: process.env.PROFILE_SERVICE_URL || 'http://profile:3000' },
    { path: '/test/', target: process.env.TEST_SERVICE_URL || 'http://test:3000' },
];
