import {Request, Response} from "express";
import * as ProfileClient from "../grpc/clients/profile.client";

export const health = async (req: Request, res: Response) => {
    try {
        const response = await ProfileClient.health();
        res.status(200).json(response);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};

export const status = async (req: Request, res: Response) => {
    try {
        const response = await ProfileClient.status();
        res.status(200).json(response);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};

export const livez = async (req: Request, res: Response) => {
    try {
        const response = await ProfileClient.livez();
        res.status(200).json(response);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};

export const readyz = async (req: Request, res: Response) => {
    try {
        const response = await ProfileClient.readyz();
        res.status(200).json(response);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};
