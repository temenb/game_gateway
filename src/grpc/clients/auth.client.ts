import * as grpc from '@grpc/grpc-js';
import { Request, Response } from 'express';
import * as AuthGrpc from '../../generated/auth';
import {Empty} from "../../generated/google/protobuf/empty";
import config from '../../config/config';

export const authClient = new AuthGrpc.AuthClient(
    config.authServiceUrl,
    grpc.credentials.createInsecure()
);

export const register = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const grpcRequest: AuthGrpc.RegisterRequest = { email, password };

  authClient.register(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.AuthResponse) => {
    if (err || !grpcResponse) {
      console.error('gRPC error:', err);
      return res.status(500).json({ error: 'Internal gRPC error' });
    }

    res.status(201).json({
      accessToken: grpcResponse.accessToken,
      refreshToken: grpcResponse.refreshToken,
      userId: grpcResponse.userId,
    });
  });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const grpcRequest: AuthGrpc.LoginRequest = { email, password };

  authClient.login(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.AuthResponse) => {
    if (err || !grpcResponse) {
      console.error('gRPC error:', err);
      return res.status(500).json({ error: 'Internal gRPC error' });
    }

    res.json({
      accessToken: grpcResponse.accessToken,
      refreshToken: grpcResponse.refreshToken,
      userId: grpcResponse.userId,
    });
  });
};

export const refreshTokens = (req: Request, res: Response) => {
  const { token } = req.body;

  const grpcRequest: AuthGrpc.RefreshTokensRequest = { token };

  authClient.refreshTokens(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.RefreshTokensResponse) => {
    if (err || !grpcResponse) {
      console.error('gRPC error:', err);
      return res.status(500).json({ error: 'Internal gRPC error' });
    }

    res.json({
      accessToken: grpcResponse.accessToken,
      refreshToken: grpcResponse.refreshToken,
    });
  });
};

export const logout = (req: Request, res: Response) => {
  const { userId } = req.body;

  const grpcRequest: AuthGrpc.LogoutRequest = { userId };

  authClient.logout(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.LogoutResponse) => {
    if (err || !grpcResponse) {
      console.error('gRPC error:', err);
      return res.status(500).json({ error: 'Internal gRPC error' });
    }

    res.json({
      success: grpcResponse.success,
      message: grpcResponse.message,
    });
  });
};

export const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;

  const grpcRequest: AuthGrpc.ForgotPasswordRequest = { email };

  authClient.forgotPassword(grpcRequest, (err: grpc.ServiceError | null, response?: Empty) => {
    if (err) {
      console.error('gRPC error:', err);
      return res.status(500).json({ error: 'Internal gRPC error' });
    }

    res.status(200).json({ success: true });
  });
};

export const resetPassword = (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const grpcRequest: AuthGrpc.ResetPasswordRequest = { token, newPassword };

  authClient.resetPassword(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthGrpc.AuthResponse) => {
    if (err || !grpcResponse) {
      console.error('gRPC error:', err);
      return res.status(500).json({ error: 'Internal gRPC error' });
    }

    res.json({
      accessToken: grpcResponse.accessToken,
      refreshToken: grpcResponse.refreshToken,
      userId: grpcResponse.userId,
    });
  });
};

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
