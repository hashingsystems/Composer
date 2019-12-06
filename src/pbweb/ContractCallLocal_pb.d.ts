import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class ContractLoginfo extends jspb.Message {
  constructor ();
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getBloom(): {};
  setBloom(a: {}): void;
  getTopicList(): {}[];
  setTopicList(a: {}[]): void;
  getData(): {};
  setData(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractLoginfo.AsObject;
  static toObject(includeInstance: boolean, msg: ContractLoginfo): ContractLoginfo.AsObject;
  static serializeBinaryToWriter(message: ContractLoginfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractLoginfo;
  static deserializeBiinaryFromReader(message: ContractLoginfo, reader: jspb.BinaryReader): ContractLoginfo;
}

export namespace ContractLoginfo {
  export type AsObject = {
    contractid: BasicTypes_pb.ContractID;
    bloom: {};
    topicList: {}[];
    data: {};
  }
}

export class ContractFunctionResult extends jspb.Message {
  constructor ();
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getContractcallresult(): {};
  setContractcallresult(a: {}): void;
  getErrormessage(): string;
  setErrormessage(a: string): void;
  getBloom(): {};
  setBloom(a: {}): void;
  getGasused(): number;
  setGasused(a: number): void;
  getLoginfoList(): ContractLoginfo[];
  setLoginfoList(a: ContractLoginfo[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractFunctionResult.AsObject;
  static toObject(includeInstance: boolean, msg: ContractFunctionResult): ContractFunctionResult.AsObject;
  static serializeBinaryToWriter(message: ContractFunctionResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractFunctionResult;
  static deserializeBiinaryFromReader(message: ContractFunctionResult, reader: jspb.BinaryReader): ContractFunctionResult;
}

export namespace ContractFunctionResult {
  export type AsObject = {
    contractid: BasicTypes_pb.ContractID;
    contractcallresult: {};
    errormessage: string;
    bloom: {};
    gasused: number;
    loginfoList: ContractLoginfo[];
  }
}

export class ContractCallLocalQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getGas(): number;
  setGas(a: number): void;
  getFunctionparameters(): {};
  setFunctionparameters(a: {}): void;
  getMaxresultsize(): number;
  setMaxresultsize(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCallLocalQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCallLocalQuery): ContractCallLocalQuery.AsObject;
  static serializeBinaryToWriter(message: ContractCallLocalQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCallLocalQuery;
  static deserializeBiinaryFromReader(message: ContractCallLocalQuery, reader: jspb.BinaryReader): ContractCallLocalQuery;
}

export namespace ContractCallLocalQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    contractid: BasicTypes_pb.ContractID;
    gas: number;
    functionparameters: {};
    maxresultsize: number;
  }
}

export class ContractCallLocalResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getFunctionresult(): ContractFunctionResult;
  setFunctionresult(a: ContractFunctionResult): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCallLocalResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCallLocalResponse): ContractCallLocalResponse.AsObject;
  static serializeBinaryToWriter(message: ContractCallLocalResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCallLocalResponse;
  static deserializeBiinaryFromReader(message: ContractCallLocalResponse, reader: jspb.BinaryReader): ContractCallLocalResponse;
}

export namespace ContractCallLocalResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    functionresult: ContractFunctionResult;
  }
}

