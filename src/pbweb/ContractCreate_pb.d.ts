import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as Duration_pb from './Duration_pb';

export class ContractCreateTransactionBody extends jspb.Message {
  constructor ();
  getFileid(): BasicTypes_pb.FileID;
  setFileid(a: BasicTypes_pb.FileID): void;
  getAdminkey(): BasicTypes_pb.Key;
  setAdminkey(a: BasicTypes_pb.Key): void;
  getGas(): number;
  setGas(a: number): void;
  getInitialbalance(): number;
  setInitialbalance(a: number): void;
  getProxyaccountid(): BasicTypes_pb.AccountID;
  setProxyaccountid(a: BasicTypes_pb.AccountID): void;
  getAutorenewperiod(): Duration_pb.Duration;
  setAutorenewperiod(a: Duration_pb.Duration): void;
  getConstructorparameters(): {};
  setConstructorparameters(a: {}): void;
  getShardid(): BasicTypes_pb.ShardID;
  setShardid(a: BasicTypes_pb.ShardID): void;
  getRealmid(): BasicTypes_pb.RealmID;
  setRealmid(a: BasicTypes_pb.RealmID): void;
  getNewrealmadminkey(): BasicTypes_pb.Key;
  setNewrealmadminkey(a: BasicTypes_pb.Key): void;
  getMemo(): string;
  setMemo(a: string): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCreateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCreateTransactionBody): ContractCreateTransactionBody.AsObject;
  static serializeBinaryToWriter(message: ContractCreateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCreateTransactionBody;
  static deserializeBiinaryFromReader(message: ContractCreateTransactionBody, reader: jspb.BinaryReader): ContractCreateTransactionBody;
}

export namespace ContractCreateTransactionBody {
  export type AsObject = {
    fileid: BasicTypes_pb.FileID;
    adminkey: BasicTypes_pb.Key;
    gas: number;
    initialbalance: number;
    proxyaccountid: BasicTypes_pb.AccountID;
    autorenewperiod: Duration_pb.Duration;
    constructorparameters: {};
    shardid: BasicTypes_pb.ShardID;
    realmid: BasicTypes_pb.RealmID;
    newrealmadminkey: BasicTypes_pb.Key;
    memo: string;
  }
}

