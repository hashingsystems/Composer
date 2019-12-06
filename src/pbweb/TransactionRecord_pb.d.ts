import * as jspb from "google-protobuf"

import * as Timestamp_pb from './Timestamp_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as TransactionReceipt_pb from './TransactionReceipt_pb';
import * as CryptoTransfer_pb from './CryptoTransfer_pb';
import * as ContractCallLocal_pb from './ContractCallLocal_pb';

export class TransactionRecord extends jspb.Message {
  constructor ();
  getReceipt(): TransactionReceipt_pb.TransactionReceipt;
  setReceipt(a: TransactionReceipt_pb.TransactionReceipt): void;
  getTransactionhash(): {};
  setTransactionhash(a: {}): void;
  getConsensustimestamp(): Timestamp_pb.Timestamp;
  setConsensustimestamp(a: Timestamp_pb.Timestamp): void;
  getTransactionid(): BasicTypes_pb.TransactionID;
  setTransactionid(a: BasicTypes_pb.TransactionID): void;
  getMemo(): string;
  setMemo(a: string): void;
  getTransactionfee(): number;
  setTransactionfee(a: number): void;
  getContractcallresult(): ContractCallLocal_pb.ContractFunctionResult;
  setContractcallresult(a: ContractCallLocal_pb.ContractFunctionResult): void;
  getContractcreateresult(): ContractCallLocal_pb.ContractFunctionResult;
  setContractcreateresult(a: ContractCallLocal_pb.ContractFunctionResult): void;
  getTransferlist(): CryptoTransfer_pb.TransferList;
  setTransferlist(a: CryptoTransfer_pb.TransferList): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionRecord.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionRecord): TransactionRecord.AsObject;
  static serializeBinaryToWriter(message: TransactionRecord, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionRecord;
  static deserializeBiinaryFromReader(message: TransactionRecord, reader: jspb.BinaryReader): TransactionRecord;
}

export namespace TransactionRecord {
  export type AsObject = {
    receipt: TransactionReceipt_pb.TransactionReceipt;
    transactionhash: {};
    consensustimestamp: Timestamp_pb.Timestamp;
    transactionid: BasicTypes_pb.TransactionID;
    memo: string;
    transactionfee: number;
    contractcallresult: ContractCallLocal_pb.ContractFunctionResult;
    contractcreateresult: ContractCallLocal_pb.ContractFunctionResult;
    transferlist: CryptoTransfer_pb.TransferList;
  }
}

