import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class CryptoDeleteTransactionBody extends jspb.Message {
  constructor ();
  getTransferaccountid(): BasicTypes_pb.AccountID;
  setTransferaccountid(a: BasicTypes_pb.AccountID): void;
  getDeleteaccountid(): BasicTypes_pb.AccountID;
  setDeleteaccountid(a: BasicTypes_pb.AccountID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoDeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoDeleteTransactionBody): CryptoDeleteTransactionBody.AsObject;
  static serializeBinaryToWriter(message: CryptoDeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoDeleteTransactionBody;
  static deserializeBiinaryFromReader(message: CryptoDeleteTransactionBody, reader: jspb.BinaryReader): CryptoDeleteTransactionBody;
}

export namespace CryptoDeleteTransactionBody {
  export type AsObject = {
    transferaccountid: BasicTypes_pb.AccountID;
    deleteaccountid: BasicTypes_pb.AccountID;
  }
}

