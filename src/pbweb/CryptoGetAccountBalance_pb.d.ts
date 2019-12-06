import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class CryptoGetAccountBalanceQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetAccountBalanceQuery.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetAccountBalanceQuery): CryptoGetAccountBalanceQuery.AsObject;
  static serializeBinaryToWriter(message: CryptoGetAccountBalanceQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetAccountBalanceQuery;
  static deserializeBiinaryFromReader(message: CryptoGetAccountBalanceQuery, reader: jspb.BinaryReader): CryptoGetAccountBalanceQuery;
}

export namespace CryptoGetAccountBalanceQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    accountid: BasicTypes_pb.AccountID;
  }
}

export class CryptoGetAccountBalanceResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getBalance(): number;
  setBalance(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetAccountBalanceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetAccountBalanceResponse): CryptoGetAccountBalanceResponse.AsObject;
  static serializeBinaryToWriter(message: CryptoGetAccountBalanceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetAccountBalanceResponse;
  static deserializeBiinaryFromReader(message: CryptoGetAccountBalanceResponse, reader: jspb.BinaryReader): CryptoGetAccountBalanceResponse;
}

export namespace CryptoGetAccountBalanceResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    accountid: BasicTypes_pb.AccountID;
    balance: number;
  }
}

