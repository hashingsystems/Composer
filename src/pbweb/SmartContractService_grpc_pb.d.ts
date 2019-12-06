// package: proto
// file: SmartContractService.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as SmartContractService_pb from "./SmartContractService_pb";
import * as TransactionResponse_pb from "./TransactionResponse_pb";
import * as Query_pb from "./Query_pb";
import * as Response_pb from "./Response_pb";
import * as Transaction_pb from "./Transaction_pb";

interface ISmartContractServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createContract: ISmartContractServiceService_IcreateContract;
    updateContract: ISmartContractServiceService_IupdateContract;
    contractCallMethod: ISmartContractServiceService_IcontractCallMethod;
    getContractInfo: ISmartContractServiceService_IgetContractInfo;
    contractCallLocalMethod: ISmartContractServiceService_IcontractCallLocalMethod;
    contractGetBytecode: ISmartContractServiceService_IContractGetBytecode;
    getBySolidityID: ISmartContractServiceService_IgetBySolidityID;
    getTxRecordByContractID: ISmartContractServiceService_IgetTxRecordByContractID;
    deleteContract: ISmartContractServiceService_IdeleteContract;
    systemDelete: ISmartContractServiceService_IsystemDelete;
    systemUndelete: ISmartContractServiceService_IsystemUndelete;
}

interface ISmartContractServiceService_IcreateContract extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.SmartContractService/createContract"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ISmartContractServiceService_IupdateContract extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.SmartContractService/updateContract"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ISmartContractServiceService_IcontractCallMethod extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.SmartContractService/contractCallMethod"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ISmartContractServiceService_IgetContractInfo extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.SmartContractService/getContractInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ISmartContractServiceService_IcontractCallLocalMethod extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.SmartContractService/contractCallLocalMethod"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ISmartContractServiceService_IContractGetBytecode extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.SmartContractService/ContractGetBytecode"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ISmartContractServiceService_IgetBySolidityID extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.SmartContractService/getBySolidityID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ISmartContractServiceService_IgetTxRecordByContractID extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.SmartContractService/getTxRecordByContractID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ISmartContractServiceService_IdeleteContract extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.SmartContractService/deleteContract"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ISmartContractServiceService_IsystemDelete extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.SmartContractService/systemDelete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ISmartContractServiceService_IsystemUndelete extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.SmartContractService/systemUndelete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}

export const SmartContractServiceService: ISmartContractServiceService;

export interface ISmartContractServiceServer {
    createContract: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    updateContract: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    contractCallMethod: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    getContractInfo: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    contractCallLocalMethod: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    contractGetBytecode: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getBySolidityID: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getTxRecordByContractID: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    deleteContract: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    systemDelete: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    systemUndelete: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
}

export interface ISmartContractServiceClient {
    createContract(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    createContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    createContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateContract(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    contractCallMethod(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    contractCallMethod(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    contractCallMethod(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    getContractInfo(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getContractInfo(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getContractInfo(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    contractCallLocalMethod(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    contractCallLocalMethod(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    contractCallLocalMethod(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    contractGetBytecode(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    contractGetBytecode(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    contractGetBytecode(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getBySolidityID(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getBySolidityID(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getBySolidityID(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTxRecordByContractID(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTxRecordByContractID(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTxRecordByContractID(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    deleteContract(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    deleteContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    deleteContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemDelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemUndelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemUndelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemUndelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
}

export class SmartContractServiceClient extends grpc.Client implements ISmartContractServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createContract(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public createContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public createContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateContract(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public contractCallMethod(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public contractCallMethod(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public contractCallMethod(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public getContractInfo(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getContractInfo(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getContractInfo(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public contractCallLocalMethod(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public contractCallLocalMethod(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public contractCallLocalMethod(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public contractGetBytecode(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public contractGetBytecode(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public contractGetBytecode(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getBySolidityID(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getBySolidityID(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getBySolidityID(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTxRecordByContractID(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTxRecordByContractID(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTxRecordByContractID(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public deleteContract(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public deleteContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public deleteContract(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemDelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemUndelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemUndelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemUndelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
}
