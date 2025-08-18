import * as grpc from '@grpc/grpc-js';
import * as ShipGrpc from '../../generated/ship';
import config from '../../config/config';

export const shipClient = new ShipGrpc.ShipClient(
    config.profileServiceUrl,
    grpc.credentials.createInsecure()
);

export const health = () => {

    const grpcRequest: ShipGrpc.Empty = { };

    shipClient.health(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ShipGrpc.HealthReport) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const status = () => {

    const grpcRequest: ShipGrpc.Empty = { };

    shipClient.status(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ShipGrpc.StatusInfo) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const livez = () => {

    const grpcRequest: ShipGrpc.Empty = { };

    shipClient.livez(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ShipGrpc.LiveStatus) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const readyz = () => {

    const grpcRequest: ShipGrpc.Empty = { };

    shipClient.readyz(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: ShipGrpc.ReadyStatus) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

