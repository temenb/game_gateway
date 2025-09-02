import {logger} from '@shared/logger';
import * as profileClient from '../grpc/clients/profile.client';
import * as engineClient from '../grpc/clients/engine.client';
import * as authClient from '../grpc/clients/auth.client';

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

export const health = async (full: boolean) => {

  const reports = await getServicesHealth();

  const result: {
    healthy: boolean;
    map?: typeof reports;
  } = {
    healthy: Object.values(reports).every(r => r?.healthy === true),
  };

  if (full) {
    result.map = reports;
  }

  return result;
}

export const status = async () => {
  return {
    name: 'gateway',
    version: process.env.BUILD_VERSION || 'dev',
    env: process.env.NODE_ENV || 'development',
    uptime: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  };
};

export const livez = async () => {
  try {
    const grpcOk = Object.values(await getServicesHealth()).every(r => r?.healthy === true);
    if (!grpcOk) throw new Error('gRPC unhealthy');

    return {ready: grpcOk};
  } catch (err) {
    logger?.error('Livez check failed', err);
    return {ready: false};
  }
};

export const readyz = async () => {
  try {
    const grpcOk = Object.values(await getServicesHealth()).every(r => r?.healthy === true);
    if (!grpcOk) throw new Error('gRPC not ready');

    return {ready: grpcOk};
  } catch (err) {
    logger?.error('Readyz check failed', err);
    return {ready: false};
  }
};

