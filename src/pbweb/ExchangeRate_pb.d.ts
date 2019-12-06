import * as jspb from "google-protobuf"

import * as Timestamp_pb from './Timestamp_pb';

export class ExchangeRate extends jspb.Message {
  constructor ();
  getHbarequiv(): number;
  setHbarequiv(a: number): void;
  getCentequiv(): number;
  setCentequiv(a: number): void;
  getExpirationtime(): Timestamp_pb.TimestampSeconds;
  setExpirationtime(a: Timestamp_pb.TimestampSeconds): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeRate.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeRate): ExchangeRate.AsObject;
  static serializeBinaryToWriter(message: ExchangeRate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeRate;
  static deserializeBiinaryFromReader(message: ExchangeRate, reader: jspb.BinaryReader): ExchangeRate;
}

export namespace ExchangeRate {
  export type AsObject = {
    hbarequiv: number;
    centequiv: number;
    expirationtime: Timestamp_pb.TimestampSeconds;
  }
}

export class ExchangeRateSet extends jspb.Message {
  constructor ();
  getCurrentrate(): ExchangeRate;
  setCurrentrate(a: ExchangeRate): void;
  getNextrate(): ExchangeRate;
  setNextrate(a: ExchangeRate): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeRateSet.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeRateSet): ExchangeRateSet.AsObject;
  static serializeBinaryToWriter(message: ExchangeRateSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeRateSet;
  static deserializeBiinaryFromReader(message: ExchangeRateSet, reader: jspb.BinaryReader): ExchangeRateSet;
}

export namespace ExchangeRateSet {
  export type AsObject = {
    currentrate: ExchangeRate;
    nextrate: ExchangeRate;
  }
}

