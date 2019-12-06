import * as jspb from "google-protobuf"

import * as Duration_pb from './Duration_pb';
import * as BasicTypes_pb from './BasicTypes_pb';
import * as TransactionBody_pb from './TransactionBody_pb';

export class Transaction extends jspb.Message {
  constructor ();
  getBody(): TransactionBody_pb.TransactionBody;
  setBody(a: TransactionBody_pb.TransactionBody): void;
  getBodybytes(): {};
  setBodybytes(a: {}): void;
  getSigs(): BasicTypes_pb.SignatureList;
  setSigs(a: BasicTypes_pb.SignatureList): void;
  getSigmap(): BasicTypes_pb.SignatureMap;
  setSigmap(a: BasicTypes_pb.SignatureMap): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBiinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    body: TransactionBody_pb.TransactionBody;
    bodybytes: {};
    sigs: BasicTypes_pb.SignatureList;
    sigmap: BasicTypes_pb.SignatureMap;
  }
}

