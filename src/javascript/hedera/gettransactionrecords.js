import i from './internal'
import { ResponseType, QueryHeader } from '../../pbweb/QueryHeader_pb'
import { Query } from '../../pbweb/Query_pb'
import { TransactionGetRecordQuery } from '../../pbweb/TransactionGetRecord_pb'
import { Transaction, TransactionBody } from '../../pbweb/Transaction_pb'
import { SignatureList } from '../../pbweb/BasicTypes_pb'
import debug from 'debug'

const log = debug('all:hedera:gettransactionrecords')

/**
 * @module getTransactionRecords
 */

/**
 * getTransactionRecords prepares getTransactionReceipt object in a protobuf acceptable format to be parsed to Hedera node subsequently..
 * @param {Object} self refers to the instance of Hedera (Hedera object).
 * @param {Object} txID is a Hedera TransactionID object whom we are querying the transaction receipt from.
 * @returns {Object} returns a Hedera Query object
 */
function getTransactionRecords(self, txID) {
    log('getTransactionRecords makes a gRPC call to Hedera network')
    if (self.operator === undefined) {
        // operator (e.g. the current account that's paying)
        log(
            'please set the operator who will pay for this transaction before calling getAccountBalance'
        )
        return
    }

    let txBody = new TransactionBody()
    txBody.setTransactionid(txID)
    txBody.setTransactionfee(0) // get transaction records is paid!
    txBody.setTransactionvalidduration(i.getDuration())
    txBody.setNodeaccountid(self.nodeAccountID)

    // sign
    let txBodyBytes = txBody.serializeBinary()
    let privateKeyHex = self.operator.keypair.privateKey
    let publicKeyHex = self.operator.keypair.publicKey
    let sig = i.signWithKeyAndVerify(txBodyBytes, privateKeyHex, publicKeyHex)

    let sigList = new SignatureList()
    sigList.setSigsList([sig])

    let tx = new Transaction()
    tx.setBody(txBody)
    tx.setSigs(sigList)

    let qHeader = new QueryHeader()
    qHeader.setPayment(tx)
    qHeader.setResponsetype(ResponseType.ANSWER_ONLY)

    let txGetRecordQuery = new TransactionGetRecordQuery()
    txGetRecordQuery.setHeader(qHeader)
    txGetRecordQuery.setTransactionid(txID)
    log('getTransactionGetRecord is', txGetRecordQuery.toObject())

    let q = new Query()
    q.setTransactiongetrecord(txGetRecordQuery)
    log('Our query, q, is ', q.toObject())
    return q
}

export default getTransactionRecords
