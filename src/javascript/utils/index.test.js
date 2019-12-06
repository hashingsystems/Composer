import { isInt, isUndefined, throttle } from '../utils'
import { URL } from 'url'
import Hedera from '../hedera'
import { AccountManager } from '../models'
import errorHandler from '../viewcontroller/grpc'
import accountdetails from './testdata/accountdetails'
import io from 'socket.io-client'
import { enumKeyByValue } from '../hedera/utils'
import { TransactionBody } from '../../pbweb/Transaction_pb'
import debug from 'debug'

const log = debug('test:utils')

const Tx = TransactionBody.DataCase
const CRYPTOTRANSFER = enumKeyByValue(Tx, Tx.CRYPTOTRANSFER)

let urlArticle, tagArticle

beforeEach(() => {
    localStorage.clear()
    urlArticle = new URL('htps://dailytimestamp.com/article/hedera-rocks')

    // type 'article' can be anything
    tagArticle = {
        amount: 1, // amount requested by the website
        account: '0.0.1003', // account id of the "pay to" account
        time: undefined, // optional parameter
        paymentserver: 'https://mps.dailytimestamp.com', // ip address of the payment server
        contentID: '123', // id of the content
        memo: 'test', // optional memo field
        type: 'article'
    }
})

test('isInt', () => {
    expect(isInt(1)).toBeTruthy()
    expect(isInt(1.0)).toBeTruthy()

    // non-integers
    expect(isInt(0.9)).toBeFalsy()
    expect(isInt(1.1)).toBeFalsy()
    expect(isInt('hello')).toBeFalsy()
    expect(
        isInt({
            hello: 'world'
        })
    ).toBeFalsy()
})

test('isUndefined', () => {
    let a
    expect(a).toBeUndefined()
    expect(isUndefined(a)).toBeTruthy()

    a = 1
    expect(a).toBeDefined()
    expect(isUndefined(a)).toBeFalsy()

    // null is not undefined
    a = null
    expect(a).toBeDefined()
    expect(isUndefined(a)).toBeFalsy()
})

test('waits 10 second before ending the game', () => {
    jest.useFakeTimers()
    timerGame()
    timerGame()
    timerGame()
    timerGame()

    expect(setTimeout).toHaveBeenCalledTimes(4)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000)
})

function timerGame(callback) {
    log('Ready....go!')
    setTimeout(() => {
        log('Times up -- stop!')
        callback && callback()
    }, 10000)
}

test('throttle', async () => {
    // jest.useFakeTimers();
    // Unable to setTimeout/Throttling on socket.
    // socket has its own default of 20000.
    // socketThrottling()
    // socketThrottling()
    // socketThrottling()
    // socketThrottling()
    // expect(setTimeout).toHaveBeenCalledTimes(4);
    // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 80000);
    // log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    // log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    // log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
})

function socketThrottling() {
    // let am = await new AccountManager().init()
    // let a = await am.getCurrentAccountObject()
    // sender details
    let TRANSACTION_FEE = 100000
    let NODE_ADDRESS = ''
    let NODE_ACCOUNT = ''
    let PAYMENT_SERVER = ''

    let sender = accountdetails.accountID
    let keypair = {
        privateKey: accountdetails.privateKey,
        publicKey: accountdetails.publicKey
    }
    // recipient details
    let recipient = tagArticle.account
    let amount = tagArticle.amount
    let recipientList = tagArticle.recipientList
    let memo = tagArticle.memo
    let fee = TRANSACTION_FEE
    let count = 0
    // prepare (and sign) the tx object to be forwarded to micropayment-server
    const hedera = new Hedera.Client(NODE_ADDRESS, NODE_ACCOUNT)
    let client = hedera.withOperator(keypair, sender).connect()
    let tx = client
        .cryptoTransfer(sender, recipient, amount, recipientList, memo, fee)
        .prepare()

    // data for indexedDB: accountID, host, path etc
    let accountID = accountdetails.accountID
    log('The url we will save is', url)
    let url, host, path
    try {
        url = new URL(urlArticle)
        host = url.origin
        path = url.pathname
    } catch (e) {
        return
    }

    const socket = io.connect(PAYMENT_SERVER)
    socket.binary(true).emit(CRYPTOTRANSFER, tx.data)
    socket.on('connect', function() {
        socket.on(`${CRYPTOTRANSFER}_RESPONSE`, async function(res) {
            log('Callback simulation of socketio')
            try {
                errorHandler(res)
                socket.disconnect()
                log('HOW often does it come here?')
                count++
                return
            } catch (e) {
                log('What is the error?', e.message)
                socket.disconnect()
                return
            }
        })
    })
}
