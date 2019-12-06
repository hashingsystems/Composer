import * as jspb from "google-protobuf"

import * as TransactionRecord_pb from './TransactionRecord_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class TransactionGetRecordQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getTransactionid(): BasicTypes_pb.TransactionID;
  setTransactionid(a: BasicTypes_pb.TransactionID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionGetRecordQuery.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionGetRecordQuery): TransactionGetRecordQuery.AsObject;
  static serializeBinaryToWriter(message: TransactionGetRecordQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionGetRecordQuery;
  static deserializeBiinaryFromReader(message: TransactionGetRecordQuery, reader: jspb.BinaryReader): TransactionGetRecordQuery;
}

export namespace TransactionGetRecordQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    transactionid: BasicTypes_pb.TransactionID;
  }
}

export class TransactionGetRecordResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getTransactionrecord(): TransactionRecord_pb.TransactionRecord;
  setTransactionrecord(a: TransactionRecord_pb.TransactionRecord): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionGetRecordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionGetRecordResponse): TransactionGetRecordResponse.AsObject;
  static serializeBinaryToWriter(message: TransactionGetRecordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionGetRecordResponse;
  static deserializeBiinaryFromReader(message: TransactionGetRecordResponse, reader: jspb.BinaryReader): TransactionGetRecordResponse;
}

export namespace TransactionGetRecordResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    transactionrecord: TransactionRecord_pb.TransactionRecord;
  }
}

