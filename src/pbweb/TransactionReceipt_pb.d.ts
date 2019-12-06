import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as ResponseCode_pb from './ResponseCode_pb';
import * as ExchangeRate_pb from './ExchangeRate_pb';

export class TransactionReceipt extends jspb.Message {
  constructor ();
  getStatus(): ResponseCodeEnum;
  setStatus(a: ResponseCodeEnum): void;
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getExchangerate(): ExchangeRate_pb.ExchangeRateSet;
  setExchangerate(a: ExchangeRate_pb.ExchangeRateSet): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionReceipt.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionReceipt): TransactionReceipt.AsObject;
  static serializeBinaryToWriter(message: TransactionReceipt, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionReceipt;
  static deserializeBiinaryFromReader(message: TransactionReceipt, reader: jspb.BinaryReader): TransactionReceipt;
}

export namespace TransactionReceipt {
  export type AsObject = {
    status: ResponseCodeEnum;
    accountid: BasicTypes_pb.AccountID;
    fileid: BasicTypes_pb.FileID;
    contractid: BasicTypes_pb.ContractID;
    exchangerate: ExchangeRate_pb.ExchangeRateSet;
  }
}

