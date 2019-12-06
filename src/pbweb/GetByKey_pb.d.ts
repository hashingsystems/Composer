import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';
import * as CryptoAddClaim_pb from './CryptoAddClaim_pb';

export class GetByKeyQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getKey(): BasicTypes_pb.Key;
  setKey(a: BasicTypes_pb.Key): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetByKeyQuery.AsObject;
  static toObject(includeInstance: boolean, msg: GetByKeyQuery): GetByKeyQuery.AsObject;
  static serializeBinaryToWriter(message: GetByKeyQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetByKeyQuery;
  static deserializeBiinaryFromReader(message: GetByKeyQuery, reader: jspb.BinaryReader): GetByKeyQuery;
}

export namespace GetByKeyQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    key: BasicTypes_pb.Key;
  }
}

export class EntityID extends jspb.Message {
  constructor ();
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getClaim(): CryptoAddClaim_pb.Claim;
  setClaim(a: CryptoAddClaim_pb.Claim): void;
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntityID.AsObject;
  static toObject(includeInstance: boolean, msg: EntityID): EntityID.AsObject;
  static serializeBinaryToWriter(message: EntityID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntityID;
  static deserializeBiinaryFromReader(message: EntityID, reader: jspb.BinaryReader): EntityID;
}

export namespace EntityID {
  export type AsObject = {
    accountid: BasicTypes_pb.AccountID;
    claim: CryptoAddClaim_pb.Claim;
    fileid: BasicTypes_pb.FileID;
    contractid: BasicTypes_pb.ContractID;
  }
}

export class GetByKeyResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getEntitiesList(): EntityID[];
  setEntitiesList(a: EntityID[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetByKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetByKeyResponse): GetByKeyResponse.AsObject;
  static serializeBinaryToWriter(message: GetByKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetByKeyResponse;
  static deserializeBiinaryFromReader(message: GetByKeyResponse, reader: jspb.BinaryReader): GetByKeyResponse;
}

export namespace GetByKeyResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    entitiesList: EntityID[];
  }
}

