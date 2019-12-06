import * as jspb from "google-protobuf"

import * as GetByKey_pb from './GetByKey_pb';
import * as GetBySolidityID_pb from './GetBySolidityID_pb';
import * as ContractCallLocal_pb from './ContractCallLocal_pb';
import * as ContractGetInfo_pb from './ContractGetInfo_pb';
import * as ContractGetBytecode_pb from './ContractGetBytecode_pb';
import * as ContractGetRecords_pb from './ContractGetRecords_pb';
import * as CryptoGetAccountBalance_pb from './CryptoGetAccountBalance_pb';
import * as CryptoGetAccountRecords_pb from './CryptoGetAccountRecords_pb';
import * as CryptoGetInfo_pb from './CryptoGetInfo_pb';
import * as CryptoGetClaim_pb from './CryptoGetClaim_pb';
import * as CryptoGetStakers_pb from './CryptoGetStakers_pb';
import * as FileGetContents_pb from './FileGetContents_pb';
import * as FileGetInfo_pb from './FileGetInfo_pb';
import * as TransactionGetReceipt_pb from './TransactionGetReceipt_pb';
import * as TransactionGetRecord_pb from './TransactionGetRecord_pb';
import * as TransactionGetFastRecord_pb from './TransactionGetFastRecord_pb';

export class Query extends jspb.Message {
  constructor ();
  getGetbykey(): GetByKey_pb.GetByKeyQuery;
  setGetbykey(a: GetByKey_pb.GetByKeyQuery): void;
  getGetbysolidityid(): GetBySolidityID_pb.GetBySolidityIDQuery;
  setGetbysolidityid(a: GetBySolidityID_pb.GetBySolidityIDQuery): void;
  getContractcalllocal(): ContractCallLocal_pb.ContractCallLocalQuery;
  setContractcalllocal(a: ContractCallLocal_pb.ContractCallLocalQuery): void;
  getContractgetinfo(): ContractGetInfo_pb.ContractGetInfoQuery;
  setContractgetinfo(a: ContractGetInfo_pb.ContractGetInfoQuery): void;
  getContractgetbytecode(): ContractGetBytecode_pb.ContractGetBytecodeQuery;
  setContractgetbytecode(a: ContractGetBytecode_pb.ContractGetBytecodeQuery): void;
  getContractgetrecords(): ContractGetRecords_pb.ContractGetRecordsQuery;
  setContractgetrecords(a: ContractGetRecords_pb.ContractGetRecordsQuery): void;
  getCryptogetaccountbalance(): CryptoGetAccountBalance_pb.CryptoGetAccountBalanceQuery;
  setCryptogetaccountbalance(a: CryptoGetAccountBalance_pb.CryptoGetAccountBalanceQuery): void;
  getCryptogetaccountrecords(): CryptoGetAccountRecords_pb.CryptoGetAccountRecordsQuery;
  setCryptogetaccountrecords(a: CryptoGetAccountRecords_pb.CryptoGetAccountRecordsQuery): void;
  getCryptogetinfo(): CryptoGetInfo_pb.CryptoGetInfoQuery;
  setCryptogetinfo(a: CryptoGetInfo_pb.CryptoGetInfoQuery): void;
  getCryptogetclaim(): CryptoGetClaim_pb.CryptoGetClaimQuery;
  setCryptogetclaim(a: CryptoGetClaim_pb.CryptoGetClaimQuery): void;
  getCryptogetproxystakers(): CryptoGetStakers_pb.CryptoGetStakersQuery;
  setCryptogetproxystakers(a: CryptoGetStakers_pb.CryptoGetStakersQuery): void;
  getFilegetcontents(): FileGetContents_pb.FileGetContentsQuery;
  setFilegetcontents(a: FileGetContents_pb.FileGetContentsQuery): void;
  getFilegetinfo(): FileGetInfo_pb.FileGetInfoQuery;
  setFilegetinfo(a: FileGetInfo_pb.FileGetInfoQuery): void;
  getTransactiongetreceipt(): TransactionGetReceipt_pb.TransactionGetReceiptQuery;
  setTransactiongetreceipt(a: TransactionGetReceipt_pb.TransactionGetReceiptQuery): void;
  getTransactiongetrecord(): TransactionGetRecord_pb.TransactionGetRecordQuery;
  setTransactiongetrecord(a: TransactionGetRecord_pb.TransactionGetRecordQuery): void;
  getTransactiongetfastrecord(): TransactionGetFastRecord_pb.TransactionGetFastRecordQuery;
  setTransactiongetfastrecord(a: TransactionGetFastRecord_pb.TransactionGetFastRecordQuery): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Query.AsObject;
  static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
  static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Query;
  static deserializeBiinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
  export type AsObject = {
    getbykey: GetByKey_pb.GetByKeyQuery;
    getbysolidityid: GetBySolidityID_pb.GetBySolidityIDQuery;
    contractcalllocal: ContractCallLocal_pb.ContractCallLocalQuery;
    contractgetinfo: ContractGetInfo_pb.ContractGetInfoQuery;
    contractgetbytecode: ContractGetBytecode_pb.ContractGetBytecodeQuery;
    contractgetrecords: ContractGetRecords_pb.ContractGetRecordsQuery;
    cryptogetaccountbalance: CryptoGetAccountBalance_pb.CryptoGetAccountBalanceQuery;
    cryptogetaccountrecords: CryptoGetAccountRecords_pb.CryptoGetAccountRecordsQuery;
    cryptogetinfo: CryptoGetInfo_pb.CryptoGetInfoQuery;
    cryptogetclaim: CryptoGetClaim_pb.CryptoGetClaimQuery;
    cryptogetproxystakers: CryptoGetStakers_pb.CryptoGetStakersQuery;
    filegetcontents: FileGetContents_pb.FileGetContentsQuery;
    filegetinfo: FileGetInfo_pb.FileGetInfoQuery;
    transactiongetreceipt: TransactionGetReceipt_pb.TransactionGetReceiptQuery;
    transactiongetrecord: TransactionGetRecord_pb.TransactionGetRecordQuery;
    transactiongetfastrecord: TransactionGetFastRecord_pb.TransactionGetFastRecordQuery;
  }
}

