import express, { Request, Response } from 'express';
import morgan from 'morgan';
import * as authClient from './grpc/clients/auth.client';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors({
    origin: '*', // ['http://localhost:8080']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/health', (_, res) => res.send('OK'));

app.post('/auth/register', authClient.register);
app.post('/auth/login', authClient.login);
app.post('/auth/logout', authClient.logout);
app.post('/auth/refreshTokens', authClient.refreshTokens);

export default app;
