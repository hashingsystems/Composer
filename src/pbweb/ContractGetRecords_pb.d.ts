import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as TransactionRecord_pb from './TransactionRecord_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class ContractGetRecordsQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetRecordsQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetRecordsQuery): ContractGetRecordsQuery.AsObject;
  static serializeBinaryToWriter(message: ContractGetRecordsQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetRecordsQuery;
  static deserializeBiinaryFromReader(message: ContractGetRecordsQuery, reader: jspb.BinaryReader): ContractGetRecordsQuery;
}

export namespace ContractGetRecordsQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    contractid: BasicTypes_pb.ContractID;
  }
}

export class ContractGetRecordsResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getRecordsList(): TransactionRecord_pb.TransactionRecord[];
  setRecordsList(a: TransactionRecord_pb.TransactionRecord[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetRecordsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetRecordsResponse): ContractGetRecordsResponse.AsObject;
  static serializeBinaryToWriter(message: ContractGetRecordsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetRecordsResponse;
  static deserializeBiinaryFromReader(message: ContractGetRecordsResponse, reader: jspb.BinaryReader): ContractGetRecordsResponse;
}

export namespace ContractGetRecordsResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    contractid: BasicTypes_pb.ContractID;
    recordsList: TransactionRecord_pb.TransactionRecord[];
  }
}

