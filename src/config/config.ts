import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    rabbitUrl: process.env.RABBIT_URL || 'amqp://localhost',
    jwtSecret: process.env.JWT_SECRET || 'secretkey'
};
