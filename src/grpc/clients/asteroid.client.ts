import * as grpc from '@grpc/grpc-js';
import { Request, Response } from 'express';
import * as AsteroidGrpc from '../../generated/asteroid';
import config from '../../config/config';


export const asteroidClient = new AsteroidGrpc.AsteroidClient(
    config.asteroidServiceUrl,
    grpc.credentials.createInsecure()
);

export const list = (req: Request, res: Response) => {
    const { userId, galaxyId } = req.body;

    const grpcRequest: AsteroidGrpc.ListAsteroidsRequest = { userId, galaxyId };

    asteroidClient.listAsteroids(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.ListAsteroidsResponse) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);
            return res.status(500).json({ error: 'Internal gRPC error' });
        }

        res.status(201).json({
            asteroids: grpcResponse.asteroids,
        });
    });
};

export const listGalaxies = (req: Request, res: Response) => {
    const { userId } = req.body;

    const grpcRequest: AsteroidGrpc.ListGalaxiesRequest = { userId };

    asteroidClient.listGalaxies(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.ListGalaxiesResponse) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);
            return res.status(500).json({ error: 'Internal gRPC error' });
        }

        res.status(201).json({
            galaxies: grpcResponse.galaxies,
        });
    });
};

export const health = () => {

    const grpcRequest: AsteroidGrpc.Empty = { };

    asteroidClient.health(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.HealthReport) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const status = () => {

    const grpcRequest: AsteroidGrpc.Empty = { };

    asteroidClient.status(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.StatusInfo) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const livez = () => {

    const grpcRequest: AsteroidGrpc.Empty = { };

    asteroidClient.livez(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.LiveStatus) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};

export const readyz = () => {

    const grpcRequest: AsteroidGrpc.Empty = { };

    asteroidClient.readyz(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AsteroidGrpc.ReadyStatus) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);

            throw Error('Internal gRPC error');
        }

        return grpcResponse;
    });
};


