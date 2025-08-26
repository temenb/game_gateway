import * as grpc from '@grpc/grpc-js';
import * as AsteroidGrpc from '../../generated/asteroid';
import config from '../../config/config';
import { logger } from '@shared/logger';

export let asteroidClient = createClient();

function createClient(): AsteroidGrpc.AsteroidClient {
    return new AsteroidGrpc.AsteroidClient(config.serviceAsteroidUrl, grpc.credentials.createInsecure());
}

function getAsteroidClient(): AsteroidGrpc.AsteroidClient {
    return asteroidClient;
}

function reconnectClient() {
    logger.warn('🔄 Reconnecting AsteroidClient...');
    asteroidClient = createClient();
}

function isRecoverableGrpcError(err: grpc.ServiceError | null): boolean {
    return !!err && [
        grpc.status.UNAVAILABLE,
        grpc.status.DEADLINE_EXCEEDED,
        grpc.status.INTERNAL,
    ].includes(err.code);
}

function wrapGrpcCall<T>(fn: (client: AsteroidGrpc.AsteroidClient, cb: (err: grpc.ServiceError | null, res?: T) => void) => void): Promise<T> {
    return new Promise((resolve, reject) => {
        fn(getAsteroidClient(), (err, res) => {
            if (isRecoverableGrpcError(err)) {
                logger.info('[grcp ]reconnecting]');
                reconnectClient();
                return fn(getAsteroidClient(), (retryErr, retryRes) => {
                    if (retryErr || !retryRes) {
                        logger.error('gRPC retry failed:', retryErr);
                        return reject(new Error('gRPC retry failed'));
                    }
                    resolve(retryRes);
                });
            }

            if (err || !res) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(res);
        });
    });
}

export const health = (): Promise<AsteroidGrpc.HealthReport> => {
    const grpcRequest: AsteroidGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.health(grpcRequest, cb));
};

export const status = (): Promise<AsteroidGrpc.StatusInfo> => {
    const grpcRequest: AsteroidGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.status(grpcRequest, cb));
};

export const livez = (): Promise<AsteroidGrpc.LiveStatus> => {
    const grpcRequest: AsteroidGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.livez(grpcRequest, cb));
};

export const readyz = (): Promise<AsteroidGrpc.ReadyStatus> => {
    const grpcRequest: AsteroidGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.readyz(grpcRequest, cb));
};
