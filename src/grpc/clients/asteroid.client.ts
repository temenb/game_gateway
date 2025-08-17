import * as grpc from '@grpc/grpc-js';
import { Request, Response } from 'express';
import * as AstroidGrpc from '../../generated/asteroid';
import config from '../../config/config';


export const asteroidClient = new AstroidGrpc.AsteroidClient(
    config.asteroidServiceUrl,
    grpc.credentials.createInsecure()
);

export const list = (req: Request, res: Response) => {
    const { userId, galaxyId } = req.body;

    const grpcRequest: AstroidGrpc.ListAsteroidsRequest = { userId, galaxyId };

    asteroidClient.listAsteroids(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AstroidGrpc.ListAsteroidsResponse) => {
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

    const grpcRequest: AstroidGrpc.ListGalaxiesRequest = { userId };

    asteroidClient.listGalaxies(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AstroidGrpc.ListGalaxiesResponse) => {
        if (err || !grpcResponse) {
            console.error('gRPC error:', err);
            return res.status(500).json({ error: 'Internal gRPC error' });
        }

        res.status(201).json({
            galaxies: grpcResponse.galaxies,
        });
    });
};

export const health = (req: Request, res: Response) => {
    res.send('In progress');
};

export const status = (req: Request, res: Response) => {
    res.send('In progress');
};

export const livez = (req: Request, res: Response) => {
    res.send('In progress');
};

export const readyz = (req: Request, res: Response) => {
    res.send('In progress');
};

