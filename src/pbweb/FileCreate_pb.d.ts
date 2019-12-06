import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as Timestamp_pb from './Timestamp_pb';

export class FileCreateTransactionBody extends jspb.Message {
  constructor ();
  getExpirationtime(): Timestamp_pb.Timestamp;
  setExpirationtime(a: Timestamp_pb.Timestamp): void;
  getKeys(): BasicTypes_pb.KeyList;
  setKeys(a: BasicTypes_pb.KeyList): void;
  getContents(): {};
  setContents(a: {}): void;
  getShardid(): BasicTypes_pb.ShardID;
  setShardid(a: BasicTypes_pb.ShardID): void;
  getRealmid(): BasicTypes_pb.RealmID;
  setRealmid(a: BasicTypes_pb.RealmID): void;
  getNewrealmadminkey(): BasicTypes_pb.Key;
  setNewrealmadminkey(a: BasicTypes_pb.Key): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileCreateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FileCreateTransactionBody): FileCreateTransactionBody.AsObject;
  static serializeBinaryToWriter(message: FileCreateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileCreateTransactionBody;
  static deserializeBiinaryFromReader(message: FileCreateTransactionBody, reader: jspb.BinaryReader): FileCreateTransactionBody;
}

export namespace FileCreateTransactionBody {
  export type AsObject = {
    expirationtime: Timestamp_pb.Timestamp;
    keys: BasicTypes_pb.KeyList;
    contents: {};
    shardid: BasicTypes_pb.ShardID;
    realmid: BasicTypes_pb.RealmID;
    newrealmadminkey: BasicTypes_pb.Key;
  }
}

