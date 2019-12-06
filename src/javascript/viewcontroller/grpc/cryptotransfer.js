import io from 'socket.io-client'
import {
    TransactionBody
} from '../../../pbweb/Transaction_pb'
import {
    Query
} from '../../../pbweb/Query_pb'
import Hedera from '../../hedera'
import {
    enumKeyByValue
} from '../../hedera/utils'
import {
    alertBanner
} from '../../ui-utils'
import errorHandler from './errorhandler'
import {
    AccountManager
} from '../../models'
import {
    ResponseCodeEnum
} from '../../../pbweb/ResponseCode_pb'
import address from '../../hedera/address'
import i from '../../hedera/internal'
import debug from 'debug'
import Transactions from '../../models/transactions'


const log = debug('all:viewcontroller:grpc:cryptotransfer')

/**
 * A module that makes gRPC calls to Hedera network
 * @module gRPC
 */

/**
 * @const {Uint8Array} Tx Hedera TransactionBody in Uint8Array
 */
const Tx = TransactionBody.DataCase
/**
 * @const {string} CRYPTOTRANSFER string generated using @see enumKeyByValue
 */
const CRYPTOTRANSFER = enumKeyByValue(Tx, Tx.CRYPTOTRANSFER)
/**
 * @const {} Q enum from Hedera Query
 */
const Q = Query.QueryCase
/**
 * @const {string} TRANSACTIONGETRECEIPT string generated using @see enumKeyByValue
 */
const TRANSACTIONGETRECEIPT = enumKeyByValue(Q, Q.TRANSACTIONGETRECEIPT)

let count = 0

/**
 *
 * cryptoTransfer handles all cryptoTransfer calls to Hedera using socketio
 * @param {*} micropayment micropayment is the micropayment tag object (hedera-micropayment) parsed from publisher's website
 * @param {*} port port is chrome's long-lived connection
 * @param {string} urlString allows to keep track of the content that was read in indexed-db
 */
async function cryptoTransferController(micropayment, port, urlString, cb) {
    log("cryptoTransferController::", micropayment)
    // connect to micropayment-server and pass the request, and get a response
    i.validMemoBytes(micropayment.memo)

    let parsedData = await cryptoTransferTx(micropayment, port, urlString)
    let data = parsedData.data
    let tx = parsedData.tx
    let client = parsedData.client
    let mps = micropayment.paymentServer

    const socket = io(mps, {
        autoConnect: false
    })

    socket.on('connect', function () {
        log('socket.on connect count', count)
        count = count + 1
    })

    socket.on('reconnect', () => {
        log('Payment Server is available')
    })

    socket.on('connect_error', () => {
        log('Payment Server is NOT available')
        // we can implement a warning in the UI if needed
    })

    log('CRYPTOTRANSFER execute: cryptoTransferController')
    socket.binary(true).emit(CRYPTOTRANSFER, tx.data)

    socket.on(`${CRYPTOTRANSFER}_RESPONSE`, async function (res) {
        // unexpected or undefined response, handle any error here, likely due to network errors
        try {
            errorHandler(res)
            // cryptoTransfer succeeded, save into indexed-db
            indexedDBSave(data, port)
            // cryptoTransfer succeeded, call getTransactionReceipt to confirm
            let q = client.getTransactionReceipts(tx.id).prepare()
            socket.binary(true).emit(TRANSACTIONGETRECEIPT, q.data)
        } catch (e) {
            // here is a good place to prompt user that something went wrong
            // alertBanner

            log('What is the error?', e.message)

            //none of this for now.
            /*
            await alertBanner(
                `Your micropayment has failed: ${e.message}; <a href="${
                    window.location.href
                }">please try again</a>. For help, visit <a href="https://hashingsystems.com" target="_blank">hashingsystems.com</a>.`,
                false
            )
            if (port) {
                port.postMessage({
                    text: 'change-icon'
                })
            }
            showOnlyAbstract()
            */
        }
    })

    socket.on(`${TRANSACTIONGETRECEIPT}_RESPONSE`, async res => {
        log(`${TRANSACTIONGETRECEIPT}_RESPONSE`, res)
        if (res.receiptStatus === ResponseCodeEnum.SUCCESS) data.receipt = true
        indexedDBSave(data, port)
        socket.disconnect()
        if (data.receipt) {
            cb(null, res)
        } else {
            cb(res)
        }
    })

    // // socket.io builtin event
    // socket.on('error', function (e) {
    //     log('Socket connection error: ', e)
    // })

    socket.on('PAYMENTSERVERERROR', function (text) {
        log('Payment server connection error: ', text)
        cb(text)
    })

    // socket.on('error', function () {
    //     //Socket IO won't reconnect to a host that it has already tried, unless option specified
    //     socket = io.connect(host, {
    //         'force new connection': true
    //     });
    // });

    // socket.io builtin event
    socket.on('disconnect', function () {
        log('Socket disconnected')
    })

    // socket.io builtin event
    socket.on('disconnect', function () {
        log('Socket disconnected')
    })

    socket.open()
}

async function cryptoTransferTx(micropayment, port, urlString) {
    log('Is our port object present?', port, urlString)
    // current account
    let am = await new AccountManager().init()
    let a = await am.getCurrentAccountObject()
    log('current account, a', a)
    // sender details
    let sender = a.accountID
    let keypair = a.keypair
    // recipient details
    let recipientList = micropayment.recipientList
    let amount = i.getSumOfTransfer(recipientList)
    // validate memo < 100 bytes
    let memo = i.validMemoBytes(micropayment.memo)
    let fee = 2000000
    log('submissionNode parsed in is: ', micropayment.submissionNode, fee)
    log(
        'submissionNode parsed in is recipientList: ',
        micropayment.recipientList
    )
    log(
        'submissionNodeparsed in is paymentserver: ',
        micropayment.paymentServer
    )
    let submissionNode = micropayment.submissionNode
    // prepare (and sign) the tx object to be forwarded to micropayment-server
    let node = address.getNodeAddr(submissionNode)
    log('node : ', node)
    const hedera = new Hedera.Client(node.address, node.account)
    let client = hedera.withOperator(keypair, sender).connect()
    let tx = client.cryptoTransfer(sender, recipientList, memo, fee).prepare()
    let transactionId = tx.idString

    // data for indexedDB: accountID, host, path etc
    let accountID = a.accountID
    let url, host, path
    try {
        url = new URL(urlString)
        host = url.origin
        path = url.pathname
    } catch (e) {
        return
    }
    let data = {
        accountID,
        host,
        path,
        amount,
        transactionId
    }

    return {
        data,
        tx,
        client
    }
}

/**
 * Evil function to remove everything but leave only article abstract if cryptotransfer fails,
 * abstract is specific to publisher. Right now, hardcoded for the-timestamp
 */
function showOnlyAbstract() {
    //Unnecessary. We're not evil.
    /*
    let content = document.getElementsByClassName('news__content')[0]
    log('content', content)
    if (content !== undefined) {
        while (content.childNodes.length > 3) {
            content.removeChild(content.lastChild)
        }
    }
    */
}

/**
 *
 * @param {object} data has the following keys accountID (required), host, path, amount, created, transactionId (required) and receipt (boolean)
 * @param {object} port is chrome's long lived connection
 *
 */
async function indexedDBSave(data, port) {
    // defensive code, do not save to indexed-db if there's no current account
    if (data.accountID === undefined || data.transactionId === undefined) return
    if (data.created === undefined) data.created = Date.now()
    log('indexedDBSave', data)
    if (port) {
        port.postMessage({
            text: 'indexeddb-save',
            data
        })
    } else {
        log('Saving data', data)
        let txs = await new Transactions().init(data.accountID)
        log(txs)
        await txs.save(data)
    }
}

export {
    cryptoTransferController,
    cryptoTransferTx
}