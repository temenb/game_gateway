import * as grpc from '@grpc/grpc-js';
import * as AsteroidGrpc from '../../generated/asteroid';
import config from '../../config/config';
import { logger } from '../../utils/logger';


logger.log(config.asteroidServiceUrl);
export const asteroidClient = new AsteroidGrpc.AsteroidClient(
    config.asteroidServiceUrl,
    grpc.credentials.createInsecure()
);

export const health = (): Promise<AsteroidGrpc.HealthReport> => {

    const grpcRequest: AsteroidGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        asteroidClient.health(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.HealthReport) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const status = (): Promise<AsteroidGrpc.StatusInfo> => {

    const grpcRequest: AsteroidGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        asteroidClient.status(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.StatusInfo) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const livez = (): Promise<AsteroidGrpc.LiveStatus> => {

    const grpcRequest: AsteroidGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        asteroidClient.livez(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.LiveStatus) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const readyz = (): Promise<AsteroidGrpc.ReadyStatus> => {

    const grpcRequest: AsteroidGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        asteroidClient.readyz(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.ReadyStatus) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

