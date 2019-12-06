import i from './internal'
import { Query } from '../../pbweb/Query_pb'
import { FileGetContentsQuery } from '../../pbweb/FileGetContents_pb'
import { QueryHeader, ResponseType } from '../../pbweb/QueryHeader_pb'
import cryptoTransfer from './cryptotransfer'
import debug from 'debug'

const log = debug('all:hedera:filegetcontents')

/**
 * @module fileGetContents
 */

/**
 *
 * fileGetContents
 * @param {*} self refers to the instance of Hedera (Hedera object).
 * @param {string} file refers to the file. It is a string delimited by dot, of the format 'shardNum.realmNum.fileNum'.
 * @returns {Object} returns a Hedera Query.
 */
function fileGetContents(self, file) {
    if (self.operator === undefined) {
        // operator (e.g. the current account that's paying)
        log(
            'please set the operator who will pay for this transaction before calling getAccountBalance'
        )
        return
    }

    let sender = i.accountStringFromAccountID(self.operator.account) // whoever is the operator pays
    let recipient = i.accountStringFromAccountID(self.nodeAccountID) // node account gets paid
    let amount = BALANCE_QUERY_FEE
    let recipientList = [
        {
            tinybars: amount,
            to: recipient
        }
    ]
    let fee = TRANSACTION_FEE
    let tx = cryptoTransfer(
        self,
        sender,
        recipient,
        amount,
        recipientList,
        memo,
        fee
    )

    // prepare query header
    let qHeader = new QueryHeader()
    qHeader.setPayment(tx)
    qHeader.setResponsetype(ResponseType.ANSWER_ONLY)

    // prepare query
    let fileGetContentsQuery = new FileGetContentsQuery()
    fileGetContentsQuery.setHeader()
    fileGetContentsQuery.setFileid(i.fileIDFromString(file))

    let q = new Query()
    q.setFilegetcontents(fileGetContentsQuery)
    return q
}

export default fileGetContents
