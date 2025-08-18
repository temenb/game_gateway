import * as grpc from '@grpc/grpc-js';
import * as ProfileGrpc from '../../generated/profile';
import config from '../../config/config';
import { logger } from '../../utils/logger';

export const profileClient = new ProfileGrpc.ProfileClient(
    config.profileServiceUrl!,
    grpc.credentials.createInsecure()
);

export const health = () => {

    const grpcRequest: ProfileGrpc.Empty = { };

    profileClient.health(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.HealthReport) => {
        if (err || !grpcResponse) {
            logger.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const status = () => {

    const grpcRequest: ProfileGrpc.Empty = { };

    profileClient.status(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.StatusInfo) => {
        if (err || !grpcResponse) {
            logger.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const livez = () => {

    const grpcRequest: ProfileGrpc.Empty = { };

    profileClient.livez(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.LiveStatus) => {
        if (err || !grpcResponse) {
            logger.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const readyz = () => {

    const grpcRequest: ProfileGrpc.Empty = { };

    profileClient.readyz(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ProfileGrpc.ReadyStatus) => {
        if (err || !grpcResponse) {
            logger.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

