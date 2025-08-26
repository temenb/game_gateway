import * as grpc from '@grpc/grpc-js';
import * as AuthGrpc from '../../generated/auth';
import config from '../../config/config';
import { logger } from '@shared/logger';

export let authClient = createClient();

function createClient(): AuthGrpc.AuthClient {
  return new AuthGrpc.AuthClient(config.serviceAuthUrl, grpc.credentials.createInsecure());
}

function getAuthClient(): AuthGrpc.AuthClient {
  return authClient;
}

function reconnectClient() {
  logger.warn('🔄 Reconnecting AuthClient...');
  authClient = createClient();
}

function isRecoverableGrpcError(err: grpc.ServiceError | null): boolean {
  return !!err && [
    grpc.status.UNAVAILABLE,
    grpc.status.DEADLINE_EXCEEDED,
    grpc.status.INTERNAL,
  ].includes(err.code);
}

function wrapGrpcCall<T>(fn: (client: AuthGrpc.AuthClient, cb: (err: grpc.ServiceError | null, res?: T) => void) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    fn(getAuthClient(), (err, res) => {
      if (isRecoverableGrpcError(err)) {
        logger.info('[grcp ]reconnecting]');
        reconnectClient();
        return fn(getAuthClient(), (retryErr, retryRes) => {
          if (retryErr || !retryRes) {
            logger.error('gRPC retry failed:', retryErr);
            return reject(new Error('gRPC retry failed'));
          }
          resolve(retryRes);
        });
      }

      if (err || !res) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(res);
    });
  });
}

export const health = (): Promise<AuthGrpc.HealthReport> => {
  const grpcRequest: AuthGrpc.Empty = {};
  return wrapGrpcCall((client, cb) => client.health(grpcRequest, cb));
};

export const status = (): Promise<AuthGrpc.StatusInfo> => {
  const grpcRequest: AuthGrpc.Empty = {};
  return wrapGrpcCall((client, cb) => client.status(grpcRequest, cb));
};

export const livez = (): Promise<AuthGrpc.LiveStatus> => {
  const grpcRequest: AuthGrpc.Empty = {};
  return wrapGrpcCall((client, cb) => client.livez(grpcRequest, cb));
};

export const readyz = (): Promise<AuthGrpc.ReadyStatus> => {
  const grpcRequest: AuthGrpc.Empty = {};
  return wrapGrpcCall((client, cb) => client.readyz(grpcRequest, cb));
};

export const register = (email: string, password: string): Promise<AuthGrpc.AuthResponse> => {
  const grpcRequest: AuthGrpc.RegisterRequest = {email, password};
  return wrapGrpcCall((client, cb) => client.register(grpcRequest, cb));
};

export const login = (email: string, password: string): Promise<AuthGrpc.AuthResponse> => {
  const grpcRequest: AuthGrpc.LoginRequest = {email, password};
  return wrapGrpcCall((client, cb) => client.login(grpcRequest, cb));
};

export const refreshTokens = (token: string): Promise<AuthGrpc.AuthResponse> => {
  const grpcRequest: AuthGrpc.RefreshTokensRequest = {token};
  return wrapGrpcCall((client, cb) => client.refreshTokens(grpcRequest, cb));
};

export const logout = (userId: string): Promise<AuthGrpc.LogoutResponse> => {
  const grpcRequest: AuthGrpc.LogoutRequest = {userId};
  return wrapGrpcCall((client, cb) => client.logout(grpcRequest, cb));
};

export const forgotPassword = (email: string): Promise<AuthGrpc.Empty> => {
  const grpcRequest: AuthGrpc.ForgotPasswordRequest = {email};
  return wrapGrpcCall((client, cb) => client.forgotPassword(grpcRequest, cb));
};

export const resetPassword = (token: string, newPassword: string): Promise<AuthGrpc.AuthResponse> => {
  const grpcRequest: AuthGrpc.ResetPasswordRequest = {token, newPassword};
  return wrapGrpcCall((client, cb) => client.resetPassword(grpcRequest, cb));
};
