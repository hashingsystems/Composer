import * as jspb from "google-protobuf"

import * as BasicTypes_pb from './BasicTypes_pb';

export class AdminUndeleteTransactionBody extends jspb.Message {
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;
  hasFileid(): boolean;
  clearFileid(): void;
  hasFileid(): boolean;

  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;
  hasContractid(): boolean;
  clearContractid(): void;
  hasContractid(): boolean;

  getIdCase(): AdminUndeleteTransactionBody.IdCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUndeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUndeleteTransactionBody): AdminUndeleteTransactionBody.AsObject;
  static serializeBinaryToWriter(message: AdminUndeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUndeleteTransactionBody;
  static deserializeBinaryFromReader(message: AdminUndeleteTransactionBody, reader: jspb.BinaryReader): AdminUndeleteTransactionBody;
}

export namespace AdminUndeleteTransactionBody {
  export type AsObject = {
    fileid?: BasicTypes_pb.FileID.AsObject,
    contractid?: BasicTypes_pb.ContractID.AsObject,
  }

  export enum IdCase { 
    ID_NOT_SET = 0,
    FILEID = 1,
    CONTRACTID = 2,
  }
}

