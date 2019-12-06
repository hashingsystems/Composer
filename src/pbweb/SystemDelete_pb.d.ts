import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as Timestamp_pb from './Timestamp_pb';

export class SystemDeleteTransactionBody extends jspb.Message {
  constructor ();
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getExpirationtime(): Timestamp_pb.TimestampSeconds;
  setExpirationtime(a: Timestamp_pb.TimestampSeconds): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SystemDeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: SystemDeleteTransactionBody): SystemDeleteTransactionBody.AsObject;
  static serializeBinaryToWriter(message: SystemDeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SystemDeleteTransactionBody;
  static deserializeBiinaryFromReader(message: SystemDeleteTransactionBody, reader: jspb.BinaryReader): SystemDeleteTransactionBody;
}

export namespace SystemDeleteTransactionBody {
  export type AsObject = {
    fileid: BasicTypes_pb.FileID;
    contractid: BasicTypes_pb.ContractID;
    expirationtime: Timestamp_pb.TimestampSeconds;
  }
}

