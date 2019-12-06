import * as jspb from "google-protobuf"

import * as Timestamp_pb from './Timestamp_pb';
import * as Duration_pb from './Duration_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class ContractGetInfoQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetInfoQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetInfoQuery): ContractGetInfoQuery.AsObject;
  static serializeBinaryToWriter(message: ContractGetInfoQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetInfoQuery;
  static deserializeBiinaryFromReader(message: ContractGetInfoQuery, reader: jspb.BinaryReader): ContractGetInfoQuery;
}

export namespace ContractGetInfoQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    contractid: BasicTypes_pb.ContractID;
  }
}

export class ContractGetInfoResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getContractinfo(): ContractGetInfoResponse.ContractInfo;
  setContractinfo(a: ContractGetInfoResponse.ContractInfo): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetInfoResponse): ContractGetInfoResponse.AsObject;
  static serializeBinaryToWriter(message: ContractGetInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetInfoResponse;
  static deserializeBiinaryFromReader(message: ContractGetInfoResponse, reader: jspb.BinaryReader): ContractGetInfoResponse;
}

export namespace ContractGetInfoResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    contractinfo: ContractGetInfoResponse.ContractInfo;
  }

  export class ContractInfo extends jspb.Message {
    constructor ();
    getContractid(): BasicTypes_pb.ContractID;
    setContractid(a: BasicTypes_pb.ContractID): void;
    getAccountid(): BasicTypes_pb.AccountID;
    setAccountid(a: BasicTypes_pb.AccountID): void;
    getContractaccountid(): string;
    setContractaccountid(a: string): void;
    getAdminkey(): BasicTypes_pb.Key;
    setAdminkey(a: BasicTypes_pb.Key): void;
    getExpirationtime(): Timestamp_pb.Timestamp;
    setExpirationtime(a: Timestamp_pb.Timestamp): void;
    getAutorenewperiod(): Duration_pb.Duration;
    setAutorenewperiod(a: Duration_pb.Duration): void;
    getStorage(): number;
    setStorage(a: number): void;
    getMemo(): string;
    setMemo(a: string): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractInfo.AsObject;
    static toObject(includeInstance: boolean, msg: ContractInfo): ContractInfo.AsObject;
    static serializeBinaryToWriter(message: ContractInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractInfo;
    static deserializeBiinaryFromReader(message: ContractInfo, reader: jspb.BinaryReader): ContractInfo;
  }

  export namespace ContractInfo {
    export type AsObject = {
      contractid: BasicTypes_pb.ContractID;
      accountid: BasicTypes_pb.AccountID;
      contractaccountid: string;
      adminkey: BasicTypes_pb.Key;
      expirationtime: Timestamp_pb.Timestamp;
      autorenewperiod: Duration_pb.Duration;
      storage: number;
      memo: string;
    }
  }

}

