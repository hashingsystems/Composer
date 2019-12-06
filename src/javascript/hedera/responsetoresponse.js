import {
    Response
} from '../../pbweb/Response_pb'
import {
    ResponseHeader
} from '../../pbweb/ResponseHeader_pb'
import {
    CryptoGetAccountBalanceResponse
} from '../../pbweb/CryptoGetAccountBalance_pb'
import {
    AccountID
} from '../../pbweb/BasicTypes_pb'

/**
 * @module responseToResponseType
 */

/**
 * This function iss the re-constitute CryptoGetAccountBalanceResponse object from gRPC callback's response object.
 * @param {Object} res is the response object from gRPC callback.
 * @returns {Object} returns a Hedera Response.
 */
function responseToResponseType(res) {
    let r = Response.toObject(true, res)

    let responseHeader = new ResponseHeader()
    responseHeader.setNodetransactionprecheckcode(
        r.cryptogetaccountbalance.header.nodetransactionprecheckcode
    )
    responseHeader.setResponsetype(
        r.cryptogetaccountbalance.header.responsetype
    )
    responseHeader.setCost(r.cryptogetaccountbalance.header.cost)
    responseHeader.setStateproof(r.cryptogetaccountbalance.header.stateproof)

    let accountID = new AccountID()
    accountID.setShardnum(r.cryptogetaccountbalance.accountid.shardnum)
    accountID.setRealmnum(r.cryptogetaccountbalance.accountid.realmnum)
    accountID.setAccountnum(r.cryptogetaccountbalance.accountid.accountnum)

    let balance = r.cryptogetaccountbalance.balance

    let c = new CryptoGetAccountBalanceResponse()
    c.setHeader(responseHeader)
    c.setAccountid(accountID)
    c.setBalance(balance)

    let response = new Response()
    response.setCryptogetaccountbalance(c)
    return response
}

export default responseToResponseType