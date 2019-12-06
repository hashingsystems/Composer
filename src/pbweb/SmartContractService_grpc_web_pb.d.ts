import * as grpcWeb from 'grpc-web';

import * as TransactionResponse_pb from './TransactionResponse_pb';
import * as Query_pb from './Query_pb';
import * as Response_pb from './Response_pb';
import * as Transaction_pb from './Transaction_pb';

export class SmartContractServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createContract(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  updateContract(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  contractCallMethod(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  getContractInfo(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  contractCallLocalMethod(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  contractGetBytecode(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getBySolidityID(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getTxRecordByContractID(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  deleteContract(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  systemDelete(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  systemUndelete(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

}

export class SmartContractServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createContract(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  updateContract(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  contractCallMethod(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  getContractInfo(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  contractCallLocalMethod(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  contractGetBytecode(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getBySolidityID(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getTxRecordByContractID(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  deleteContract(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  systemDelete(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  systemUndelete(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

}

