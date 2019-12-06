import * as grpcWeb from 'grpc-web';

import * as TransactionResponse_pb from './TransactionResponse_pb';
import * as Transaction_pb from './Transaction_pb';

export class FreezeServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  freeze(
    request: Transaction_pb.Transaction,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TransactionResponse_pb.TransactionResponse) => void
  ): grpcWeb.ClientReadableStream<TransactionResponse_pb.TransactionResponse>;

}

export class FreezeServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  freeze(
    request: Transaction_pb.Transaction,
    metadata?: grpcWeb.Metadata
  ): Promise<TransactionResponse_pb.TransactionResponse>;

}

