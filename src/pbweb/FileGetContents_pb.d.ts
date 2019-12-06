import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseHeader_pb from './ResponseHeader_pb';

export class FileGetContentsQuery extends jspb.Message {
  constructor ();
  getHeader(): QueryHeader_pb.QueryHeader;
  setHeader(a: QueryHeader_pb.QueryHeader): void;
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGetContentsQuery.AsObject;
  static toObject(includeInstance: boolean, msg: FileGetContentsQuery): FileGetContentsQuery.AsObject;
  static serializeBinaryToWriter(message: FileGetContentsQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGetContentsQuery;
  static deserializeBiinaryFromReader(message: FileGetContentsQuery, reader: jspb.BinaryReader): FileGetContentsQuery;
}

export namespace FileGetContentsQuery {
  export type AsObject = {
    header: QueryHeader_pb.QueryHeader;
    fileid: BasicTypes_pb.FileID;
  }
}

export class FileGetContentsResponse extends jspb.Message {
  constructor ();
  getHeader(): ResponseHeader_pb.ResponseHeader;
  setHeader(a: ResponseHeader_pb.ResponseHeader): void;
  getFilecontents(): FileGetContentsResponse.FileContents;
  setFilecontents(a: FileGetContentsResponse.FileContents): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGetContentsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FileGetContentsResponse): FileGetContentsResponse.AsObject;
  static serializeBinaryToWriter(message: FileGetContentsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGetContentsResponse;
  static deserializeBiinaryFromReader(message: FileGetContentsResponse, reader: jspb.BinaryReader): FileGetContentsResponse;
}

export namespace FileGetContentsResponse {
  export type AsObject = {
    header: ResponseHeader_pb.ResponseHeader;
    filecontents: FileGetContentsResponse.FileContents;
  }

  export class FileContents extends jspb.Message {
    constructor ();
    getFileid(): BasicTypes_pb.FileID;
    setFileid(a: BasicTypes_pb.FileID): void;
    getContents(): {};
    setContents(a: {}): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileContents.AsObject;
    static toObject(includeInstance: boolean, msg: FileContents): FileContents.AsObject;
    static serializeBinaryToWriter(message: FileContents, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileContents;
    static deserializeBiinaryFromReader(message: FileContents, reader: jspb.BinaryReader): FileContents;
  }

  export namespace FileContents {
    export type AsObject = {
      fileid: BasicTypes_pb.FileID;
      contents: {};
    }
  }

}

