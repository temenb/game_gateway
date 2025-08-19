import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    authServiceUrl: process.env.AUTH_SERVICE_URL || 'auth:3000',
    profileServiceUrl: process.env.PROFILE_SERVICE_URL || 'profile:3000',
    shipServiceUrl: process.env.SHIP_SERVICE || 'ship:3000',
    asteroidServiceUrl: process.env.ASTEROID_SERVICE || 'asteroid:3000',
    rabbitHost: process.env.RABBIT_HOST || 'rabbit',
    rabbitUser: process.env.RABBIT_USER || 'user',
    rabbitPass: process.env.RABBIT_PASS || 'password',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "your_access_secret",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "your_refresh_secret",
    postgresUrl: process.env.POSTGRES_URL || '',
};

export default config;
