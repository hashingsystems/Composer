import { Query } from '../../../pbweb/Query_pb'
import { enumKeyByValue } from '../../hedera/utils'
import { AccountManager } from '../../models'
import Hedera from '../../hedera'
import io from 'socket.io-client'
import errorHandler from './errorhandler'

/**
 *
 * @module gRPC
 */

/**
 * @const {} enum from Hedera Query
 */
const Q = Query.QueryCase
/**
 * @const {string} FILEGETCONTENTS string generated using @see enumKeyByValue
 */
const FILEGETCONTENTS = enumKeyByValue(Q, Q.FILEGETCONTENTS)

/**
 *
 * fileGetContentsController handles all file calls to Hedera using socket.io
 * @param {string} file is FileID in string format
 */
async function fileGetContentsController(file) {
    let am = await new AccountManager().init()
    let a = await am.getCurrentAccountObject()

    const hedera = new Hedera.Client(NODE_ADDRESS, NODE_ACCOUNT)
    let client = hedera.withOperator(a.keypair, a.accountID).connect()
    let req = client.fileGetContents(file).prepare()

    const socket = io.connect(PAYMENT_SERVER)
    socket.on('connect', function() {
        socket.binary(true).emit(FILEGETCONTENTS, req.data)
        socket.on(`${FILEGETCONTENTS}_RESPONSE`, async function(res) {
            if (errorHandler(res)) return

            // SUCCESS
            // TODO: handle the returned file contents
        })
    })
}

export default fileGetContentsController
