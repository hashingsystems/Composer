import i from './internal'
import { CryptoGetAccountBalanceQuery } from '../../pbweb/CryptoGetAccountBalance_pb'
import { QueryHeader, ResponseType } from '../../pbweb/QueryHeader_pb'
import { Query } from '../../pbweb/Query_pb'
import cryptoTransfer from './cryptotransfer'
import debug from 'debug'

const log = debug('all:hedera:getaccountbalance')

/**
 * @module getAccountBalance
 */

/**
 * @const rt is a Hedera @see ResponseType
 */
const rt = ResponseType

/**
 * getAccountBalance prepares getAccountBalance object in a protobuf acceptable format to be parsed to Hedera node subsequently.
 * @param {Object} self refers to the instance of Hedera (Hedera object).
 * @param {string} account is the account whom we are querying the account balance from. It is a string delimited by dot, of the format 'shardNum.realmNum.accountNum'.
 * @param {string} memo is an optional string memo.
 * @param {Object} resType is a Hedera QueryHeader ResponseType.
 * @param {boolean} generateRecord is a boolean to indicate whether records are to be stored in Hedera.
 * @returns {Object} returns a Hedera Query.
 */
function getAccountBalance(
    self,
    account,
    memo = '',
    resType = rt.ANSWER_ONLY,
    generateRecord = false
) {
    log('getAccountBalance makes a gRPC call to Hedera network')
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
        recipientList,
        memo,
        fee,
        generateRecord
    )

    // prepare query header
    let qHeader = new QueryHeader()
    qHeader.setPayment(tx)
    qHeader.setResponsetype(resType)

    // prepare query
    let cryptoGetAccountBalanceQuery = new CryptoGetAccountBalanceQuery()
    cryptoGetAccountBalanceQuery.setHeader(qHeader)
    cryptoGetAccountBalanceQuery.setAccountid(i.accountIDFromString(account))
    log(
        'Our cryptoGetAccountBalanceQuery is',
        cryptoGetAccountBalanceQuery.toObject()
    )
    let q = new Query()
    q.setCryptogetaccountbalance(cryptoGetAccountBalanceQuery)
    log('Our query, q, is', q.toObject())
    return q
}

export default getAccountBalance
