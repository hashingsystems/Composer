import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class CreateFeeScheduleTransactionBody extends jspb.Message {
  getKey(): BasicTypes_pb.Key | undefined;
  setKey(value?: BasicTypes_pb.Key): void;
  hasKey(): boolean;
  clearKey(): void;

  getTransactionfeescheduleList(): Array<BasicTypes_pb.TransactionFeeSchedule>;
  setTransactionfeescheduleList(value: Array<BasicTypes_pb.TransactionFeeSchedule>): void;
  clearTransactionfeescheduleList(): void;
  addTransactionfeeschedule(value?: BasicTypes_pb.TransactionFeeSchedule, index?: number): BasicTypes_pb.TransactionFeeSchedule;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateFeeScheduleTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CreateFeeScheduleTransactionBody): CreateFeeScheduleTransactionBody.AsObject;
  static serializeBinaryToWriter(message: CreateFeeScheduleTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateFeeScheduleTransactionBody;
  static deserializeBinaryFromReader(message: CreateFeeScheduleTransactionBody, reader: jspb.BinaryReader): CreateFeeScheduleTransactionBody;
}

export namespace CreateFeeScheduleTransactionBody {
  export type AsObject = {
    key?: BasicTypes_pb.Key.AsObject,
    transactionfeescheduleList: Array<BasicTypes_pb.TransactionFeeSchedule.AsObject>,
  }
}

