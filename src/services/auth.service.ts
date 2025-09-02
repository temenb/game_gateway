import * as AuthClient from '../grpc/clients/auth.client';

export const getToken = async (deviceId: string) => {
    return await AuthClient.getToken(deviceId);
};

export const register = async (email: string, password: string) => {
    return await AuthClient.register(email, password);
};

export const login = async (email: string, password: string) => {
    return await AuthClient.login(email, password);
};

export const refreshTokens = async (token: string) => {
    return await AuthClient.refreshTokens(token);
};

export const logout = async (userId: string) => {
    return await AuthClient.logout(userId);
};

export const forgotPassword = async (email: string) => {
    return await AuthClient.forgotPassword(email);
};

export const resetPassword = async (token: string, newPassword: string) => {
    return await AuthClient.resetPassword(token, newPassword);
};

export const health = async () => {
    return await AuthClient.health();
};

export const status = async () => {
    return await AuthClient.status();
};

export const livez = async () => {
    return await AuthClient.livez();
};

export const readyz = async () => {
    return await AuthClient.readyz();
};
