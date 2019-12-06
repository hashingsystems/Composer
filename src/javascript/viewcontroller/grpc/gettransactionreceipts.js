import debug from 'debug'

const log = debug('all:viewcontroller:grpc:gettransactionreceipts')

/**
 * @module gRPC
 */

/**
 * getTransactionReceiptsController - incomplete
 * @param {Hedera} self
 * @param {TransactionID} txID
 * @param {socket} socket
 */
function getTransactionReceiptsController(self, txID, socket) {
    log('getTransactionReceipts')
}

export default getTransactionReceiptsController
