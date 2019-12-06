import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as Duration_pb from './Duration_pb';

export class CryptoCreateTransactionBody extends jspb.Message {
  constructor ();
  getKey(): BasicTypes_pb.Key;
  setKey(a: BasicTypes_pb.Key): void;
  getInitialbalance(): number;
  setInitialbalance(a: number): void;
  getProxyaccountid(): BasicTypes_pb.AccountID;
  setProxyaccountid(a: BasicTypes_pb.AccountID): void;
  getSendrecordthreshold(): number;
  setSendrecordthreshold(a: number): void;
  getReceiverecordthreshold(): number;
  setReceiverecordthreshold(a: number): void;
  getReceiversigrequired(): boolean;
  setReceiversigrequired(a: boolean): void;
  getAutorenewperiod(): Duration_pb.Duration;
  setAutorenewperiod(a: Duration_pb.Duration): void;
  getShardid(): BasicTypes_pb.ShardID;
  setShardid(a: BasicTypes_pb.ShardID): void;
  getRealmid(): BasicTypes_pb.RealmID;
  setRealmid(a: BasicTypes_pb.RealmID): void;
  getNewrealmadminkey(): BasicTypes_pb.Key;
  setNewrealmadminkey(a: BasicTypes_pb.Key): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoCreateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoCreateTransactionBody): CryptoCreateTransactionBody.AsObject;
  static serializeBinaryToWriter(message: CryptoCreateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoCreateTransactionBody;
  static deserializeBiinaryFromReader(message: CryptoCreateTransactionBody, reader: jspb.BinaryReader): CryptoCreateTransactionBody;
}

export namespace CryptoCreateTransactionBody {
  export type AsObject = {
    key: BasicTypes_pb.Key;
    initialbalance: number;
    proxyaccountid: BasicTypes_pb.AccountID;
    sendrecordthreshold: number;
    receiverecordthreshold: number;
    receiversigrequired: boolean;
    autorenewperiod: Duration_pb.Duration;
    shardid: BasicTypes_pb.ShardID;
    realmid: BasicTypes_pb.RealmID;
    newrealmadminkey: BasicTypes_pb.Key;
  }
}

