import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as Duration_pb from './Duration_pb';
import * as Timestamp_pb from './Timestamp_pb';

export class ContractUpdateTransactionBody extends jspb.Message {
  constructor ();
  getContractid(): BasicTypes_pb.ContractID;
  setContractid(a: BasicTypes_pb.ContractID): void;
  getExpirationtime(): Timestamp_pb.Timestamp;
  setExpirationtime(a: Timestamp_pb.Timestamp): void;
  getAdminkey(): BasicTypes_pb.Key;
  setAdminkey(a: BasicTypes_pb.Key): void;
  getProxyaccountid(): BasicTypes_pb.AccountID;
  setProxyaccountid(a: BasicTypes_pb.AccountID): void;
  getAutorenewperiod(): Duration_pb.Duration;
  setAutorenewperiod(a: Duration_pb.Duration): void;
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getMemo(): string;
  setMemo(a: string): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractUpdateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractUpdateTransactionBody): ContractUpdateTransactionBody.AsObject;
  static serializeBinaryToWriter(message: ContractUpdateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractUpdateTransactionBody;
  static deserializeBiinaryFromReader(message: ContractUpdateTransactionBody, reader: jspb.BinaryReader): ContractUpdateTransactionBody;
}

export namespace ContractUpdateTransactionBody {
  export type AsObject = {
    contractid: BasicTypes_pb.ContractID;
    expirationtime: Timestamp_pb.Timestamp;
    adminkey: BasicTypes_pb.Key;
    proxyaccountid: BasicTypes_pb.AccountID;
    autorenewperiod: Duration_pb.Duration;
    fileid: BasicTypes_pb.FileID;
    memo: string;
  }
}

