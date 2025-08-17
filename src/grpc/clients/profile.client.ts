import * as grpc from '@grpc/grpc-js';
import * as ProfileGrpc from '../../generated/profile';
import config from '../../config/config';
import {Request, Response} from "express";

export const profileClient = new ProfileGrpc.ProfileClient(
    config.profileServiceUrl,
    grpc.credentials.createInsecure()
);

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
