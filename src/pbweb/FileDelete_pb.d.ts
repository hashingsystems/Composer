import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class FileDeleteTransactionBody extends jspb.Message {
  constructor ();
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileDeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FileDeleteTransactionBody): FileDeleteTransactionBody.AsObject;
  static serializeBinaryToWriter(message: FileDeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileDeleteTransactionBody;
  static deserializeBiinaryFromReader(message: FileDeleteTransactionBody, reader: jspb.BinaryReader): FileDeleteTransactionBody;
}

export namespace FileDeleteTransactionBody {
  export type AsObject = {
    fileid: BasicTypes_pb.FileID;
  }
}

