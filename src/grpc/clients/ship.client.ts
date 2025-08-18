import * as grpc from '@grpc/grpc-js';
import * as ShipGrpc from '../../generated/ship';
import config from '../../config/config';
import { logger } from '../../utils/logger';

export const shipClient = new ShipGrpc.ShipClient(
    config.shipServiceUrl,
    grpc.credentials.createInsecure()
);

export const health = (): Promise<ShipGrpc.HealthReport> => {

    const grpcRequest: ShipGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        shipClient.health(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ShipGrpc.HealthReport) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const status = (): Promise<ShipGrpc.StatusInfo> => {

    const grpcRequest: ShipGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        shipClient.status(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ShipGrpc.StatusInfo) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const livez = (): Promise<ShipGrpc.LiveStatus> => {

    const grpcRequest: ShipGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        shipClient.livez(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ShipGrpc.LiveStatus) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const readyz = (): Promise<ShipGrpc.ReadyStatus> => {

    const grpcRequest: ShipGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        shipClient.readyz(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ShipGrpc.ReadyStatus) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};
