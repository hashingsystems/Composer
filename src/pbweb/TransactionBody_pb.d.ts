import * as jspb from "google-protobuf"

import * as SystemDelete_pb from './SystemDelete_pb';
import * as SystemUndelete_pb from './SystemUndelete_pb';
import * as Freeze_pb from './Freeze_pb';
import * as ContractCall_pb from './ContractCall_pb';
import * as ContractCreate_pb from './ContractCreate_pb';
import * as ContractUpdate_pb from './ContractUpdate_pb';
import * as CryptoAddClaim_pb from './CryptoAddClaim_pb';
import * as CryptoCreate_pb from './CryptoCreate_pb';
import * as CryptoDelete_pb from './CryptoDelete_pb';
import * as CryptoDeleteClaim_pb from './CryptoDeleteClaim_pb';
import * as CryptoTransfer_pb from './CryptoTransfer_pb';
import * as CryptoUpdate_pb from './CryptoUpdate_pb';
import * as FileAppend_pb from './FileAppend_pb';
import * as FileCreate_pb from './FileCreate_pb';
import * as FileDelete_pb from './FileDelete_pb';
import * as FileUpdate_pb from './FileUpdate_pb';
import * as Duration_pb from './Duration_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as ContractDelete_pb from './ContractDelete_pb';

export class TransactionBody extends jspb.Message {
  constructor ();
  getTransactionid(): BasicTypes_pb.TransactionID;
  setTransactionid(a: BasicTypes_pb.TransactionID): void;
  getNodeaccountid(): BasicTypes_pb.AccountID;
  setNodeaccountid(a: BasicTypes_pb.AccountID): void;
  getTransactionfee(): number;
  setTransactionfee(a: number): void;
  getTransactionvalidduration(): Duration_pb.Duration;
  setTransactionvalidduration(a: Duration_pb.Duration): void;
  getGeneraterecord(): boolean;
  setGeneraterecord(a: boolean): void;
  getMemo(): string;
  setMemo(a: string): void;
  getContractcall(): ContractCall_pb.ContractCallTransactionBody;
  setContractcall(a: ContractCall_pb.ContractCallTransactionBody): void;
  getContractcreateinstance(): ContractCreate_pb.ContractCreateTransactionBody;
  setContractcreateinstance(a: ContractCreate_pb.ContractCreateTransactionBody): void;
  getContractupdateinstance(): ContractUpdate_pb.ContractUpdateTransactionBody;
  setContractupdateinstance(a: ContractUpdate_pb.ContractUpdateTransactionBody): void;
  getContractdeleteinstance(): ContractDelete_pb.ContractDeleteTransactionBody;
  setContractdeleteinstance(a: ContractDelete_pb.ContractDeleteTransactionBody): void;
  getCryptoaddclaim(): CryptoAddClaim_pb.CryptoAddClaimTransactionBody;
  setCryptoaddclaim(a: CryptoAddClaim_pb.CryptoAddClaimTransactionBody): void;
  getCryptocreateaccount(): CryptoCreate_pb.CryptoCreateTransactionBody;
  setCryptocreateaccount(a: CryptoCreate_pb.CryptoCreateTransactionBody): void;
  getCryptodelete(): CryptoDelete_pb.CryptoDeleteTransactionBody;
  setCryptodelete(a: CryptoDelete_pb.CryptoDeleteTransactionBody): void;
  getCryptodeleteclaim(): CryptoDeleteClaim_pb.CryptoDeleteClaimTransactionBody;
  setCryptodeleteclaim(a: CryptoDeleteClaim_pb.CryptoDeleteClaimTransactionBody): void;
  getCryptotransfer(): CryptoTransfer_pb.CryptoTransferTransactionBody;
  setCryptotransfer(a: CryptoTransfer_pb.CryptoTransferTransactionBody): void;
  getCryptoupdateaccount(): CryptoUpdate_pb.CryptoUpdateTransactionBody;
  setCryptoupdateaccount(a: CryptoUpdate_pb.CryptoUpdateTransactionBody): void;
  getFileappend(): FileAppend_pb.FileAppendTransactionBody;
  setFileappend(a: FileAppend_pb.FileAppendTransactionBody): void;
  getFilecreate(): FileCreate_pb.FileCreateTransactionBody;
  setFilecreate(a: FileCreate_pb.FileCreateTransactionBody): void;
  getFiledelete(): FileDelete_pb.FileDeleteTransactionBody;
  setFiledelete(a: FileDelete_pb.FileDeleteTransactionBody): void;
  getFileupdate(): FileUpdate_pb.FileUpdateTransactionBody;
  setFileupdate(a: FileUpdate_pb.FileUpdateTransactionBody): void;
  getSystemdelete(): SystemDelete_pb.SystemDeleteTransactionBody;
  setSystemdelete(a: SystemDelete_pb.SystemDeleteTransactionBody): void;
  getSystemundelete(): SystemUndelete_pb.SystemUndeleteTransactionBody;
  setSystemundelete(a: SystemUndelete_pb.SystemUndeleteTransactionBody): void;
  getFreeze(): Freeze_pb.FreezeTransactionBody;
  setFreeze(a: Freeze_pb.FreezeTransactionBody): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionBody): TransactionBody.AsObject;
  static serializeBinaryToWriter(message: TransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionBody;
  static deserializeBiinaryFromReader(message: TransactionBody, reader: jspb.BinaryReader): TransactionBody;
}

export namespace TransactionBody {
  export type AsObject = {
    transactionid: BasicTypes_pb.TransactionID;
    nodeaccountid: BasicTypes_pb.AccountID;
    transactionfee: number;
    transactionvalidduration: Duration_pb.Duration;
    generaterecord: boolean;
    memo: string;
    contractcall: ContractCall_pb.ContractCallTransactionBody;
    contractcreateinstance: ContractCreate_pb.ContractCreateTransactionBody;
    contractupdateinstance: ContractUpdate_pb.ContractUpdateTransactionBody;
    contractdeleteinstance: ContractDelete_pb.ContractDeleteTransactionBody;
    cryptoaddclaim: CryptoAddClaim_pb.CryptoAddClaimTransactionBody;
    cryptocreateaccount: CryptoCreate_pb.CryptoCreateTransactionBody;
    cryptodelete: CryptoDelete_pb.CryptoDeleteTransactionBody;
    cryptodeleteclaim: CryptoDeleteClaim_pb.CryptoDeleteClaimTransactionBody;
    cryptotransfer: CryptoTransfer_pb.CryptoTransferTransactionBody;
    cryptoupdateaccount: CryptoUpdate_pb.CryptoUpdateTransactionBody;
    fileappend: FileAppend_pb.FileAppendTransactionBody;
    filecreate: FileCreate_pb.FileCreateTransactionBody;
    filedelete: FileDelete_pb.FileDeleteTransactionBody;
    fileupdate: FileUpdate_pb.FileUpdateTransactionBody;
    systemdelete: SystemDelete_pb.SystemDeleteTransactionBody;
    systemundelete: SystemUndelete_pb.SystemUndeleteTransactionBody;
    freeze: Freeze_pb.FreezeTransactionBody;
  }
}

