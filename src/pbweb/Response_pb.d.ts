import * as jspb from "google-protobuf"

import * as GetByKey_pb from './GetByKey_pb';
import * as GetBySolidityID_pb from './GetBySolidityID_pb';
import * as ContractCallLocal_pb from './ContractCallLocal_pb';
import * as ContractGetBytecode_pb from './ContractGetBytecode_pb';
import * as ContractGetInfo_pb from './ContractGetInfo_pb';
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

export class Response extends jspb.Message {
  constructor ();
  getGetbykey(): GetByKey_pb.GetByKeyResponse;
  setGetbykey(a: GetByKey_pb.GetByKeyResponse): void;
  getGetbysolidityid(): GetBySolidityID_pb.GetBySolidityIDResponse;
  setGetbysolidityid(a: GetBySolidityID_pb.GetBySolidityIDResponse): void;
  getContractcalllocal(): ContractCallLocal_pb.ContractCallLocalResponse;
  setContractcalllocal(a: ContractCallLocal_pb.ContractCallLocalResponse): void;
  getContractgetbytecoderesponse(): ContractGetBytecode_pb.ContractGetBytecodeResponse;
  setContractgetbytecoderesponse(a: ContractGetBytecode_pb.ContractGetBytecodeResponse): void;
  getContractgetinfo(): ContractGetInfo_pb.ContractGetInfoResponse;
  setContractgetinfo(a: ContractGetInfo_pb.ContractGetInfoResponse): void;
  getContractgetrecordsresponse(): ContractGetRecords_pb.ContractGetRecordsResponse;
  setContractgetrecordsresponse(a: ContractGetRecords_pb.ContractGetRecordsResponse): void;
  getCryptogetaccountbalance(): CryptoGetAccountBalance_pb.CryptoGetAccountBalanceResponse;
  setCryptogetaccountbalance(a: CryptoGetAccountBalance_pb.CryptoGetAccountBalanceResponse): void;
  getCryptogetaccountrecords(): CryptoGetAccountRecords_pb.CryptoGetAccountRecordsResponse;
  setCryptogetaccountrecords(a: CryptoGetAccountRecords_pb.CryptoGetAccountRecordsResponse): void;
  getCryptogetinfo(): CryptoGetInfo_pb.CryptoGetInfoResponse;
  setCryptogetinfo(a: CryptoGetInfo_pb.CryptoGetInfoResponse): void;
  getCryptogetclaim(): CryptoGetClaim_pb.CryptoGetClaimResponse;
  setCryptogetclaim(a: CryptoGetClaim_pb.CryptoGetClaimResponse): void;
  getCryptogetproxystakers(): CryptoGetStakers_pb.CryptoGetStakersResponse;
  setCryptogetproxystakers(a: CryptoGetStakers_pb.CryptoGetStakersResponse): void;
  getFilegetcontents(): FileGetContents_pb.FileGetContentsResponse;
  setFilegetcontents(a: FileGetContents_pb.FileGetContentsResponse): void;
  getFilegetinfo(): FileGetInfo_pb.FileGetInfoResponse;
  setFilegetinfo(a: FileGetInfo_pb.FileGetInfoResponse): void;
  getTransactiongetreceipt(): TransactionGetReceipt_pb.TransactionGetReceiptResponse;
  setTransactiongetreceipt(a: TransactionGetReceipt_pb.TransactionGetReceiptResponse): void;
  getTransactiongetrecord(): TransactionGetRecord_pb.TransactionGetRecordResponse;
  setTransactiongetrecord(a: TransactionGetRecord_pb.TransactionGetRecordResponse): void;
  getTransactiongetfastrecord(): TransactionGetFastRecord_pb.TransactionGetFastRecordResponse;
  setTransactiongetfastrecord(a: TransactionGetFastRecord_pb.TransactionGetFastRecordResponse): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBiinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    getbykey: GetByKey_pb.GetByKeyResponse;
    getbysolidityid: GetBySolidityID_pb.GetBySolidityIDResponse;
    contractcalllocal: ContractCallLocal_pb.ContractCallLocalResponse;
    contractgetbytecoderesponse: ContractGetBytecode_pb.ContractGetBytecodeResponse;
    contractgetinfo: ContractGetInfo_pb.ContractGetInfoResponse;
    contractgetrecordsresponse: ContractGetRecords_pb.ContractGetRecordsResponse;
    cryptogetaccountbalance: CryptoGetAccountBalance_pb.CryptoGetAccountBalanceResponse;
    cryptogetaccountrecords: CryptoGetAccountRecords_pb.CryptoGetAccountRecordsResponse;
    cryptogetinfo: CryptoGetInfo_pb.CryptoGetInfoResponse;
    cryptogetclaim: CryptoGetClaim_pb.CryptoGetClaimResponse;
    cryptogetproxystakers: CryptoGetStakers_pb.CryptoGetStakersResponse;
    filegetcontents: FileGetContents_pb.FileGetContentsResponse;
    filegetinfo: FileGetInfo_pb.FileGetInfoResponse;
    transactiongetreceipt: TransactionGetReceipt_pb.TransactionGetReceiptResponse;
    transactiongetrecord: TransactionGetRecord_pb.TransactionGetRecordResponse;
    transactiongetfastrecord: TransactionGetFastRecord_pb.TransactionGetFastRecordResponse;
  }
}

