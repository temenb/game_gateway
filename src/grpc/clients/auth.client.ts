import * as grpc from '@grpc/grpc-js';
import * as AuthGrpc from '../../generated/auth';
import {Empty} from "../../generated/google/protobuf/empty";
import config from '../../config/config';
import { logger } from '../../utils/logger';

export const authClient = new AuthGrpc.AuthClient(
  config.serviceAuthUrl!,
  grpc.credentials.createInsecure()
);

export const register = (email: string, password: string): Promise<AuthGrpc.AuthResponse> => {
  const grpcRequest: AuthGrpc.RegisterRequest = {email, password};

  return new Promise((resolve, reject) => {
    authClient.register(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.AuthResponse) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);
    });
  });
};

export const login = (email: string, password: string): Promise<AuthGrpc.AuthResponse> => {
  const grpcRequest: AuthGrpc.LoginRequest = {email, password};

  return new Promise((resolve, reject) => {
    authClient.login(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.AuthResponse) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);
    });
  });
};

export const refreshTokens = (token: string): Promise<AuthGrpc.AuthResponse> => {
  const grpcRequest: AuthGrpc.RefreshTokensRequest = {token};

  return new Promise((resolve, reject) => {
    authClient.refreshTokens(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.AuthResponse) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);
    });
  });
};

export const logout = (userId: string): Promise<AuthGrpc.LogoutResponse> => {

  const grpcRequest: AuthGrpc.LogoutRequest = {userId};

  return new Promise((resolve, reject) => {
    authClient.logout(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.LogoutResponse) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);

    });
  });
};

export const forgotPassword = (email: string): Promise<AuthGrpc.Empty> => {

  const grpcRequest: AuthGrpc.ForgotPasswordRequest = {email};

  return new Promise((resolve, reject) => {
    authClient.forgotPassword(grpcRequest, (err: grpc.ServiceError | null, response?: Empty) => {
      if (err) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve({});
    });
  });
};

export const resetPassword = (token: string, newPassword: string): Promise<AuthGrpc.AuthResponse> => {
  const grpcRequest: AuthGrpc.ResetPasswordRequest = {token, newPassword};

  return new Promise((resolve, reject) => {
    authClient.resetPassword(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.AuthResponse) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);
    });
  });
};

export const health = (): Promise<AuthGrpc.HealthReport> => {

  const grpcRequest: AuthGrpc.Empty = {};

  return new Promise((resolve, reject) => {
    authClient.health(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.HealthReport) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);
    });
  });
};

export const status = (): Promise<AuthGrpc.StatusInfo> => {

  const grpcRequest: AuthGrpc.Empty = {};

  return new Promise((resolve, reject) => {
    authClient.status(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.StatusInfo) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);
    });
  });
};

export const livez = (): Promise<AuthGrpc.LiveStatus> => {

  const grpcRequest: AuthGrpc.Empty = {};

  return new Promise((resolve, reject) => {
    authClient.livez(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.LiveStatus) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);
    });
  });
};

export const readyz = (): Promise<AuthGrpc.ReadyStatus> => {

  const grpcRequest: AuthGrpc.Empty = {};

  return new Promise((resolve, reject) => {
    authClient.readyz(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.ReadyStatus) => {
      if (err || !grpcResponse) {
        logger.error('gRPC error:', err);
        return reject(new Error('Internal gRPC error'));
      }

      resolve(grpcResponse);
    });
  });
};
