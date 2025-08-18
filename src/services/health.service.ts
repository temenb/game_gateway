import {Request, Response} from "express";
import { logger } from '../utils/logger';
import { authClient } from '../grpc/clients/auth.client';

const startedAt = Date.now();

export const health = async (req: Request, res: Response) => {
    res.status(200).send('OK');
};

export const status = async (_req: Request, res: Response) => {
    res.status(200).json({
        name: 'gateway',
        version: process.env.BUILD_VERSION || 'dev',
        env: process.env.NODE_ENV || 'development',
        uptime: Math.floor((Date.now() - startedAt) / 1000),
        timestamp: new Date().toISOString(),
    });
};

export const livez = async (_req: Request, res: Response) => {
    try {
        const grpcOk = await checkGrpcHealth(); // ping gRPC-сервисы
        if (!grpcOk) throw new Error('gRPC unhealthy');

        res.status(200).send('Live');
    } catch (err) {
        logger?.error('Livez check failed', err);
        res.status(500).send('Unhealthy');
    }
};

export const readyz = async (_req: Request, res: Response) => {
    try {
        const grpcOk = await checkGrpcHealth();
        if (!grpcOk) throw new Error('gRPC not ready');

        res.status(200).send('Ready');
    } catch (err) {
        logger?.error('Readyz check failed', err);
        res.status(503).send('Not Ready');
    }
};

export const checkGrpcHealth = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        authClient.health({}, (err, res) => {
            if (err || !res?.healthy) return resolve(false);
            resolve(true);
        });
    });
};
