import * as jspb from "google-protobuf"

import * as Timestamp_pb from './Timestamp_pb';
import * as Duration_pb from './Duration_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';
import * as CryptoAddClaim_pb from './CryptoAddClaim_pb';

export class CryptoGetInfoQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetInfoQuery.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetInfoQuery): CryptoGetInfoQuery.AsObject;
  static serializeBinaryToWriter(message: CryptoGetInfoQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetInfoQuery;
  static deserializeBiinaryFromReader(message: CryptoGetInfoQuery, reader: jspb.BinaryReader): CryptoGetInfoQuery;
}

export namespace CryptoGetInfoQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    accountid: BasicTypes_pb.AccountID;
  }
}

export class CryptoGetInfoResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getAccountinfo(): CryptoGetInfoResponse.AccountInfo;
  setAccountinfo(a: CryptoGetInfoResponse.AccountInfo): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetInfoResponse): CryptoGetInfoResponse.AsObject;
  static serializeBinaryToWriter(message: CryptoGetInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetInfoResponse;
  static deserializeBiinaryFromReader(message: CryptoGetInfoResponse, reader: jspb.BinaryReader): CryptoGetInfoResponse;
}

export namespace CryptoGetInfoResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    accountinfo: CryptoGetInfoResponse.AccountInfo;
  }

  export class AccountInfo extends jspb.Message {
    constructor ();
    getAccountid(): BasicTypes_pb.AccountID;
    setAccountid(a: BasicTypes_pb.AccountID): void;
    getContractaccountid(): string;
    setContractaccountid(a: string): void;
    getDeleted(): boolean;
    setDeleted(a: boolean): void;
    getProxyaccountid(): BasicTypes_pb.AccountID;
    setProxyaccountid(a: BasicTypes_pb.AccountID): void;
    getProxyreceived(): number;
    setProxyreceived(a: number): void;
    getKey(): BasicTypes_pb.Key;
    setKey(a: BasicTypes_pb.Key): void;
    getBalance(): number;
    setBalance(a: number): void;
    getGeneratesendrecordthreshold(): number;
    setGeneratesendrecordthreshold(a: number): void;
    getGeneratereceiverecordthreshold(): number;
    setGeneratereceiverecordthreshold(a: number): void;
    getReceiversigrequired(): boolean;
    setReceiversigrequired(a: boolean): void;
    getExpirationtime(): Timestamp_pb.Timestamp;
    setExpirationtime(a: Timestamp_pb.Timestamp): void;
    getAutorenewperiod(): Duration_pb.Duration;
    setAutorenewperiod(a: Duration_pb.Duration): void;
    getClaimsList(): CryptoAddClaim_pb.Claim[];
    setClaimsList(a: CryptoAddClaim_pb.Claim[]): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountInfo.AsObject;
    static toObject(includeInstance: boolean, msg: AccountInfo): AccountInfo.AsObject;
    static serializeBinaryToWriter(message: AccountInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountInfo;
    static deserializeBiinaryFromReader(message: AccountInfo, reader: jspb.BinaryReader): AccountInfo;
  }

  export namespace AccountInfo {
    export type AsObject = {
      accountid: BasicTypes_pb.AccountID;
      contractaccountid: string;
      deleted: boolean;
      proxyaccountid: BasicTypes_pb.AccountID;
      proxyreceived: number;
      key: BasicTypes_pb.Key;
      balance: number;
      generatesendrecordthreshold: number;
      generatereceiverecordthreshold: number;
      receiversigrequired: boolean;
      expirationtime: Timestamp_pb.Timestamp;
      autorenewperiod: Duration_pb.Duration;
      claimsList: CryptoAddClaim_pb.Claim[];
    }
  }

}

