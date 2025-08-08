import * as grpc from '@grpc/grpc-js';
import { Request, Response } from 'express';
import * as AuthGrpc from '../../generated/auth';

export const authClient = new AuthGrpc.AuthServiceClient(
    process.env.AUTH_SERVICE ?? 'auth:3000',
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

    res.json({
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
