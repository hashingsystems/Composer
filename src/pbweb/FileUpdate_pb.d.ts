import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as Timestamp_pb from './Timestamp_pb';

export class FileUpdateTransactionBody extends jspb.Message {
  constructor ();
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getExpirationtime(): Timestamp_pb.Timestamp;
  setExpirationtime(a: Timestamp_pb.Timestamp): void;
  getKeys(): BasicTypes_pb.KeyList;
  setKeys(a: BasicTypes_pb.KeyList): void;
  getContents(): {};
  setContents(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileUpdateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FileUpdateTransactionBody): FileUpdateTransactionBody.AsObject;
  static serializeBinaryToWriter(message: FileUpdateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileUpdateTransactionBody;
  static deserializeBiinaryFromReader(message: FileUpdateTransactionBody, reader: jspb.BinaryReader): FileUpdateTransactionBody;
}

export namespace FileUpdateTransactionBody {
  export type AsObject = {
    fileid: BasicTypes_pb.FileID;
    expirationtime: Timestamp_pb.Timestamp;
    keys: BasicTypes_pb.KeyList;
    contents: {};
  }
}

