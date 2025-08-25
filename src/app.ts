import dotenv from 'dotenv';
// import { AuthService } from './generated/auth';
import * as grpc from '@grpc/grpc-js';
// import * as authHandler from "./grpc/handlers/auth.handler";
// import {initKafka} from "./utils/kafka";
// import config from "./config/config";

dotenv.config();

const server = new grpc.Server();
export default server;

