import { Request, Response } from 'express';
import * as AuthClient from '../grpc/clients/auth.client';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const response = await AuthClient.register(email, password);

        res.status(201).json({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            userId: response.userId,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const response = await AuthClient.login(email, password);

        res.status(200).json({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            userId: response.userId,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};

export const refreshTokens = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        const response = await AuthClient.refreshTokens(token);

        res.status(200).json({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            userId: response.userId,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};

export const logout = async (req: Request, res: Response) => {
    const { userId } = req.body;

    try {
        const response = await AuthClient.logout(userId);
        res.json({
            success: response.success,
            message: response.message,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        await AuthClient.forgotPassword(email);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
    res.status(200).json({ success: true });
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    try {
        const response = await AuthClient.resetPassword(token, newPassword);

        res.status(200).json({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            userId: response.userId,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};

export const health = async (req: Request, res: Response) => {
    try {
        const response = await AuthClient.health();
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
        const response = await AuthClient.status();
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
        const response = await AuthClient.livez();
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
        const response = await AuthClient.readyz();
        res.status(200).json(response);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};
