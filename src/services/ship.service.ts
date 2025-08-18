import {Request, Response} from "express";
import * as ShipClient from "../grpc/clients/ship.client";

export const health = async (req: Request, res: Response) => {
    try {
        const response = await ShipClient.health();
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
        const response = await ShipClient.status();
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
        const response = await ShipClient.livez();
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
        const response = await ShipClient.readyz();
        res.status(200).json(response);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};
