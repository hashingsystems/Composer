import * as jspb from "google-protobuf"

import * as TransactionRecord_pb from './TransactionRecord_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class TransactionGetFastRecordQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getTransactionid(): BasicTypes_pb.TransactionID;
  setTransactionid(a: BasicTypes_pb.TransactionID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionGetFastRecordQuery.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionGetFastRecordQuery): TransactionGetFastRecordQuery.AsObject;
  static serializeBinaryToWriter(message: TransactionGetFastRecordQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionGetFastRecordQuery;
  static deserializeBiinaryFromReader(message: TransactionGetFastRecordQuery, reader: jspb.BinaryReader): TransactionGetFastRecordQuery;
}

export namespace TransactionGetFastRecordQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    transactionid: BasicTypes_pb.TransactionID;
  }
}

export class TransactionGetFastRecordResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getTransactionrecord(): TransactionRecord_pb.TransactionRecord;
  setTransactionrecord(a: TransactionRecord_pb.TransactionRecord): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionGetFastRecordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionGetFastRecordResponse): TransactionGetFastRecordResponse.AsObject;
  static serializeBinaryToWriter(message: TransactionGetFastRecordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionGetFastRecordResponse;
  static deserializeBiinaryFromReader(message: TransactionGetFastRecordResponse, reader: jspb.BinaryReader): TransactionGetFastRecordResponse;
}

export namespace TransactionGetFastRecordResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    transactionrecord: TransactionRecord_pb.TransactionRecord;
  }
}

