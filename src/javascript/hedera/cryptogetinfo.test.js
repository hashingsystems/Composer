import Hedera from '../hedera'
import addressbook from '../hedera/address-book'
import { enumKeyByValue } from '../hedera/utils'
import { Query } from '../../pbweb/Query_pb'
import io from 'socket.io-client'
import dotenv from 'dotenv'
import debug from 'debug'

const log = debug('test:hedera:cryptogetinfo')

const Q = Query.QueryCase

test('cryptogetinfo', async () => {
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
    const hedera = new Hedera.Client(nodeAddress, nodeAccount)
    let keypair = {
        privateKey: testaccount.privateKey,
        publicKey: testaccount.publicKey
    }
    let sender = testaccount.accountID
    let client = hedera.withOperator(keypair, sender).connect()

    let q = client.cryptoGetInfo(sender, 'cryptoGetInfo').prepare()

    const CRYPTOGETINFO = enumKeyByValue(Q, Q.CRYPTOGETINFO)
    // const socket = io.connect('http://localhost:8099')
    // console.log(socket.connected)
    // if (socket.connected) {
    //     socket.on('connect', function() {
    //         socket.binary(true).emit(CRYPTOGETINFO, q.data)
    //         socket.on(`${CRYPTOGETINFO}_RESPONSE`, async function(res) {
    //             log('res', res)
    //         })
    //     })
    // }
    // done()
})
