import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class AccountAmount extends jspb.Message {
  constructor ();
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getAmount(): number;
  setAmount(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountAmount.AsObject;
  static toObject(includeInstance: boolean, msg: AccountAmount): AccountAmount.AsObject;
  static serializeBinaryToWriter(message: AccountAmount, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountAmount;
  static deserializeBiinaryFromReader(message: AccountAmount, reader: jspb.BinaryReader): AccountAmount;
}

export namespace AccountAmount {
  export type AsObject = {
    accountid: BasicTypes_pb.AccountID;
    amount: number;
  }
}

export class TransferList extends jspb.Message {
  constructor ();
  getAccountamountsList(): AccountAmount[];
  setAccountamountsList(a: AccountAmount[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransferList.AsObject;
  static toObject(includeInstance: boolean, msg: TransferList): TransferList.AsObject;
  static serializeBinaryToWriter(message: TransferList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransferList;
  static deserializeBiinaryFromReader(message: TransferList, reader: jspb.BinaryReader): TransferList;
}

export namespace TransferList {
  export type AsObject = {
    accountamountsList: AccountAmount[];
  }
}

export class CryptoTransferTransactionBody extends jspb.Message {
  constructor ();
  getTransfers(): TransferList;
  setTransfers(a: TransferList): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoTransferTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoTransferTransactionBody): CryptoTransferTransactionBody.AsObject;
  static serializeBinaryToWriter(message: CryptoTransferTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoTransferTransactionBody;
  static deserializeBiinaryFromReader(message: CryptoTransferTransactionBody, reader: jspb.BinaryReader): CryptoTransferTransactionBody;
}

export namespace CryptoTransferTransactionBody {
  export type AsObject = {
    transfers: TransferList;
  }
}

