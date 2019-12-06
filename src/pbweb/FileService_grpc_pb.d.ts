// package: proto
// file: FileService.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as FileService_pb from "./FileService_pb";
import * as Query_pb from "./Query_pb";
import * as Response_pb from "./Response_pb";
import * as TransactionResponse_pb from "./TransactionResponse_pb";
import * as Transaction_pb from "./Transaction_pb";

interface IFileServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createFile: IFileServiceService_IcreateFile;
    updateFile: IFileServiceService_IupdateFile;
    deleteFile: IFileServiceService_IdeleteFile;
    appendContent: IFileServiceService_IappendContent;
    getFileContent: IFileServiceService_IgetFileContent;
    getFileInfo: IFileServiceService_IgetFileInfo;
    systemDelete: IFileServiceService_IsystemDelete;
    systemUndelete: IFileServiceService_IsystemUndelete;
}

interface IFileServiceService_IcreateFile extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.FileService/createFile"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface IFileServiceService_IupdateFile extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.FileService/updateFile"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface IFileServiceService_IdeleteFile extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.FileService/deleteFile"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface IFileServiceService_IappendContent extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.FileService/appendContent"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface IFileServiceService_IgetFileContent extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.FileService/getFileContent"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface IFileServiceService_IgetFileInfo extends grpc.MethodDefinition<Query_pb.Query, Response_pb.Response> {
    path: string; // "/proto.FileService/getFileInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Query_pb.Query>;
    requestDeserialize: grpc.deserialize<Query_pb.Query>;
    responseSerialize: grpc.serialize<Response_pb.Response>;
    responseDeserialize: grpc.deserialize<Response_pb.Response>;
}
interface IFileServiceService_IsystemDelete extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.FileService/systemDelete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}
interface IFileServiceService_IsystemUndelete extends grpc.MethodDefinition<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse> {
    path: string; // "/proto.FileService/systemUndelete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<Transaction_pb.Transaction>;
    requestDeserialize: grpc.deserialize<Transaction_pb.Transaction>;
    responseSerialize: grpc.serialize<TransactionResponse_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<TransactionResponse_pb.TransactionResponse>;
}

export const FileServiceService: IFileServiceService;

export interface IFileServiceServer {
    createFile: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    updateFile: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    deleteFile: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    appendContent: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    getFileContent: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    getFileInfo: grpc.handleUnaryCall<Query_pb.Query, Response_pb.Response>;
    systemDelete: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
    systemUndelete: grpc.handleUnaryCall<Transaction_pb.Transaction, TransactionResponse_pb.TransactionResponse>;
}

export interface IFileServiceClient {
    createFile(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    createFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    createFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateFile(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    updateFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    deleteFile(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    deleteFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    deleteFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    appendContent(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    appendContent(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    appendContent(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    getFileContent(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getFileContent(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getFileContent(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getFileInfo(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getFileInfo(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    getFileInfo(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    systemDelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemUndelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemUndelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    systemUndelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
}

export class FileServiceClient extends grpc.Client implements IFileServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createFile(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public createFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public createFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateFile(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public updateFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public deleteFile(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public deleteFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public deleteFile(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public appendContent(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public appendContent(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public appendContent(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public getFileContent(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getFileContent(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getFileContent(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getFileInfo(request: Query_pb.Query, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getFileInfo(request: Query_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public getFileInfo(request: Query_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Response_pb.Response) => void): grpc.ClientUnaryCall;
    public systemDelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemDelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemUndelete(request: Transaction_pb.Transaction, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemUndelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public systemUndelete(request: Transaction_pb.Transaction, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: TransactionResponse_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
}
