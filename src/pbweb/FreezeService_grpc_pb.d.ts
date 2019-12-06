// package: proto
// file: FreezeService.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as FreezeService_pb from "./FreezeService_pb";
import * as TransactionResponse_pb from "./TransactionResponse_pb";
import * as Transaction_pb from "./Transaction_pb";

interface IFreezeServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    freeze: IFreezeServiceService_Ifreeze;
}

interface IFreezeServiceService_Ifreeze extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.FreezeService/freeze"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}

export const FreezeServiceService: IFreezeServiceService;

export interface IFreezeServiceServer {
    freeze: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
}

export interface IFreezeServiceClient {
    freeze(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    freeze(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    freeze(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
}

export class FreezeServiceClient extends grpc.Client implements IFreezeServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public freeze(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public freeze(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public freeze(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
}
