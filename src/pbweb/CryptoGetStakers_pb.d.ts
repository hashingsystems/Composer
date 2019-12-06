import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class CryptoGetStakersQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetStakersQuery.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetStakersQuery): CryptoGetStakersQuery.AsObject;
  static serializeBinaryToWriter(message: CryptoGetStakersQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetStakersQuery;
  static deserializeBiinaryFromReader(message: CryptoGetStakersQuery, reader: jspb.BinaryReader): CryptoGetStakersQuery;
}

export namespace CryptoGetStakersQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    accountid: BasicTypes_pb.AccountID;
  }
}

export class ProxyStaker extends jspb.Message {
  constructor ();
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getAmount(): number;
  setAmount(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProxyStaker.AsObject;
  static toObject(includeInstance: boolean, msg: ProxyStaker): ProxyStaker.AsObject;
  static serializeBinaryToWriter(message: ProxyStaker, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProxyStaker;
  static deserializeBiinaryFromReader(message: ProxyStaker, reader: jspb.BinaryReader): ProxyStaker;
}

export namespace ProxyStaker {
  export type AsObject = {
    accountid: BasicTypes_pb.AccountID;
    amount: number;
  }
}

export class AllProxyStakers extends jspb.Message {
  constructor ();
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getProxystakerList(): ProxyStaker[];
  setProxystakerList(a: ProxyStaker[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AllProxyStakers.AsObject;
  static toObject(includeInstance: boolean, msg: AllProxyStakers): AllProxyStakers.AsObject;
  static serializeBinaryToWriter(message: AllProxyStakers, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AllProxyStakers;
  static deserializeBiinaryFromReader(message: AllProxyStakers, reader: jspb.BinaryReader): AllProxyStakers;
}

export namespace AllProxyStakers {
  export type AsObject = {
    accountid: BasicTypes_pb.AccountID;
    proxystakerList: ProxyStaker[];
  }
}

export class CryptoGetStakersResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getStakers(): AllProxyStakers;
  setStakers(a: AllProxyStakers): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetStakersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetStakersResponse): CryptoGetStakersResponse.AsObject;
  static serializeBinaryToWriter(message: CryptoGetStakersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetStakersResponse;
  static deserializeBiinaryFromReader(message: CryptoGetStakersResponse, reader: jspb.BinaryReader): CryptoGetStakersResponse;
}

export namespace CryptoGetStakersResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    stakers: AllProxyStakers;
  }
}

