import * as grpc from '@grpc/grpc-js';
import * as EngineGrpc from '../../generated/engine';
import * as HealthGrpc from '../../generated/common/health';
import * as EmptyGrpc from '../../generated/common/empty';
import config from '../../config/config';
import { logger } from '@shared/logger';

export let engineClient = createClient();

function createClient(): EngineGrpc.EngineClient {
    return new EngineGrpc.EngineClient(config.serviceEngineUrl, grpc.credentials.createInsecure());
}

function getEngineClient(): EngineGrpc.EngineClient {
    return engineClient;
}

function reconnectClient() {
    logger.warn('🔄 Reconnecting EngineClient...');
    engineClient = createClient();
}

function isRecoverableGrpcError(err: grpc.ServiceError | null): boolean {
    return !!err && [
        grpc.status.UNAVAILABLE,
        grpc.status.DEADLINE_EXCEEDED,
        grpc.status.INTERNAL,
    ].includes(err.code);
}

function wrapGrpcCall<T>(fn: (client: EngineGrpc.EngineClient, cb: (err: grpc.ServiceError | null, res?: T) => void) => void): Promise<T> {
    return new Promise((resolve, reject) => {
        fn(getEngineClient(), (err, res) => {
            if (isRecoverableGrpcError(err)) {
                logger.info('[grcp ]reconnecting]');
                reconnectClient();
                return fn(getEngineClient(), (retryErr, retryRes) => {
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

export const health = (): Promise<HealthGrpc.HealthReport> => {
    const grpcRequest: EmptyGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.health(grpcRequest, cb));
};

export const status = (): Promise<HealthGrpc.StatusInfo> => {
    const grpcRequest: EmptyGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.status(grpcRequest, cb));
};

export const livez = (): Promise<HealthGrpc.LiveStatus> => {
    const grpcRequest: EmptyGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.livez(grpcRequest, cb));
};

export const readyz = (): Promise<HealthGrpc.ReadyStatus> => {
    const grpcRequest: EmptyGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.readyz(grpcRequest, cb));
};

