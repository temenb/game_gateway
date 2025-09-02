import dotenv from 'dotenv';
import {GatewayService} from './generated/gateway';
import * as grpc from '@grpc/grpc-js';
import * as gatewayHandler from "./grpc/handlers/gateway.handler";
import logger from '@shared/logger';

dotenv.config();

const server = new grpc.Server();

server.addService(GatewayService, {
    getToken: gatewayHandler.getToken,
    // health: gatewayHandler.health,
    // status: gatewayHandler.status,
    // livez: gatewayHandler.livez,
    // readyz: gatewayHandler.readyz,
});

export default server;
