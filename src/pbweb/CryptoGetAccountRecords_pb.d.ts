import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as TransactionRecord_pb from './TransactionRecord_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class CryptoGetAccountRecordsQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetAccountRecordsQuery.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetAccountRecordsQuery): CryptoGetAccountRecordsQuery.AsObject;
  static serializeBinaryToWriter(message: CryptoGetAccountRecordsQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetAccountRecordsQuery;
  static deserializeBiinaryFromReader(message: CryptoGetAccountRecordsQuery, reader: jspb.BinaryReader): CryptoGetAccountRecordsQuery;
}

export namespace CryptoGetAccountRecordsQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    accountid: BasicTypes_pb.AccountID;
  }
}

export class CryptoGetAccountRecordsResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getRecordsList(): TransactionRecord_pb.TransactionRecord[];
  setRecordsList(a: TransactionRecord_pb.TransactionRecord[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetAccountRecordsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetAccountRecordsResponse): CryptoGetAccountRecordsResponse.AsObject;
  static serializeBinaryToWriter(message: CryptoGetAccountRecordsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetAccountRecordsResponse;
  static deserializeBiinaryFromReader(message: CryptoGetAccountRecordsResponse, reader: jspb.BinaryReader): CryptoGetAccountRecordsResponse;
}

export namespace CryptoGetAccountRecordsResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    accountid: BasicTypes_pb.AccountID;
    recordsList: TransactionRecord_pb.TransactionRecord[];
  }
}

