import * as grpcWeb from 'grpc-web';

import * as Query_pb from './Query_pb';
import * as Response_pb from './Response_pb';
import * as TransactionResponse_pb from './TransactionResponse_pb';
import * as Transaction_pb from './Transaction_pb';

export class FileServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createFile(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  updateFile(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  deleteFile(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  appendContent(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  getFileContent(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getFileInfo(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

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

export class FileServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createFile(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  updateFile(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  deleteFile(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  appendContent(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  getFileContent(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getFileInfo(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  systemDelete(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  systemUndelete(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

}

