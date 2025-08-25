import * as grpc from '@grpc/grpc-js';
import * as EngineGrpc from '../../generated/engine';
import * as heathService from '../../services/health.service';

export const callbackError = (callback: grpc.sendUnaryData<any>, err: unknown) => {
    const message = err instanceof Error ? err.message : 'Unknown error';
    callback({ code: grpc.status.INTERNAL, message }, null);
};

export const health = async (
    call: grpc.ServerUnaryCall<EngineGrpc.Empty, EngineGrpc.HealthReport>,
    callback: grpc.sendUnaryData<EngineGrpc.HealthReport>
) => {
    try {
        const response = await heathService.health();

        callback(null, response);

    } catch (err: any) {
        callbackError(callback, err);
    }
};

export const status = async (
  call: grpc.ServerUnaryCall<EngineGrpc.Empty, EngineGrpc.StatusInfo>,
  callback: grpc.sendUnaryData<EngineGrpc.StatusInfo>
) => {
    try {
        const response = await heathService.status();

        callback(null, response);

    } catch (err: any) {
        callbackError(callback, err);
    }
};

export const livez = async (
  call: grpc.ServerUnaryCall<EngineGrpc.Empty, EngineGrpc.LiveStatus>,
  callback: grpc.sendUnaryData<EngineGrpc.LiveStatus>
) => {
    try {
        const response = await heathService.livez();

        callback(null, response);

    } catch (err: any) {
        callbackError(callback, err);
    }
};

export const readyz = async (
  call: grpc.ServerUnaryCall<EngineGrpc.Empty, EngineGrpc.ReadyStatus>,
  callback: grpc.sendUnaryData<EngineGrpc.ReadyStatus>
) => {
    try {
        const response = await heathService.readyz();

        callback(null, response);

    } catch (err: any) {
        callbackError(callback, err);
    }
};
