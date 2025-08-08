import * as grpc from '@grpc/grpc-js';
import { Request, Response } from 'express';
import { AuthServiceClient, RegisterRequest, AuthResponse } from '../../generated/auth';

export const authClient = new AuthServiceClient(
    process.env.AUTH_SERVICE ?? 'localhost:50051',
    grpc.credentials.createInsecure()
);

export const registerHandler = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const grpcRequest: RegisterRequest = { email, password };

  authClient.register(grpcRequest, (err: grpc.ServiceError | null, grpcResponse?: AuthResponse) => {
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
