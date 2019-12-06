import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class FileAppendTransactionBody extends jspb.Message {
  constructor ();
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getContents(): {};
  setContents(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileAppendTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FileAppendTransactionBody): FileAppendTransactionBody.AsObject;
  static serializeBinaryToWriter(message: FileAppendTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileAppendTransactionBody;
  static deserializeBiinaryFromReader(message: FileAppendTransactionBody, reader: jspb.BinaryReader): FileAppendTransactionBody;
}

export namespace FileAppendTransactionBody {
  export type AsObject = {
    fileid: BasicTypes_pb.FileID;
    contents: {};
  }
}

