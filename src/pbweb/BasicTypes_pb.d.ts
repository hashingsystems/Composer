import * as jspb from "google-protobuf"

import * as Timestamp_pb from './Timestamp_pb';
import * as Duration_pb from './Duration_pb';

export class ShardID extends jspb.Message {
  constructor ();
  getShardnum(): number;
  setShardnum(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ShardID.AsObject;
  static toObject(includeInstance: boolean, msg: ShardID): ShardID.AsObject;
  static serializeBinaryToWriter(message: ShardID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ShardID;
  static deserializeBiinaryFromReader(message: ShardID, reader: jspb.BinaryReader): ShardID;
}

export namespace ShardID {
  export type AsObject = {
    shardnum: number;
  }
}

export class RealmID extends jspb.Message {
  constructor ();
  getShardnum(): number;
  setShardnum(a: number): void;
  getRealmnum(): number;
  setRealmnum(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RealmID.AsObject;
  static toObject(includeInstance: boolean, msg: RealmID): RealmID.AsObject;
  static serializeBinaryToWriter(message: RealmID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RealmID;
  static deserializeBiinaryFromReader(message: RealmID, reader: jspb.BinaryReader): RealmID;
}

export namespace RealmID {
  export type AsObject = {
    shardnum: number;
    realmnum: number;
  }
}

export class AccountID extends jspb.Message {
  constructor ();
  getShardnum(): number;
  setShardnum(a: number): void;
  getRealmnum(): number;
  setRealmnum(a: number): void;
  getAccountnum(): number;
  setAccountnum(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountID.AsObject;
  static toObject(includeInstance: boolean, msg: AccountID): AccountID.AsObject;
  static serializeBinaryToWriter(message: AccountID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountID;
  static deserializeBiinaryFromReader(message: AccountID, reader: jspb.BinaryReader): AccountID;
}

export namespace AccountID {
  export type AsObject = {
    shardnum: number;
    realmnum: number;
    accountnum: number;
  }
}

export class FileID extends jspb.Message {
  constructor ();
  getShardnum(): number;
  setShardnum(a: number): void;
  getRealmnum(): number;
  setRealmnum(a: number): void;
  getFilenum(): number;
  setFilenum(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileID.AsObject;
  static toObject(includeInstance: boolean, msg: FileID): FileID.AsObject;
  static serializeBinaryToWriter(message: FileID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileID;
  static deserializeBiinaryFromReader(message: FileID, reader: jspb.BinaryReader): FileID;
}

export namespace FileID {
  export type AsObject = {
    shardnum: number;
    realmnum: number;
    filenum: number;
  }
}

export class ContractID extends jspb.Message {
  constructor ();
  getShardnum(): number;
  setShardnum(a: number): void;
  getRealmnum(): number;
  setRealmnum(a: number): void;
  getContractnum(): number;
  setContractnum(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractID.AsObject;
  static toObject(includeInstance: boolean, msg: ContractID): ContractID.AsObject;
  static serializeBinaryToWriter(message: ContractID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractID;
  static deserializeBiinaryFromReader(message: ContractID, reader: jspb.BinaryReader): ContractID;
}

export namespace ContractID {
  export type AsObject = {
    shardnum: number;
    realmnum: number;
    contractnum: number;
  }
}

export class TransactionID extends jspb.Message {
  constructor ();
  getTransactionvalidstart(): Timestamp_pb.Timestamp;
  setTransactionvalidstart(a: Timestamp_pb.Timestamp): void;
  getAccountid(): AccountID;
  setAccountid(a: AccountID): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionID.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionID): TransactionID.AsObject;
  static serializeBinaryToWriter(message: TransactionID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionID;
  static deserializeBiinaryFromReader(message: TransactionID, reader: jspb.BinaryReader): TransactionID;
}

export namespace TransactionID {
  export type AsObject = {
    transactionvalidstart: Timestamp_pb.Timestamp;
    accountid: AccountID;
  }
}

export class Key extends jspb.Message {
  constructor ();
  getContractid(): ContractID;
  setContractid(a: ContractID): void;
  getEd25519(): {};
  setEd25519(a: {}): void;
  getRsa3072(): {};
  setRsa3072(a: {}): void;
  getEcdsa384(): {};
  setEcdsa384(a: {}): void;
  getThresholdkey(): ThresholdKey;
  setThresholdkey(a: ThresholdKey): void;
  getKeylist(): KeyList;
  setKeylist(a: KeyList): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Key.AsObject;
  static toObject(includeInstance: boolean, msg: Key): Key.AsObject;
  static serializeBinaryToWriter(message: Key, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Key;
  static deserializeBiinaryFromReader(message: Key, reader: jspb.BinaryReader): Key;
}

export namespace Key {
  export type AsObject = {
    contractid: ContractID;
    ed25519: {};
    rsa3072: {};
    ecdsa384: {};
    thresholdkey: ThresholdKey;
    keylist: KeyList;
  }
}

export class ThresholdKey extends jspb.Message {
  constructor ();
  getThreshold(): number;
  setThreshold(a: number): void;
  getKeys(): KeyList;
  setKeys(a: KeyList): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ThresholdKey.AsObject;
  static toObject(includeInstance: boolean, msg: ThresholdKey): ThresholdKey.AsObject;
  static serializeBinaryToWriter(message: ThresholdKey, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ThresholdKey;
  static deserializeBiinaryFromReader(message: ThresholdKey, reader: jspb.BinaryReader): ThresholdKey;
}

export namespace ThresholdKey {
  export type AsObject = {
    threshold: number;
    keys: KeyList;
  }
}

export class KeyList extends jspb.Message {
  constructor ();
  getKeysList(): Key[];
  setKeysList(a: Key[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyList.AsObject;
  static toObject(includeInstance: boolean, msg: KeyList): KeyList.AsObject;
  static serializeBinaryToWriter(message: KeyList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyList;
  static deserializeBiinaryFromReader(message: KeyList, reader: jspb.BinaryReader): KeyList;
}

export namespace KeyList {
  export type AsObject = {
    keysList: Key[];
  }
}

export class Signature extends jspb.Message {
  constructor ();
  getContract(): {};
  setContract(a: {}): void;
  getEd25519(): {};
  setEd25519(a: {}): void;
  getRsa3072(): {};
  setRsa3072(a: {}): void;
  getEcdsa384(): {};
  setEcdsa384(a: {}): void;
  getThresholdsignature(): ThresholdSignature;
  setThresholdsignature(a: ThresholdSignature): void;
  getSignaturelist(): SignatureList;
  setSignaturelist(a: SignatureList): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Signature.AsObject;
  static toObject(includeInstance: boolean, msg: Signature): Signature.AsObject;
  static serializeBinaryToWriter(message: Signature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Signature;
  static deserializeBiinaryFromReader(message: Signature, reader: jspb.BinaryReader): Signature;
}

export namespace Signature {
  export type AsObject = {
    contract: {};
    ed25519: {};
    rsa3072: {};
    ecdsa384: {};
    thresholdsignature: ThresholdSignature;
    signaturelist: SignatureList;
  }
}

export class ThresholdSignature extends jspb.Message {
  constructor ();
  getSigs(): SignatureList;
  setSigs(a: SignatureList): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ThresholdSignature.AsObject;
  static toObject(includeInstance: boolean, msg: ThresholdSignature): ThresholdSignature.AsObject;
  static serializeBinaryToWriter(message: ThresholdSignature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ThresholdSignature;
  static deserializeBiinaryFromReader(message: ThresholdSignature, reader: jspb.BinaryReader): ThresholdSignature;
}

export namespace ThresholdSignature {
  export type AsObject = {
    sigs: SignatureList;
  }
}

export class SignatureList extends jspb.Message {
  constructor ();
  getSigsList(): Signature[];
  setSigsList(a: Signature[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignatureList.AsObject;
  static toObject(includeInstance: boolean, msg: SignatureList): SignatureList.AsObject;
  static serializeBinaryToWriter(message: SignatureList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignatureList;
  static deserializeBiinaryFromReader(message: SignatureList, reader: jspb.BinaryReader): SignatureList;
}

export namespace SignatureList {
  export type AsObject = {
    sigsList: Signature[];
  }
}

export class SignaturePair extends jspb.Message {
  constructor ();
  getPubkeyprefix(): {};
  setPubkeyprefix(a: {}): void;
  getContract(): {};
  setContract(a: {}): void;
  getEd25519(): {};
  setEd25519(a: {}): void;
  getRsa3072(): {};
  setRsa3072(a: {}): void;
  getEcdsa384(): {};
  setEcdsa384(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignaturePair.AsObject;
  static toObject(includeInstance: boolean, msg: SignaturePair): SignaturePair.AsObject;
  static serializeBinaryToWriter(message: SignaturePair, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignaturePair;
  static deserializeBiinaryFromReader(message: SignaturePair, reader: jspb.BinaryReader): SignaturePair;
}

export namespace SignaturePair {
  export type AsObject = {
    pubkeyprefix: {};
    contract: {};
    ed25519: {};
    rsa3072: {};
    ecdsa384: {};
  }
}

export class SignatureMap extends jspb.Message {
  constructor ();
  getSigpairList(): SignaturePair[];
  setSigpairList(a: SignaturePair[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignatureMap.AsObject;
  static toObject(includeInstance: boolean, msg: SignatureMap): SignatureMap.AsObject;
  static serializeBinaryToWriter(message: SignatureMap, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignatureMap;
  static deserializeBiinaryFromReader(message: SignatureMap, reader: jspb.BinaryReader): SignatureMap;
}

export namespace SignatureMap {
  export type AsObject = {
    sigpairList: SignaturePair[];
  }
}

export class FeeComponents extends jspb.Message {
  constructor ();
  getMin(): number;
  setMin(a: number): void;
  getMax(): number;
  setMax(a: number): void;
  getConstant(): number;
  setConstant(a: number): void;
  getBpt(): number;
  setBpt(a: number): void;
  getVpt(): number;
  setVpt(a: number): void;
  getRbh(): number;
  setRbh(a: number): void;
  getSbh(): number;
  setSbh(a: number): void;
  getGas(): number;
  setGas(a: number): void;
  getTv(): number;
  setTv(a: number): void;
  getBpr(): number;
  setBpr(a: number): void;
  getSbpr(): number;
  setSbpr(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeeComponents.AsObject;
  static toObject(includeInstance: boolean, msg: FeeComponents): FeeComponents.AsObject;
  static serializeBinaryToWriter(message: FeeComponents, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeeComponents;
  static deserializeBiinaryFromReader(message: FeeComponents, reader: jspb.BinaryReader): FeeComponents;
}

export namespace FeeComponents {
  export type AsObject = {
    min: number;
    max: number;
    constant: number;
    bpt: number;
    vpt: number;
    rbh: number;
    sbh: number;
    gas: number;
    tv: number;
    bpr: number;
    sbpr: number;
  }
}

export class TransactionFeeSchedule extends jspb.Message {
  constructor ();
  getHederafunctionality(): HederaFunctionality;
  setHederafunctionality(a: HederaFunctionality): void;
  getFeedata(): FeeData;
  setFeedata(a: FeeData): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionFeeSchedule.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionFeeSchedule): TransactionFeeSchedule.AsObject;
  static serializeBinaryToWriter(message: TransactionFeeSchedule, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionFeeSchedule;
  static deserializeBiinaryFromReader(message: TransactionFeeSchedule, reader: jspb.BinaryReader): TransactionFeeSchedule;
}

export namespace TransactionFeeSchedule {
  export type AsObject = {
    hederafunctionality: HederaFunctionality;
    feedata: FeeData;
  }
}

export class FeeData extends jspb.Message {
  constructor ();
  getNodedata(): FeeComponents;
  setNodedata(a: FeeComponents): void;
  getNetworkdata(): FeeComponents;
  setNetworkdata(a: FeeComponents): void;
  getServicedata(): FeeComponents;
  setServicedata(a: FeeComponents): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeeData.AsObject;
  static toObject(includeInstance: boolean, msg: FeeData): FeeData.AsObject;
  static serializeBinaryToWriter(message: FeeData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeeData;
  static deserializeBiinaryFromReader(message: FeeData, reader: jspb.BinaryReader): FeeData;
}

export namespace FeeData {
  export type AsObject = {
    nodedata: FeeComponents;
    networkdata: FeeComponents;
    servicedata: FeeComponents;
  }
}

export class FeeSchedule extends jspb.Message {
  constructor ();
  getTransactionfeescheduleList(): TransactionFeeSchedule[];
  setTransactionfeescheduleList(a: TransactionFeeSchedule[]): void;
  getExpirytime(): Timestamp_pb.TimestampSeconds;
  setExpirytime(a: Timestamp_pb.TimestampSeconds): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeeSchedule.AsObject;
  static toObject(includeInstance: boolean, msg: FeeSchedule): FeeSchedule.AsObject;
  static serializeBinaryToWriter(message: FeeSchedule, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeeSchedule;
  static deserializeBiinaryFromReader(message: FeeSchedule, reader: jspb.BinaryReader): FeeSchedule;
}

export namespace FeeSchedule {
  export type AsObject = {
    transactionfeescheduleList: TransactionFeeSchedule[];
    expirytime: Timestamp_pb.TimestampSeconds;
  }
}

export class CurrentAndNextFeeSchedule extends jspb.Message {
  constructor ();
  getCurrentfeeschedule(): FeeSchedule;
  setCurrentfeeschedule(a: FeeSchedule): void;
  getNextfeeschedule(): FeeSchedule;
  setNextfeeschedule(a: FeeSchedule): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrentAndNextFeeSchedule.AsObject;
  static toObject(includeInstance: boolean, msg: CurrentAndNextFeeSchedule): CurrentAndNextFeeSchedule.AsObject;
  static serializeBinaryToWriter(message: CurrentAndNextFeeSchedule, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrentAndNextFeeSchedule;
  static deserializeBiinaryFromReader(message: CurrentAndNextFeeSchedule, reader: jspb.BinaryReader): CurrentAndNextFeeSchedule;
}

export namespace CurrentAndNextFeeSchedule {
  export type AsObject = {
    currentfeeschedule: FeeSchedule;
    nextfeeschedule: FeeSchedule;
  }
}

export class NodeAddress extends jspb.Message {
  constructor ();
  getIpaddress(): {};
  setIpaddress(a: {}): void;
  getPortno(): number;
  setPortno(a: number): void;
  getMemo(): {};
  setMemo(a: {}): void;
  getRsaPubkey(): string;
  setRsaPubkey(a: string): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NodeAddress.AsObject;
  static toObject(includeInstance: boolean, msg: NodeAddress): NodeAddress.AsObject;
  static serializeBinaryToWriter(message: NodeAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NodeAddress;
  static deserializeBiinaryFromReader(message: NodeAddress, reader: jspb.BinaryReader): NodeAddress;
}

export namespace NodeAddress {
  export type AsObject = {
    ipaddress: {};
    portno: number;
    memo: {};
    rsaPubkey: string;
  }
}

export class NodeAddressBook extends jspb.Message {
  constructor ();
  getNodeaddressList(): NodeAddress[];
  setNodeaddressList(a: NodeAddress[]): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NodeAddressBook.AsObject;
  static toObject(includeInstance: boolean, msg: NodeAddressBook): NodeAddressBook.AsObject;
  static serializeBinaryToWriter(message: NodeAddressBook, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NodeAddressBook;
  static deserializeBiinaryFromReader(message: NodeAddressBook, reader: jspb.BinaryReader): NodeAddressBook;
}

export namespace NodeAddressBook {
  export type AsObject = {
    nodeaddressList: NodeAddress[];
  }
}

export enum HederaFunctionality { 
  NONE = 0,
  CryptoTransfer = 1,
  CryptoUpdate = 2,
  CryptoDelete = 3,
  CryptoAddClaim = 4,
  CryptoDeleteClaim = 5,
  ContractCall = 6,
  ContractCreate = 7,
  ContractUpdate = 8,
  FileCreate = 9,
  FileAppend = 10,
  FileUpdate = 11,
  FileDelete = 12,
  CryptoGetAccountBalance = 13,
  CryptoGetAccountRecords = 14,
  CryptoGetInfo = 15,
  ContractCallLocal = 16,
  ContractGetInfo = 17,
  ContractGetBytecode = 18,
  GetBySolidityID = 19,
  GetByKey = 20,
  CryptoGetClaim = 21,
  CryptoGetStakers = 22,
  FileGetContents = 23,
  FileGetInfo = 24,
  TransactionGetRecord = 25,
  ContractGetRecords = 26,
  CryptoCreate = 27,
  SystemDelete = 28,
  SystemUndelete = 29,
  ContractDelete = 30,
  Freeze = 31,
  CreateTransactionRecord = 32,
  CryptoAccountAutoRenew = 33,
  ContractAutoRenew = 34,
  getVersion = 35,
  TransactionGetReceipt = 36,
}
