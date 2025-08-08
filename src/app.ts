import express, { Request, Response } from 'express';
import * as AuthGrpc from './generated/auth';
import * as grpc from '@grpc/grpc-js';
import morgan from 'morgan';
import { registerHandler } from './grpc/clients/auth.client';

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.post('/health', (_, res) => res.send('OK'));

app.post('/auth/register', registerHandler);

export default app;
