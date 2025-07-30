// import protoLoader from '@grpc/proto-loader';
// import grpc from '@grpc/grpc-js';
//
// const packageDef = protoLoader.loadSync('proto/auth.proto', {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// const grpcObject = grpc.loadPackageDefinition(packageDef) as any;
//
// export const authClient = new grpcObject.AuthService(
//   'auth:50051',
//   grpc.credentials.createInsecure()
// );
