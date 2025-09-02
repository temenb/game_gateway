import {Request, Response} from "express";
import {logger} from '@shared/logger';
import * as authClient from '../grpc/clients/auth.client';
import * as asteroidClient from '../grpc/clients/asteroid.client';
import * as shipClient from '../grpc/clients/ship.client';
import * as profileClient from '../grpc/clients/profile.client';
import * as engineClient from '../grpc/clients/engine.client';

const startedAt = Date.now();

async function getServicesHealth() {
  const [
    auth,
    profile,
    engine,
    // asteroid,
    // ship,
  ] = await Promise.all([
    authClient.health(),
    profileClient.health(),
    engineClient.health(),
    // asteroidClient.health(),
    // shipClient.health(),
  ]);

  return {
    auth,
    profile,
    engine,
    // asteroid,
    // ship,
  };
}

export const health = async (req: Request, res: Response) => {
  const full = req.query.full;

  const reports = await getServicesHealth();;

  const result: {
    healthy: boolean;
    map?: typeof reports;
  } = {
    healthy: Object.values(reports).every(r => r?.healthy === true),
  };

  if (full) {
    result.map = reports;
  }
  res.status(200).send(result);
}

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
    const grpcOk = Object.values(await getServicesHealth()).every(r => r?.healthy === true);
    if (!grpcOk) throw new Error('gRPC unhealthy');

    res.status(200).send({live: true});
  } catch (err) {
    logger?.error('Livez check failed', err);
    res.status(500).send('Unhealthy');
  }
};

export const readyz = async (_req: Request, res: Response) => {
  try {
    const grpcOk = Object.values(await getServicesHealth()).every(r => r?.healthy === true);
    if (!grpcOk) throw new Error('gRPC not ready');

    res.status(200).send({ready: true});
  } catch (err) {
    logger?.error('Readyz check failed', err);
    res.status(503).send('Not Ready');
  }
};

