import * as jspb from "google-protobuf"

import * as Timestamp_pb from './Timestamp_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class FileGetInfoQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGetInfoQuery.AsObject;
  static toObject(includeInstance: boolean, msg: FileGetInfoQuery): FileGetInfoQuery.AsObject;
  static serializeBinaryToWriter(message: FileGetInfoQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGetInfoQuery;
  static deserializeBiinaryFromReader(message: FileGetInfoQuery, reader: jspb.BinaryReader): FileGetInfoQuery;
}

export namespace FileGetInfoQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    fileid: BasicTypes_pb.FileID;
  }
}

export class FileGetInfoResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getFileinfo(): FileGetInfoResponse.FileInfo;
  setFileinfo(a: FileGetInfoResponse.FileInfo): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGetInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FileGetInfoResponse): FileGetInfoResponse.AsObject;
  static serializeBinaryToWriter(message: FileGetInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGetInfoResponse;
  static deserializeBiinaryFromReader(message: FileGetInfoResponse, reader: jspb.BinaryReader): FileGetInfoResponse;
}

export namespace FileGetInfoResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    fileinfo: FileGetInfoResponse.FileInfo;
  }

  export class FileInfo extends jspb.Message {
    constructor ();
    getFileid(): BasicTypes_pb.FileID;
    setFileid(a: BasicTypes_pb.FileID): void;
    getSize(): number;
    setSize(a: number): void;
    getExpirationtime(): Timestamp_pb.Timestamp;
    setExpirationtime(a: Timestamp_pb.Timestamp): void;
    getDeleted(): boolean;
    setDeleted(a: boolean): void;
    getKeys(): BasicTypes_pb.KeyList;
    setKeys(a: BasicTypes_pb.KeyList): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileInfo.AsObject;
    static toObject(includeInstance: boolean, msg: FileInfo): FileInfo.AsObject;
    static serializeBinaryToWriter(message: FileInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileInfo;
    static deserializeBiinaryFromReader(message: FileInfo, reader: jspb.BinaryReader): FileInfo;
  }

  export namespace FileInfo {
    export type AsObject = {
      fileid: BasicTypes_pb.FileID;
      size: number;
      expirationtime: Timestamp_pb.Timestamp;
      deleted: boolean;
      keys: BasicTypes_pb.KeyList;
    }
  }

}

