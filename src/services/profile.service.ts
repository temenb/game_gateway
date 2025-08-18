import {Request, Response} from "express";
import * as ProfileClient from '../grpc/clients/profile.client';

export const health = async (req: Request, res: Response) => {
    res.send('Ok');
};

export const status = async (req: Request, res: Response) => {
    res.send('In progress');
};

export const livez = async (req: Request, res: Response) => {
    res.send('In progress');
};

export const readyz = async (req: Request, res: Response) => {
    res.send('In progress');
};