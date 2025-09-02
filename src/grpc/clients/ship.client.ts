import * as grpc from '@grpc/grpc-js';
import * as ShipGrpc from '../../generated/ship';
import * as HealthGrpc from '../../generated/common/health';
import * as EmptyGrpc from '../../generated/common/empty';
import config from '../../config/config';
import { logger } from '@shared/logger';

export let shipClient = createClient();

function createClient(): ShipGrpc.ShipClient {
    return new ShipGrpc.ShipClient(config.serviceShipUrl, grpc.credentials.createInsecure());
}

function getShipClient(): ShipGrpc.ShipClient {
    return shipClient;
}

function reconnectClient() {
    logger.warn('🔄 Reconnecting ShipClient...');
    shipClient = createClient();
}

function isRecoverableGrpcError(err: grpc.ServiceError | null): boolean {
    return !!err && [
        grpc.status.UNAVAILABLE,
        grpc.status.DEADLINE_EXCEEDED,
        grpc.status.INTERNAL,
    ].includes(err.code);
}

function wrapGrpcCall<T>(fn: (client: ShipGrpc.ShipClient, cb: (err: grpc.ServiceError | null, res?: T) => void) => void): Promise<T> {
    return new Promise((resolve, reject) => {
        fn(getShipClient(), (err, res) => {
            if (isRecoverableGrpcError(err)) {
                logger.info('[grcp ]reconnecting]');
                reconnectClient();
                return fn(getShipClient(), (retryErr, retryRes) => {
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
