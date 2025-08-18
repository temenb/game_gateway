import {Request, Response} from "express";
import {logger} from '../utils/logger';
import {authClient} from '../grpc/clients/auth.client';
import {asteroidClient} from '../grpc/clients/asteroid.client';
import {shipClient} from '../grpc/clients/ship.client';
import {profileClient} from '../grpc/clients/profile.client';

const startedAt = Date.now();

export const health = async (req: Request, res: Response) => {
  const authOk = await checkGrpcHealth(authClient);
  const profileOk = await checkGrpcHealth(profileClient);
  const asteroidOk = await checkGrpcHealth(asteroidClient);
  const shipOk = await checkGrpcHealth(shipClient);
  res.status(200).send({
    healthy: authOk && profileOk && asteroidOk && shipOk,
    map: {
      auth: authOk ? 'ok' : 'fail',
      profile: profileOk ? 'ok' : 'fail',
      asteroid: asteroidOk ? 'ok' : 'fail',
      ship: shipOk ? 'ok' : 'fail',
    }
  });
}

const checkGrpcHealth = (client: any): Promise<boolean> => {
  return new Promise((resolve) => {
    client.health({}, (err: any, res: { healthy?: boolean }) => {
      resolve(!err && res?.healthy === true);
    });
  });
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
    const grpcOk = await checkGrpcHealth(authClient); // ping gRPC-сервисы
    if (!grpcOk) throw new Error('gRPC unhealthy');

    res.status(200).send({live: true});
  } catch (err) {
    logger?.error('Livez check failed', err);
    res.status(500).send('Unhealthy');
  }
};

export const readyz = async (_req: Request, res: Response) => {
  try {
    const grpcOk = await checkGrpcHealth(authClient);
    if (!grpcOk) throw new Error('gRPC not ready');

    res.status(200).send({ready: true});
  } catch (err) {
    logger?.error('Readyz check failed', err);
    res.status(503).send('Not Ready');
  }
};

