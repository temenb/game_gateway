import * as grpc from '@grpc/grpc-js';
import * as ProfileGrpc from '../../generated/profile';
import config from '../../config/config';

export const authClient = new ProfileGrpc.ProfileClient(
    config.profileServiceUrl,
    grpc.credentials.createInsecure()
);
