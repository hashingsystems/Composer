import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';
import * as CryptoAddClaim_pb from './CryptoAddClaim_pb';

export class CryptoGetClaimQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getHash(): {};
  setHash(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetClaimQuery.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetClaimQuery): CryptoGetClaimQuery.AsObject;
  static serializeBinaryToWriter(message: CryptoGetClaimQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetClaimQuery;
  static deserializeBiinaryFromReader(message: CryptoGetClaimQuery, reader: jspb.BinaryReader): CryptoGetClaimQuery;
}

export namespace CryptoGetClaimQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    accountid: BasicTypes_pb.AccountID;
    hash: {};
  }
}

export class CryptoGetClaimResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getClaim(): CryptoAddClaim_pb.Claim;
  setClaim(a: CryptoAddClaim_pb.Claim): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetClaimResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetClaimResponse): CryptoGetClaimResponse.AsObject;
  static serializeBinaryToWriter(message: CryptoGetClaimResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetClaimResponse;
  static deserializeBiinaryFromReader(message: CryptoGetClaimResponse, reader: jspb.BinaryReader): CryptoGetClaimResponse;
}

export namespace CryptoGetClaimResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    claim: CryptoAddClaim_pb.Claim;
  }
}

