import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';
import * as Duration_pb from './Duration_pb';

export class Claim extends jspb.Message {
  constructor ();
  getAccountid(): BasicTypes_pb.AccountID;
  setAccountid(a: BasicTypes_pb.AccountID): void;
  getHash(): {};
  setHash(a: {}): void;
  getKeys(): BasicTypes_pb.KeyList;
  setKeys(a: BasicTypes_pb.KeyList): void;
  getClaimduration(): Duration_pb.Duration;
  setClaimduration(a: Duration_pb.Duration): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Claim.AsObject;
  static toObject(includeInstance: boolean, msg: Claim): Claim.AsObject;
  static serializeBinaryToWriter(message: Claim, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Claim;
  static deserializeBiinaryFromReader(message: Claim, reader: jspb.BinaryReader): Claim;
}

export namespace Claim {
  export type AsObject = {
    accountid: BasicTypes_pb.AccountID;
    hash: {};
    keys: BasicTypes_pb.KeyList;
    claimduration: Duration_pb.Duration;
  }
}

export class CryptoAddClaimTransactionBody extends jspb.Message {
  constructor ();
  getClaim(): Claim;
  setClaim(a: Claim): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoAddClaimTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoAddClaimTransactionBody): CryptoAddClaimTransactionBody.AsObject;
  static serializeBinaryToWriter(message: CryptoAddClaimTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoAddClaimTransactionBody;
  static deserializeBiinaryFromReader(message: CryptoAddClaimTransactionBody, reader: jspb.BinaryReader): CryptoAddClaimTransactionBody;
}

export namespace CryptoAddClaimTransactionBody {
  export type AsObject = {
    claim: Claim;
  }
}

