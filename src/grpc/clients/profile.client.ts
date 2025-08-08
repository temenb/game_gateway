import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

const packageDef = protoLoader.loadSync('proto/profile.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

export const profileClient = new grpcObject.ProfileService(
  process.env.PROFILE_SERVICE,
  grpc.credentials.createInsecure()
);
