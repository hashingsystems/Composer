import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as Duration_pb from './Duration_pb';
import * as Timestamp_pb from './Timestamp_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';

export class CryptoUpdateTransactionBody extends jspb.Message {
  constructor ();
  getAccountidtoupdate(): BasicTypes_pb.AccountID;
  setAccountidtoupdate(a: BasicTypes_pb.AccountID): void;
  getKey(): BasicTypes_pb.Key;
  setKey(a: BasicTypes_pb.Key): void;
  getProxyaccountid(): BasicTypes_pb.AccountID;
  setProxyaccountid(a: BasicTypes_pb.AccountID): void;
  getProxyfraction(): number;
  setProxyfraction(a: number): void;
  getSendrecordthreshold(): number;
  setSendrecordthreshold(a: number): void;
  getSendrecordthresholdwrapper(): google_protobuf_wrappers_pb.UInt64Value;
  setSendrecordthresholdwrapper(a: google_protobuf_wrappers_pb.UInt64Value): void;
  getReceiverecordthreshold(): number;
  setReceiverecordthreshold(a: number): void;
  getReceiverecordthresholdwrapper(): google_protobuf_wrappers_pb.UInt64Value;
  setReceiverecordthresholdwrapper(a: google_protobuf_wrappers_pb.UInt64Value): void;
  getAutorenewperiod(): Duration_pb.Duration;
  setAutorenewperiod(a: Duration_pb.Duration): void;
  getExpirationtime(): Timestamp_pb.Timestamp;
  setExpirationtime(a: Timestamp_pb.Timestamp): void;
  getReceiversigrequired(): boolean;
  setReceiversigrequired(a: boolean): void;
  getReceiversigrequiredwrapper(): google_protobuf_wrappers_pb.BoolValue;
  setReceiversigrequiredwrapper(a: google_protobuf_wrappers_pb.BoolValue): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoUpdateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoUpdateTransactionBody): CryptoUpdateTransactionBody.AsObject;
  static serializeBinaryToWriter(message: CryptoUpdateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoUpdateTransactionBody;
  static deserializeBiinaryFromReader(message: CryptoUpdateTransactionBody, reader: jspb.BinaryReader): CryptoUpdateTransactionBody;
}

export namespace CryptoUpdateTransactionBody {
  export type AsObject = {
    accountidtoupdate: BasicTypes_pb.AccountID;
    key: BasicTypes_pb.Key;
    proxyaccountid: BasicTypes_pb.AccountID;
    proxyfraction: number;
    sendrecordthreshold: number;
    sendrecordthresholdwrapper: google_protobuf_wrappers_pb.UInt64Value;
    receiverecordthreshold: number;
    receiverecordthresholdwrapper: google_protobuf_wrappers_pb.UInt64Value;
    autorenewperiod: Duration_pb.Duration;
    expirationtime: Timestamp_pb.Timestamp;
    receiversigrequired: boolean;
    receiversigrequiredwrapper: google_protobuf_wrappers_pb.BoolValue;
  }
}

