import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as authClient from './grpc/clients/auth.client';
import * as profileClient from './grpc/clients/profile.client';
import * as shipClient from './grpc/clients/ship.client';
import * as asteroidClient from "./grpc/clients/asteroid.client";

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
app.post('/auth/refresh-tokens', authClient.refreshTokens);
app.post('/auth/forgot-password', authClient.forgotPassword);
app.post('/auth/reset-password', authClient.resetPassword);

app.post('/asteroid/list', asteroidClient.list);
// app.post('/asteroid/view', asteroidClient.view);
app.post('/asteroid/list-galaxies', asteroidClient.listGalaxies);
// app.post('/ship/list', shipClient.List);
// app.post('/ship/attack-asteroid', shipClient.AttackAsteroid);

export default app;
