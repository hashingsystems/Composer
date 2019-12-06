import * as jspb from "google-protobuf"

import * as Duration_pb from './Duration_pb';
import * as Timestamp_pb from './Timestamp_pb';

export class FreezeTransactionBody extends jspb.Message {
  constructor ();
  getStarthour(): number;
  setStarthour(a: number): void;
  getStartmin(): number;
  setStartmin(a: number): void;
  getEndhour(): number;
  setEndhour(a: number): void;
  getEndmin(): number;
  setEndmin(a: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FreezeTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FreezeTransactionBody): FreezeTransactionBody.AsObject;
  static serializeBinaryToWriter(message: FreezeTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FreezeTransactionBody;
  static deserializeBiinaryFromReader(message: FreezeTransactionBody, reader: jspb.BinaryReader): FreezeTransactionBody;
}

export namespace FreezeTransactionBody {
  export type AsObject = {
    starthour: number;
    startmin: number;
    endhour: number;
    endmin: number;
  }
}

