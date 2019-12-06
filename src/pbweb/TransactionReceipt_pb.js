/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var BasicTypes_pb = require('./BasicTypes_pb.js');
var ResponseCode_pb = require('./ResponseCode_pb.js');
var ExchangeRate_pb = require('./ExchangeRate_pb.js');
goog.exportSymbol('proto.proto.TransactionReceipt', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.TransactionReceipt = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.TransactionReceipt, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.proto.TransactionReceipt.displayName = 'proto.proto.TransactionReceipt';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.TransactionReceipt.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.TransactionReceipt.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.TransactionReceipt} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.TransactionReceipt.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
    accountid: (f = msg.getAccountid()) && BasicTypes_pb.AccountID.toObject(includeInstance, f),
    fileid: (f = msg.getFileid()) && BasicTypes_pb.FileID.toObject(includeInstance, f),
    contractid: (f = msg.getContractid()) && BasicTypes_pb.ContractID.toObject(includeInstance, f),
    exchangerate: (f = msg.getExchangerate()) && ExchangeRate_pb.ExchangeRateSet.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.TransactionReceipt}
 */
proto.proto.TransactionReceipt.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.TransactionReceipt;
  return proto.proto.TransactionReceipt.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.TransactionReceipt} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.TransactionReceipt}
 */
proto.proto.TransactionReceipt.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.proto.ResponseCodeEnum} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 2:
      var value = new BasicTypes_pb.AccountID;
      reader.readMessage(value,BasicTypes_pb.AccountID.deserializeBinaryFromReader);
      msg.setAccountid(value);
      break;
    case 3:
      var value = new BasicTypes_pb.FileID;
      reader.readMessage(value,BasicTypes_pb.FileID.deserializeBinaryFromReader);
      msg.setFileid(value);
      break;
    case 4:
      var value = new BasicTypes_pb.ContractID;
      reader.readMessage(value,BasicTypes_pb.ContractID.deserializeBinaryFromReader);
      msg.setContractid(value);
      break;
    case 5:
      var value = new ExchangeRate_pb.ExchangeRateSet;
      reader.readMessage(value,ExchangeRate_pb.ExchangeRateSet.deserializeBinaryFromReader);
      msg.setExchangerate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.TransactionReceipt.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.TransactionReceipt.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.TransactionReceipt} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.TransactionReceipt.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getAccountid();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      BasicTypes_pb.AccountID.serializeBinaryToWriter
    );
  }
  f = message.getFileid();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      BasicTypes_pb.FileID.serializeBinaryToWriter
    );
  }
  f = message.getContractid();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      BasicTypes_pb.ContractID.serializeBinaryToWriter
    );
  }
  f = message.getExchangerate();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      ExchangeRate_pb.ExchangeRateSet.serializeBinaryToWriter
    );
  }
};


/**
 * optional ResponseCodeEnum status = 1;
 * @return {!proto.proto.ResponseCodeEnum}
 */
proto.proto.TransactionReceipt.prototype.getStatus = function() {
  return /** @type {!proto.proto.ResponseCodeEnum} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.proto.ResponseCodeEnum} value */
proto.proto.TransactionReceipt.prototype.setStatus = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional AccountID accountID = 2;
 * @return {?proto.proto.AccountID}
 */
proto.proto.TransactionReceipt.prototype.getAccountid = function() {
  return /** @type{?proto.proto.AccountID} */ (
    jspb.Message.getWrapperField(this, BasicTypes_pb.AccountID, 2));
};


/** @param {?proto.proto.AccountID|undefined} value */
proto.proto.TransactionReceipt.prototype.setAccountid = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.proto.TransactionReceipt.prototype.clearAccountid = function() {
  this.setAccountid(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.proto.TransactionReceipt.prototype.hasAccountid = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional FileID fileID = 3;
 * @return {?proto.proto.FileID}
 */
proto.proto.TransactionReceipt.prototype.getFileid = function() {
  return /** @type{?proto.proto.FileID} */ (
    jspb.Message.getWrapperField(this, BasicTypes_pb.FileID, 3));
};


/** @param {?proto.proto.FileID|undefined} value */
proto.proto.TransactionReceipt.prototype.setFileid = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.proto.TransactionReceipt.prototype.clearFileid = function() {
  this.setFileid(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.proto.TransactionReceipt.prototype.hasFileid = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ContractID contractID = 4;
 * @return {?proto.proto.ContractID}
 */
proto.proto.TransactionReceipt.prototype.getContractid = function() {
  return /** @type{?proto.proto.ContractID} */ (
    jspb.Message.getWrapperField(this, BasicTypes_pb.ContractID, 4));
};


/** @param {?proto.proto.ContractID|undefined} value */
proto.proto.TransactionReceipt.prototype.setContractid = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.proto.TransactionReceipt.prototype.clearContractid = function() {
  this.setContractid(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.proto.TransactionReceipt.prototype.hasContractid = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional ExchangeRateSet exchangeRate = 5;
 * @return {?proto.proto.ExchangeRateSet}
 */
proto.proto.TransactionReceipt.prototype.getExchangerate = function() {
  return /** @type{?proto.proto.ExchangeRateSet} */ (
    jspb.Message.getWrapperField(this, ExchangeRate_pb.ExchangeRateSet, 5));
};


/** @param {?proto.proto.ExchangeRateSet|undefined} value */
proto.proto.TransactionReceipt.prototype.setExchangerate = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.proto.TransactionReceipt.prototype.clearExchangerate = function() {
  this.setExchangerate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.proto.TransactionReceipt.prototype.hasExchangerate = function() {
  return jspb.Message.getField(this, 5) != null;
};


goog.object.extend(exports, proto.proto);
