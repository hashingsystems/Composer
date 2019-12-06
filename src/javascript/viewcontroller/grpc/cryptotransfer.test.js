import * as ioClient from 'socket.io-client'
import * as io from 'socket.io'
import MSocketClient from './mocks-unit-test/socket/msocket'
import { eventPayload } from './mocks-unit-test/socket/msocket-event-payload'
import debug from 'debug'
import { enumKeyByValue } from '../../hedera/utils'
import { TransactionBody } from '../../../pbweb/TransactionBody_pb'
import portListener from '../../background/port'
import chrome from 'sinon-chrome/extensions'
import { cryptoTransferTx } from './cryptotransfer'
import { AccountManager, NetworkManager, Account } from '../../models'

const log = debug('all:viewcontroller:grpc')
const Tx = TransactionBody.DataCase
const socketUrl = 'http://localhost:5000'
const options = {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket']
}

let server
let socket
let client

beforeEach(async () => {
    chrome.flush()
    jest.setTimeout(10000)
    localStorage.clear()
})

beforeAll(async () => {
    global.chrome = chrome
})

afterAll(async () => {
    chrome.flush()
    delete global.chrome
})

test('cryptoTransferTx call', async () => {
    let recipientList = [
        {
            tinybars: 222,
            to: '0.0.1002'
        }
    ]
    let submissionNode = '0.0.4'
    let paymentServer = process.env.TEST_PAYMENTSERVER
    let extensionId = ''
    let memo = 'cryptocontrollertest'
    let type = 'article'
    let contentID = '1'

    let micropayment = {
        recipientList, // list of recipients for crypto transfer in object type
        submissionNode, // Node that will be used for the transaction (Optional: If not present it will be replaced with random node)
        paymentServer, // ip address of the payment server
        extensionId,
        contentID,
        memo,
        type
    }

    let port = chrome.runtime.onConnect.addListener(portListener)
    let url = 'https://wordpress.thetimesta.mp'

    const testAccount = {
        accountID: process.env.TEST_ACCOUNTID,
        publicKey: process.env.TEST_PUBLICKEY,
        privateKey: process.env.TEST_PRIVATEKEY,
        solidityAddress: process.env.TEST_SOLIDITYADDRESS
    }
    let am = await new AccountManager().init(testAccount)
    await am.setCurrentAccount(testAccount)

    let alldata = await cryptoTransferTx(micropayment, port, url)
    expect(alldata.data.accountID).toBe(testAccount.accountID)
    expect(alldata.data.host).toBe('https://wordpress.thetimesta.mp')
    expect(alldata.data.path).toBe('/')
    expect(alldata.data.amount).toBe(222)
    expect(alldata.data.transactionId).toBeDefined()
    jest.restoreAllMocks()
})
