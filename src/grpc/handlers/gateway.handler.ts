import * as grpc from '@grpc/grpc-js';
import * as AuthGrpc from '../../generated/auth';
import * as authService from '../../services/auth.service';

export const callbackError = (callback: grpc.sendUnaryData<any>, err: unknown) => {
  const message = err instanceof Error ? err.message : 'Unknown error';
  callback({code: grpc.status.INTERNAL, message}, null);
};


export const anonymousSignIn = async (
  call: grpc.ServerUnaryCall<AuthGrpc.AnonymousSignInRequest, AuthGrpc.AuthResponse>,
  callback: grpc.sendUnaryData<AuthGrpc.AuthResponse>
) => {
  const deviceId = 'asdf';
  // const { deviceId } = call.deviceId;

  try {
    const result = await authService.anonymousSignIn(deviceId);

    callback(null, result);

  } catch (err: any) {
    callback({
      code: grpc.status.INTERNAL,
      message: err.message,
    }, null);
  }
};
