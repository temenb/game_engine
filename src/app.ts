import dotenv from 'dotenv';
import { EngineService } from './generated/engine';
import * as grpc from '@grpc/grpc-js';
import * as engineHandler from "./grpc/handlers/engine.handler";
// import {initKafka} from "./utils/kafka";
// import config from "./config/config";

dotenv.config();

const server = new grpc.Server();

server.addService(EngineService, {
  health: engineHandler.health,
  status: engineHandler.status,
  livez: engineHandler.livez,
  readyz: engineHandler.readyz,
});

export default server;
