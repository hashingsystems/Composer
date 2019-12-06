import * as jspb from "google-protobuf"

import * as TransactionResponse_pb from './TransactionResponse_pb';
import * as QueryHeader_pb from './QueryHeader_pb';
import * as ResponseCode_pb from './ResponseCode_pb';

export class ResponseHeader extends jspb.Message {
  constructor ();
  getNodetransactionprecheckcode(): ResponseCodeEnum;
  setNodetransactionprecheckcode(a: ResponseCodeEnum): void;
  getResponsetype(): ResponseType;
  setResponsetype(a: ResponseType): void;
  getCost(): number;
  setCost(a: number): void;
  getStateproof(): {};
  setStateproof(a: {}): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResponseHeader.AsObject;
  static toObject(includeInstance: boolean, msg: ResponseHeader): ResponseHeader.AsObject;
  static serializeBinaryToWriter(message: ResponseHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResponseHeader;
  static deserializeBiinaryFromReader(message: ResponseHeader, reader: jspb.BinaryReader): ResponseHeader;
}

export namespace ResponseHeader {
  export type AsObject = {
    nodetransactionprecheckcode: ResponseCodeEnum;
    responsetype: ResponseType;
    cost: number;
    stateproof: {};
  }
}

