import { CryptoGetInfoQuery } from '../../pbweb/CryptoGetInfo_pb'
import { Query } from '../../pbweb/Query_pb'
import i from './internal'
import cryptoTransfer from './cryptotransfer'
import { QueryHeader, ResponseType } from '../../pbweb/QueryHeader_pb'
import debug from 'debug'

const log = debug('all:hedera:cryptogetinfo')

/**
 * @const {Object} rt a Hedera ResponseType object
 */
const rt = ResponseType

function cryptoGetInfo(
    self,
    account,
    memo = '',
    resType = rt.ANSWER_ONLY,
    generateRecord = false
) {
    log('cryptoGetInfo makes a gRPC call to Hedera network')
    if (self.operator === undefined) {
        // operator (e.g. the current account that's paying)
        log(
            'please set the operator who will pay for this transaction before calling getAccountBalance'
        )
        return
    }

    let sender = i.accountStringFromAccountID(self.operator.account) // whoever is the operator pays
    let recipient = i.accountStringFromAccountID(self.nodeAccountID) // node account gets paid
    let amount = 200000

    let recipientList = [
        {
            tinybars: amount,
            to: recipient
        }
    ]

    let fee = 200000
    let tx = cryptoTransfer(
        self,
        sender,
        recipientList,
        memo,
        fee,
        generateRecord
    )

    // prepare query header
    let qHeader = new QueryHeader()
    qHeader.setPayment(tx)
    qHeader.setResponsetype(resType)

    log('333', qHeader)

    // prepare query
    let cryptoGetInfoQuery = new CryptoGetInfoQuery()
    cryptoGetInfoQuery.setHeader(qHeader)
    cryptoGetInfoQuery.setAccountid(i.accountIDFromString(account))
    log('Our cryptoGetInfoQuery is', cryptoGetInfoQuery.toObject())
    let q = new Query()
    q.setCryptogetinfo(cryptoGetInfoQuery)
    log('Our query, q, is', q.toObject())
    return q
}

export default cryptoGetInfo
