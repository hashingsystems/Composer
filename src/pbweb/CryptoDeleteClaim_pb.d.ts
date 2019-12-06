import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class CryptoDeleteClaimTransactionBody extends jspb.Message {
  constructor ();
  getAccountidtodeletefrom(): BasicTypes_pb.AccountID;
  setAccountidtodeletefrom(a: BasicTypes_pb.AccountID): void;
  getHashtodelete(): {};
  setHashtodelete(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoDeleteClaimTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoDeleteClaimTransactionBody): CryptoDeleteClaimTransactionBody.AsObject;
  static serializeBinaryToWriter(message: CryptoDeleteClaimTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoDeleteClaimTransactionBody;
  static deserializeBiinaryFromReader(message: CryptoDeleteClaimTransactionBody, reader: jspb.BinaryReader): CryptoDeleteClaimTransactionBody;
}

export namespace CryptoDeleteClaimTransactionBody {
  export type AsObject = {
    accountidtodeletefrom: BasicTypes_pb.AccountID;
    hashtodelete: {};
  }
}

