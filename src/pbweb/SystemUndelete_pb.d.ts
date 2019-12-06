import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class SystemUndeleteTransactionBody extends jspb.Message {
  constructor ();
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SystemUndeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: SystemUndeleteTransactionBody): SystemUndeleteTransactionBody.AsObject;
  static serializeBinaryToWriter(message: SystemUndeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SystemUndeleteTransactionBody;
  static deserializeBiinaryFromReader(message: SystemUndeleteTransactionBody, reader: jspb.BinaryReader): SystemUndeleteTransactionBody;
}

export namespace SystemUndeleteTransactionBody {
  export type AsObject = {
    fileid: BasicTypes_pb.FileID;
    contractid: BasicTypes_pb.ContractID;
  }
}

