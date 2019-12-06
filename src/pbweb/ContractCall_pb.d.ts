import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class ContractCallTransactionBody extends jspb.Message {
  constructor ();
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getGas(): number;
  setGas(a: number): void;
  getAmount(): number;
  setAmount(a: number): void;
  getFunctionparameters(): {};
  setFunctionparameters(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCallTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCallTransactionBody): ContractCallTransactionBody.AsObject;
  static serializeBinaryToWriter(message: ContractCallTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCallTransactionBody;
  static deserializeBiinaryFromReader(message: ContractCallTransactionBody, reader: jspb.BinaryReader): ContractCallTransactionBody;
}

export namespace ContractCallTransactionBody {
  export type AsObject = {
    contractid: BasicTypes_pb.ContractID;
    gas: number;
    amount: number;
    functionparameters: {};
  }
}

