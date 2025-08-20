import * as grpc from '@grpc/grpc-js';
import * as ProfileGrpc from '../../generated/profile';
import config from '../../config/config';
import { logger } from '../../utils/logger';

export const profileClient = new ProfileGrpc.ProfileClient(
    config.profileServiceUrl!,
    grpc.credentials.createInsecure()
);

export const getProfile = (ownerId: string): Promise<ProfileGrpc.ViewRequest> => {
    const grpcRequest: ProfileGrpc.ViewRequest = { ownerId };

    return new Promise((resolve, reject) => {
        profileClient.view(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.ProfileResponse) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const health = (): Promise<ProfileGrpc.HealthReport> => {

    const grpcRequest: ProfileGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        profileClient.health(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.HealthReport) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const status = (): Promise<ProfileGrpc.StatusInfo> => {

    const grpcRequest: ProfileGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        profileClient.status(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.StatusInfo) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const livez = (): Promise<ProfileGrpc.LiveStatus> => {

    const grpcRequest: ProfileGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        profileClient.livez(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.LiveStatus) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};

export const readyz = (): Promise<ProfileGrpc.ReadyStatus> => {

    const grpcRequest: ProfileGrpc.Empty = {};

    return new Promise((resolve, reject) => {
        profileClient.readyz(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.ReadyStatus) => {
            if (err || !grpcResponse) {
                logger.error('gRPC error:', err);
                return reject(new Error('Internal gRPC error'));
            }

            resolve(grpcResponse);
        });
    });
};
