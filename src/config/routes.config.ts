import dotenv from 'dotenv';

dotenv.config();

export const serviceRoutes = [
    { path: '/auth/', target: process.env.AUTH_SERVICE || 'auth:3000' },
    { path: '/profile/', target: process.env.PROFILE_SERVICE || 'profile:3000' },
    // { path: '/test/', target: process.env.TEST_SERVICE || 'test:3000' },
];
