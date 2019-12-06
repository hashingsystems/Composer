import Hedera from '../../hedera'
import HederaTag from '../../hedera-tags'
import addressbook from '../../hedera/address-book'
import { TransactionBody } from '../../../pbweb/TransactionBody_pb'
import io from 'socket.io-client'
import debug from 'debug'
import { enumKeyByValue, hexStringToUint8Array } from '../../hedera/utils'
import { AbiCoder } from 'web3-eth-abi'
import { JSDOM } from 'jsdom'
import path from 'path'
import i from '../../hedera/internal'

// DEBUG=test:contractcall npm test src/javascript/hedera/contractcall.test.js
const log = debug('test:contractcall')

const Tx = TransactionBody.DataCase

let socket

let paymentServer = process.env.TEST_PAYMENTSERVER

beforeEach(done => {
    if (SKIP_NETWORK_TESTS) {
        done()
        return
    }
    // Setup
    // Do not hardcode server port and address, square brackets are used for IPv6
    socket = io.connect(paymentServer, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket']
    })
    socket.on('connect', () => {
        done()
    })
    socket.on('connect_error', () => {
        log('No socketio server available during tests. Skip.')
        done()
    })
})

afterEach(done => {
    if (SKIP_NETWORK_TESTS) {
        done()
        return
    }
    // Cleanup
    if (socket.connected) {
        socket.disconnect()
    }
    done()
})

test('contractcall test', async done => {
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

    // convert user's acccountID (string) into a solidityAddress
    let solidityAddress = i.solidityAddressFromAccountIDString(sender)
    // the converted solidityAddress should be equal to
    // what we put in our testaccount (testdata/account.json)
    if (testaccount.solidityAddress !== undefined) {
        expect(solidityAddress).toEqual(testaccount.solidityAddress)
    }

    let client = hedera.withOperator(keypair, sender).connect()

    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        '../../hedera-tags/testdata',
        'contractcallexample1_valid.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.contract(document)
    log(result.abi.inputs)
    log(result.params)

    // prepend buyer inputs
    result.abi.inputs.unshift({ name: 'buyer', type: 'address' })
    log(result.abi.inputs)
    // prepend buyer contract account id (translated by Hedera)
    result.params.unshift(solidityAddress)
    log(result.params)

    const abiCoder = new AbiCoder()
    const functionParamsHex = abiCoder
        .encodeFunctionCall(result.abi, result.params)
        .slice(2) // additionally remove the first byte "0x" which denotes a hex string as it fails in other languages
    const functionParams = hexStringToUint8Array(functionParamsHex)

    const gas = result.params[2]
    const amount = gas
    const fee = 200000
    const contract = '0.0.1604' // hard-coded contract id. change this to the one Nik uses
    let memo = i.validMemoBytes('micropayment.memo')

    // contract, gas, amount, sender, functionParams, memo, fee
    let tx = client
        .contractCall(contract, gas, amount, sender, functionParams, memo, fee)
        .prepare()

    if (paymentServer === undefined) {
        done()
        return
    }
    // Enable this and invoke against a development payment server to proxy the call to Hedera
    const CONTRACTCALL = enumKeyByValue(Tx, Tx.CONTRACTCALL)
    socket = io.connect(paymentServer)

    socket.on('connect_error', function () {
        log('No socketio server available during tests. Skip.')
        done()
    })

    socket.on('connect', function () {
        socket.binary(true).emit(CONTRACTCALL, tx.data)
        socket.on(`${CONTRACTCALL}_RESPONSE`, async function (res) {
            log('res', res)
            socket.on('disconnect', () => {
                log('disconnected')
            })
            done()
        })
    })
})
