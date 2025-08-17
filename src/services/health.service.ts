import {Request, Response} from "express";


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