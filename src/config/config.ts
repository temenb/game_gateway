import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://auth:3000',
    profileServiceUrl: process.env.PROFILE_SERVICE_URL || 'http://profile:3000',
    rabbitHost: process.env.RABBIT_HOST || 'rabbit',
    rabbitUser: process.env.RABBIT_USER || 'user',
    rabbitPass: process.env.RABBIT_PASS || 'password',
    jwtSecret: process.env.JWT_SECRET || 'secretkey'
};
