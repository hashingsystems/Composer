import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class ContractGetBytecodeQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetBytecodeQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetBytecodeQuery): ContractGetBytecodeQuery.AsObject;
  static serializeBinaryToWriter(message: ContractGetBytecodeQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetBytecodeQuery;
  static deserializeBiinaryFromReader(message: ContractGetBytecodeQuery, reader: jspb.BinaryReader): ContractGetBytecodeQuery;
}

export namespace ContractGetBytecodeQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    contractid: BasicTypes_pb.ContractID;
  }
}

export class ContractGetBytecodeResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getBytecode(): {};
  setBytecode(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetBytecodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetBytecodeResponse): ContractGetBytecodeResponse.AsObject;
  static serializeBinaryToWriter(message: ContractGetBytecodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetBytecodeResponse;
  static deserializeBiinaryFromReader(message: ContractGetBytecodeResponse, reader: jspb.BinaryReader): ContractGetBytecodeResponse;
}

export namespace ContractGetBytecodeResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    bytecode: {};
  }
}

