import {Request, Response} from "express";
import {logger} from '@shared/logger';
import {authClient} from '../grpc/clients/auth.client';
import {asteroidClient} from '../grpc/clients/asteroid.client';
import {shipClient} from '../grpc/clients/ship.client';
import {profileClient} from '../grpc/clients/profile.client';
import {engineClient} from '../grpc/clients/engine.client';

const startedAt = Date.now();

export const health = async (req: Request, res: Response) => {
  const full = req.query.full;
  const callback = full?getGrpcReport: checkGrpcHealth;
  const authReport = await callback(authClient);
  const profileReport = await callback(profileClient);
  const asteroidReport = await callback(asteroidClient);
  const shipReport = await callback(shipClient);
  const engineReport = await callback(engineClient);
  let healthy;
  if (full) {
    healthy = authReport && authReport.healthy
      && profileReport && profileReport.healthy
      && asteroidReport && asteroidReport.healthy
      && engineReport && engineReport.healthy
      && shipReport && shipReport.healthy;
  } else {
    healthy = authReport && profileReport && asteroidReport && shipReport && engineReport;
  }
  logger.log(shipReport);
  res.status(200).send({
    healthy: healthy,
    map: {
      auth: authReport,
      profile: profileReport,
      asteroid: asteroidReport,
      ship: shipReport,
      engine: engineReport,
    }
  });
}

const getGrpcReport = (client: any): Promise<any> => {
  return new Promise((resolve) => {
    client.health({}, (err: any, res: any) => {
      console.log('gRPC callback triggered');
      console.log('err:', err);
      console.log('res:', res);
      resolve(!err && res);
    });
  });
};


const checkGrpcHealth = (client: any): Promise<boolean> => {
  return new Promise((resolve) => {
    client.health({}, (err: any, res: { healthy?: boolean }) => {
      console.log('gRPC callback triggered');
      console.log('err:', err);
      console.log('res:', res);
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

