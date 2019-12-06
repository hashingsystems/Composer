"use strict";
import Hedera from '../../hedera'
import {
    enumKeyByValue,
    hexStringToUint8Array
} from '../../hedera/utils'
import io from 'socket.io-client'
import {
    TransactionBody
} from '../../../pbweb/TransactionBody_pb'
import {
    Query
} from '../../../pbweb/Query_pb'
import nodeAddress from '../../hedera/address'
import {
    AccountManager
} from '../../models'
import Transactions from '../../models/transactions'
import {
    AbiCoder
} from 'web3-eth-abi'
import i from '../../hedera/internal'
import debug from 'debug'
var fs = require('fs');


const log = debug('all:viewcontroller:grpc:contractcall')

/**
 *
 * A module that makes gRPC calls to Hedera network
 * @module gRPC
 */

/**
 * @const {Uint8Array} Tx Hedera TransactionBody in Uint8Array
 */
const Tx = TransactionBody.DataCase

/**
 * @const {string} CONTRACTCALL string generated using @see enumKeyByValue
 */
const CONTRACTCALL = enumKeyByValue(Tx, Tx.CONTRACTCALL)
/**
 * @const {} Q enum from Hedera Query
 */
const Q = Query.QueryCase
/**
 * @const {string} TRANSACTIONGETRECEIPT string generated using @see enumKeyByValue
 */
const TRANSACTIONGETRECEIPT = enumKeyByValue(Q, Q.TRANSACTIONGETRECEIPT)

const TRANSACTIONGETRECORD = enumKeyByValue(Q, Q.TRANSACTIONGETRECORD)

let count = 0

/**
 *
 * getContractCallController will send to composed contract call transaction body back
 * @param {*} contractTag
 * @param {*} urlString
 */
async function getContractCallController(contractTag, urlString, callback) {
    // log('contractTag', contractTag)
    try {

        let paymentServer = contractTag.paymentserver
        let submissionNode = contractTag.submissionNode // which is null
        // prepare (and sign) the tx object to be forwarded back to Nik
        let node = nodeAddress.getNodeAddr(submissionNode)

        let am = await new AccountManager().init()
        let a = await am.getCurrentAccountObject()

        // sender details
        let sender = a.accountID
        // log('sender', sender, typeof sender)
        let keypair = a.keypair
        let contract = contractTag.contractid
        let abi = contractTag.abi
        let params = contractTag.params
        // validate memo < 100 bytes
        let memo = i.validMemoBytes(contractTag.memo)

        // To send composed body directly or do more operator work here??

        const hedera = new Hedera.Client(node.address, node.account)
        let client = hedera.withOperator(keypair, sender).connect()

        // prepend buyer inputs
        // abi.inputs.unshift({ "name": "domainName", "type": "string" })
        // prepend buyer contract account id (translated by Hedera)
        // let address = i.solidityAddressFromAccountIDString(sender)
        // params.unshift(address)

        const abiCoder = new AbiCoder()
        // Additionally remove the first byte "0x" with `slice(2)`
        // This first bye "0x" denotes a hex string
        // because the extra "0x" byte deserializes incorrectly in other languages
        // and causes transaction to fail on Hedera
        let functionParams
        try {
            const functionParamsHex = abiCoder.encodeFunctionCall(abi[0], params).slice(2)
            functionParams = hexStringToUint8Array(functionParamsHex)
        } catch (e) {
            if (callback) {
                return callback(" Encoding function Params", null);
            }
        }

        // log("pablo params hex - ", functionParamsHex)


        const gas = 100000
        // log('GAS', gas)

        const amount = contractTag.amount
        // log('AMOUNT', amount)

        const fee = 100000000


        let tx = client
            .contractCall(contract, gas, amount, sender, functionParams, memo, fee)
            .prepare();

        // log("client - ", tx)

        // connect to payment-server and pass the request, and get a response
        log("paymentServer - ", paymentServer)
        const socket = io.connect(paymentServer, {
            transports: ['websocket']
        })

        let finalData = null;

        socket.on('connect', function () {

            log('socket.on connect count', count)

            if (count === 0) {
                log('CONTRACTCALL', CONTRACTCALL)
                log('tx.data ', tx.data)
                socket.binary(true).emit(CONTRACTCALL, tx.data)
            }

            count += 1
            // We might want to check in indexed-db if this CONTRACTCALL has ever been made successfully
            // if it has been made successfully, we might want to stop the socketio event CONTRACTCALL
            // from emitting again

            socket.on(`${CONTRACTCALL}_RESPONSE`, async function (res) {
                log("CONTRACTCALL_RESPONS res : ", res);
                try {
                    // this wa reading the response wrong. Just check for nodePrecheckcode 0.
                    //  That means its accepted by the initial checks.
                    //  then we wait for consensus.
                    if (res.responseData.nodePrecheckcode == 0) {
                        log("res.message ::::::::::", res);
                        log(tx.id)
                        let q = client.getTransactionReceipts(tx.id).prepare()
                        log(q)
                        socket.binary(true).emit(TRANSACTIONGETRECEIPT, q.data)
                    } else {
                        if (callback) {
                            callback(res, null);
                        }

                    }
                } catch (e) {
                    if (callback) {
                        callback(e, null);
                    }
                    log("error in hedera call");
                    log(e.message)
                }
                // socket.disconnect()
            })

            socket.on(`${TRANSACTIONGETRECEIPT}_RESPONSE`, async res => {
                log("Getting the transaction receipt")
                log(`${TRANSACTIONGETRECEIPT}_RESPONSE`, res)

                //if (res.receiptStatus === ResponseCodeEnum.SUCCESS) data.receipt = true
                //indexedDBSave(data, port)
                //    -------------------------------------------------------

                // now that we can check if it was successful
                // we need to make a call to get the transaction record. this will give us access to the variable(s) returned by the contract.

                let postData = await getFunctionPostData(tx.id, abi)
                postData.contractID = contract;
                postData.memo = memo;
                postData.sender = sender;
                postData.amount = amount;
                finalData = postData;
                // socket.binary(true).emit(TRANSACTIONGETRECORD, postData)
                if (res.receiptStatus == 22) {
                    socket.emit(TRANSACTIONGETRECORD, postData);
                } else {
                    if (callback) {
                        callback(res, null);
                    }
                }

            })

            socket.on(`${TRANSACTIONGETRECORD}_RESPONSE`, async res => {
                log("Getting the transaction response", res)
                log(`${TRANSACTIONGETRECORD}_RESPONSE`, res)
                let result = res.result
                //save postData and res.Result in DB
                // log('postData:', finalData, tx)
                let _data = {
                    ...finalData,
                    result
                }
                _data.transactionId = _data.transactionID
                log(_data);
                let txs = await new Transactions().init(_data.sender)
                txs.saveSmartContractDetails(_data)
                if (callback) {
                    callback(null, res);
                }
                socket.disconnect()
            })

            socket.on("disconnect", async function (res) {
                log("disconnect : ", res);
            })
        })
    } catch (e) {
        console.log(e)
        if (callback) {
            callback(e, null);
        }
    }
}

async function getFunctionPostData(txID, abi) {

    let accountNumber = txID.array[1][2]
    let timeInSeconds = txID.array[0][0]
    let timeInNanoSeconds = txID.array[0][1]

    let functionName = abi[0]['name']
    let transactionID = `0.0.${accountNumber}@${timeInSeconds}.${timeInNanoSeconds}`

    return ({
        accountNumber,
        timeInSeconds,
        timeInNanoSeconds,
        functionName,
        ABIData: abi,
        transactionID,

    });
}
// export { getContractCallController }
export default getContractCallController