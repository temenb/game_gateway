import * as grpc from '@grpc/grpc-js';
import * as EngineGrpc from '../../generated/engine';
import config from '../../config/config';
import { logger } from '@shared/logger';

export const engineClient = new EngineGrpc.EngineClient(
    config.serviceEngineUrl!,
    grpc.credentials.createInsecure()
);

export const health = (): Promise<EngineGrpc.HealthReport> => {

    const grpcRequest: EngineGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        engineClient.health(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: EngineGrpc.HealthReport) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const status = (): Promise<EngineGrpc.StatusInfo> => {

    const grpcRequest: EngineGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        engineClient.status(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: EngineGrpc.StatusInfo) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const livez = (): Promise<EngineGrpc.LiveStatus> => {

    const grpcRequest: EngineGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        engineClient.livez(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: EngineGrpc.LiveStatus) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const readyz = (): Promise<EngineGrpc.ReadyStatus> => {

    const grpcRequest: EngineGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        engineClient.readyz(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: EngineGrpc.ReadyStatus) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};
