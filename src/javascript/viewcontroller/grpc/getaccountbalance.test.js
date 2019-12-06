import io from 'socket.io-client'
import debug from 'debug'
import addressbook from '../../hedera/address-book'
import Hedera from '../../hedera'
import { enumKeyByValue } from '../../hedera/utils'
import { Query } from '../../../pbweb/Query_pb'

const log = debug('all:viewcontroller:grpc:getaccountbalance')
let paymentServer = process.env.TEST_PAYMENTSERVER
const Q = Query.QueryCase
var socket

beforeEach(async function(done) {
    if (SKIP_NETWORK_TESTS) {
        done()
        return
    }
    // Setup
    jest.setTimeout(35000)
    socket = io.connect(paymentServer, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket']
    })
    socket.on('connect', function() {
        log('onConnect')
        done()
    })
    socket.on('disconnect', function() {
        log('onDisconnect')
    })
    socket.on('connect_error', function() {
        log('Payment server is unavailable')
        done()
    })
    socket.on('reconnect', function() {
        log('Payment server is unavailable')
        done()
    })
})

afterEach(async function(done) {
    if (SKIP_NETWORK_TESTS) {
        done()
        return
    }
    if (socket.connected) {
        log('Do our stuff here')
        socket.disconnect()
    } else {
        // There will not be a connection unless you have done() in beforeEach, socket.on('connect')
        log('no connection to break...')
    }
    done()
})

test('Test an account get balance', async function(done) {
    if (SKIP_NETWORK_TESTS) {
        done()
        return
    }
    const testaccount = {
        accountID: process.env.TEST_ACCOUNTID,
        publicKey: process.env.TEST_PUBLICKEY,
        privateKey: process.env.TEST_PRIVATEKEY,
        solidityAddress: process.env.TEST_SOLIDITYADDRESS
    }

    // skip this test completely if developer did not prepare a test account in .env
    if (
        testaccount.accountID === undefined ||
        testaccount.publicKey === undefined ||
        testaccount.privateKey === undefined
    ) {
        return
    }

    const node = addressbook['test'].ADDRESS_BOOK[0]
    const nodeAccount = Object.keys(node)[0]
    const nodeAddress = node[nodeAccount]
    log(nodeAddress)
    log(nodeAccount)
    const hedera = new Hedera.Client(nodeAddress, nodeAccount)
    let keypair = {
        privateKey: testaccount.privateKey,
        publicKey: testaccount.publicKey
    }
    log(keypair)
    let sender = testaccount.accountID
    log(sender)
    let client = hedera.withOperator(keypair, sender).connect()
    let req = client.getAccountBalance(sender).prepare()

    const CRYPTOGETACCOUNTBALANCE = enumKeyByValue(Q, Q.CRYPTOGETACCOUNTBALANCE)
    socket = io.connect(paymentServer)

    socket.on('connect', function() {
        socket.binary(true).emit(CRYPTOGETACCOUNTBALANCE, req.data)
        socket.on(`${CRYPTOGETACCOUNTBALANCE}_RESPONSE`, async function(res) {
            log('RESPONSE is  ', await res)
            expect(res.nodePrecheckcode).toBe(0)
            expect(res.error).toBe(null)
            socket.on('disconnect', () => {
                log('disconnected')
            })
            done()
        })
    })
})
