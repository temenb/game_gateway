import * as grpc from '@grpc/grpc-js';
import * as ProfileGrpc from '../../generated/profile';
import config from '../../config/config';
import { logger } from '@shared/logger';

export let profileClient = createClient();

function createClient(): ProfileGrpc.ProfileClient {
    return new ProfileGrpc.ProfileClient(config.serviceProfileUrl, grpc.credentials.createInsecure());
}

function getProfileClient(): ProfileGrpc.ProfileClient {
    return profileClient;
}

function reconnectClient() {
    logger.warn('🔄 Reconnecting ProfileClient...');
    profileClient = createClient();
}

function isRecoverableGrpcError(err: grpc.ServiceError | null): boolean {
    return !!err && [
        grpc.status.UNAVAILABLE,
        grpc.status.DEADLINE_EXCEEDED,
        grpc.status.INTERNAL,
    ].includes(err.code);
}

function wrapGrpcCall<T>(fn: (client: ProfileGrpc.ProfileClient, cb: (err: grpc.ServiceError | null, res?: T) => void) => void): Promise<T> {
    return new Promise((resolve, reject) => {
        fn(getProfileClient(), (err, res) => {
            if (isRecoverableGrpcError(err)) {
                logger.info('[grcp ]reconnecting]');
                reconnectClient();
                return fn(getProfileClient(), (retryErr, retryRes) => {
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

export const health = (): Promise<ProfileGrpc.HealthReport> => {
    const grpcRequest: ProfileGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.health(grpcRequest, cb));
};

export const status = (): Promise<ProfileGrpc.StatusInfo> => {
    const grpcRequest: ProfileGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.status(grpcRequest, cb));
};

export const livez = (): Promise<ProfileGrpc.LiveStatus> => {
    const grpcRequest: ProfileGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.livez(grpcRequest, cb));
};

export const readyz = (): Promise<ProfileGrpc.ReadyStatus> => {
    const grpcRequest: ProfileGrpc.Empty = {};
    return wrapGrpcCall((client, cb) => client.readyz(grpcRequest, cb));
};

export const getProfile = (ownerId: string): Promise<ProfileGrpc.ViewRequest> => {
    const grpcRequest: ProfileGrpc.ViewRequest = { ownerId };
    return wrapGrpcCall((client, cb) => client.view(grpcRequest, cb));
};
