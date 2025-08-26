import {Request, Response} from "express";
import * as EngineClient from "../grpc/clients/engine.client";
import logger from "@shared/logger";

export const health = async (req: Request, res: Response) => {
    try {
        const response = await EngineClient.health();
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
        const response = await EngineClient.status();
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
        const response = await EngineClient.livez();
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
        const response = await EngineClient.readyz();
        res.status(200).json(response);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};
