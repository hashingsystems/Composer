import * as jspb from "google-protobuf"

import * as TransactionReceipt_pb from './TransactionReceipt_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class TransactionGetReceiptQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getTransactionid(): BasicTypes_pb.TransactionID;
  setTransactionid(a: BasicTypes_pb.TransactionID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionGetReceiptQuery.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionGetReceiptQuery): TransactionGetReceiptQuery.AsObject;
  static serializeBinaryToWriter(message: TransactionGetReceiptQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionGetReceiptQuery;
  static deserializeBiinaryFromReader(message: TransactionGetReceiptQuery, reader: jspb.BinaryReader): TransactionGetReceiptQuery;
}

export namespace TransactionGetReceiptQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    transactionid: BasicTypes_pb.TransactionID;
  }
}

export class TransactionGetReceiptResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getReceipt(): TransactionReceipt_pb.TransactionReceipt;
  setReceipt(a: TransactionReceipt_pb.TransactionReceipt): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionGetReceiptResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionGetReceiptResponse): TransactionGetReceiptResponse.AsObject;
  static serializeBinaryToWriter(message: TransactionGetReceiptResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionGetReceiptResponse;
  static deserializeBiinaryFromReader(message: TransactionGetReceiptResponse, reader: jspb.BinaryReader): TransactionGetReceiptResponse;
}

export namespace TransactionGetReceiptResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    receipt: TransactionReceipt_pb.TransactionReceipt;
  }
}

