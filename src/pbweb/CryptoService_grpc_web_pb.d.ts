import * as grpcWeb from 'grpc-web';

import * as Query_pb from './Query_pb';
import * as Response_pb from './Response_pb';
import * as TransactionResponse_pb from './TransactionResponse_pb';
import * as Transaction_pb from './Transaction_pb';

export class CryptoServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createAccount(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  updateAccount(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  cryptoTransfer(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  cryptoDelete(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  addClaim(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  deleteClaim(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

  getClaim(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getAccountRecords(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  cryptoGetBalance(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getAccountInfo(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getTransactionReceipts(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getFastTransactionRecord(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getTxRecordByTxID(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

  getStakersByAccountID(
    request: Query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Response_pb.Response) => void
  ): grpcWeb.ClientReadableStream<Response_pb.Response>;

}

export class CryptoServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createAccount(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  updateAccount(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  cryptoTransfer(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  cryptoDelete(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  addClaim(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  deleteClaim(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

  getClaim(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getAccountRecords(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  cryptoGetBalance(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getAccountInfo(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getTransactionReceipts(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getFastTransactionRecord(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getTxRecordByTxID(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

  getStakersByAccountID(
    request: Query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<Response_pb.Response>;

}

