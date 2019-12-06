// package: proto
// file: CryptoService.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as CryptoService_pb from "./CryptoService_pb";
import * as Query_pb from "./Query_pb";
import * as Response_pb from "./Response_pb";
import * as TransactionResponse_pb from "./TransactionResponse_pb";
import * as Transaction_pb from "./Transaction_pb";

interface ICryptoServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createAccount: ICryptoServiceService_IcreateAccount;
    updateAccount: ICryptoServiceService_IupdateAccount;
    cryptoTransfer: ICryptoServiceService_IcryptoTransfer;
    cryptoDelete: ICryptoServiceService_IcryptoDelete;
    addClaim: ICryptoServiceService_IaddClaim;
    deleteClaim: ICryptoServiceService_IdeleteClaim;
    getClaim: ICryptoServiceService_IgetClaim;
    getAccountRecords: ICryptoServiceService_IgetAccountRecords;
    cryptoGetBalance: ICryptoServiceService_IcryptoGetBalance;
    getAccountInfo: ICryptoServiceService_IgetAccountInfo;
    getTransactionReceipts: ICryptoServiceService_IgetTransactionReceipts;
    getFastTransactionRecord: ICryptoServiceService_IgetFastTransactionRecord;
    getTxRecordByTxID: ICryptoServiceService_IgetTxRecordByTxID;
    getStakersByAccountID: ICryptoServiceService_IgetStakersByAccountID;
}

interface ICryptoServiceService_IcreateAccount extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.CryptoService/createAccount"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ICryptoServiceService_IupdateAccount extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.CryptoService/updateAccount"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ICryptoServiceService_IcryptoTransfer extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.CryptoService/cryptoTransfer"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ICryptoServiceService_IcryptoDelete extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.CryptoService/cryptoDelete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ICryptoServiceService_IaddClaim extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.CryptoService/addClaim"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ICryptoServiceService_IdeleteClaim extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.CryptoService/deleteClaim"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface ICryptoServiceService_IgetClaim extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.CryptoService/getClaim"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ICryptoServiceService_IgetAccountRecords extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.CryptoService/getAccountRecords"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ICryptoServiceService_IcryptoGetBalance extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.CryptoService/cryptoGetBalance"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ICryptoServiceService_IgetAccountInfo extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.CryptoService/getAccountInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ICryptoServiceService_IgetTransactionReceipts extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.CryptoService/getTransactionReceipts"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ICryptoServiceService_IgetFastTransactionRecord extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.CryptoService/getFastTransactionRecord"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ICryptoServiceService_IgetTxRecordByTxID extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.CryptoService/getTxRecordByTxID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface ICryptoServiceService_IgetStakersByAccountID extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.CryptoService/getStakersByAccountID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}

export const CryptoServiceService: ICryptoServiceService;

export interface ICryptoServiceServer {
    createAccount: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    updateAccount: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    cryptoTransfer: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    cryptoDelete: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    addClaim: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    deleteClaim: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    getClaim: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getAccountRecords: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    cryptoGetBalance: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getAccountInfo: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getTransactionReceipts: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getFastTransactionRecord: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getTxRecordByTxID: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getStakersByAccountID: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
}

export interface ICryptoServiceClient {
    createAccount(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    createAccount(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    createAccount(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateAccount(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateAccount(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateAccount(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    cryptoTransfer(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    cryptoTransfer(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    cryptoTransfer(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    cryptoDelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    cryptoDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    cryptoDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    addClaim(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    addClaim(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    addClaim(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    deleteClaim(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    deleteClaim(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    deleteClaim(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    getClaim(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getClaim(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getClaim(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getAccountRecords(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getAccountRecords(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getAccountRecords(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    cryptoGetBalance(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    cryptoGetBalance(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    cryptoGetBalance(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getAccountInfo(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getAccountInfo(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getAccountInfo(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTransactionReceipts(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTransactionReceipts(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTransactionReceipts(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getFastTransactionRecord(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getFastTransactionRecord(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getFastTransactionRecord(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTxRecordByTxID(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTxRecordByTxID(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getTxRecordByTxID(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getStakersByAccountID(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getStakersByAccountID(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getStakersByAccountID(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
}

export class CryptoServiceClient extends grpc.Client implements ICryptoServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createAccount(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public createAccount(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public createAccount(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateAccount(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateAccount(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateAccount(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public cryptoTransfer(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public cryptoTransfer(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public cryptoTransfer(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public cryptoDelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public cryptoDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public cryptoDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public addClaim(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public addClaim(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public addClaim(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public deleteClaim(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public deleteClaim(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public deleteClaim(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public getClaim(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getClaim(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getClaim(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getAccountRecords(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getAccountRecords(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getAccountRecords(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public cryptoGetBalance(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public cryptoGetBalance(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public cryptoGetBalance(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getAccountInfo(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getAccountInfo(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getAccountInfo(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTransactionReceipts(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTransactionReceipts(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTransactionReceipts(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getFastTransactionRecord(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getFastTransactionRecord(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getFastTransactionRecord(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTxRecordByTxID(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTxRecordByTxID(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getTxRecordByTxID(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getStakersByAccountID(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getStakersByAccountID(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getStakersByAccountID(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
}
