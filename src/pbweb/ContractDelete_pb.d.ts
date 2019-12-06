import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class ContractDeleteTransactionBody extends jspb.Message {
  constructor ();
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getTransferaccountid(): BasicTypes_pb.AccountID;
  setTransferaccountid(a: BasicTypes_pb.AccountID): void;
  getTransfercontractid(): BasicTypes_pb.ContractID;
  setTransfercontractid(a: BasicTypes_pb.ContractID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractDeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractDeleteTransactionBody): ContractDeleteTransactionBody.AsObject;
  static serializeBinaryToWriter(message: ContractDeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractDeleteTransactionBody;
  static deserializeBiinaryFromReader(message: ContractDeleteTransactionBody, reader: jspb.BinaryReader): ContractDeleteTransactionBody;
}

export namespace ContractDeleteTransactionBody {
  export type AsObject = {
    contractid: BasicTypes_pb.ContractID;
    transferaccountid: BasicTypes_pb.AccountID;
    transfercontractid: BasicTypes_pb.ContractID;
  }
}

