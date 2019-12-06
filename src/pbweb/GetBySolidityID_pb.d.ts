import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class GetBySolidityIDQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getSolidityid(): string;
  setSolidityid(a: string): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBySolidityIDQuery.AsObject;
  static toObject(includeInstance: boolean, msg: GetBySolidityIDQuery): GetBySolidityIDQuery.AsObject;
  static serializeBinaryToWriter(message: GetBySolidityIDQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBySolidityIDQuery;
  static deserializeBiinaryFromReader(message: GetBySolidityIDQuery, reader: jspb.BinaryReader): GetBySolidityIDQuery;
}

export namespace GetBySolidityIDQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    solidityid: string;
  }
}

export class GetBySolidityIDResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBySolidityIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBySolidityIDResponse): GetBySolidityIDResponse.AsObject;
  static serializeBinaryToWriter(message: GetBySolidityIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBySolidityIDResponse;
  static deserializeBiinaryFromReader(message: GetBySolidityIDResponse, reader: jspb.BinaryReader): GetBySolidityIDResponse;
}

export namespace GetBySolidityIDResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    accountid: BasicTypes_pb.AccountID;
    fileid: BasicTypes_pb.FileID;
    contractid: BasicTypes_pb.ContractID;
  }
}

