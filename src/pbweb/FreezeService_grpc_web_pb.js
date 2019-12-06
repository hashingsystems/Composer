/**
 * @fileoverview gRPC-Web generated client stub for proto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var TransactionResponse_pb = require('./TransactionResponse_pb.js')

var Transaction_pb = require('./Transaction_pb.js')
const proto = {};
proto.proto = require('./FreezeService_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.FreezeServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.FreezeServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.proto.FreezeServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.proto.FreezeServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Transaction,
 *   !proto.proto.TransactionResponse>}
 */
const methodInfo_FreezeService_freeze = new grpc.web.AbstractClientBase.MethodInfo(
  TransactionResponse_pb.TransactionResponse,
  /** @param {!proto.proto.Transaction} request */
  function(request) {
    return request.serializeBinary();
  },
  TransactionResponse_pb.TransactionResponse.deserializeBinary
);


/**
 * @param {!proto.proto.Transaction} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.TransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.TransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.FreezeServiceClient.prototype.freeze =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.FreezeService/freeze',
      request,
      metadata || {},
      methodInfo_FreezeService_freeze,
      callback);
};


/**
 * @param {!proto.proto.Transaction} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.TransactionResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.FreezeServicePromiseClient.prototype.freeze =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.freeze(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.proto;

