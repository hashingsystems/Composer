import { ContractCallTransactionBody } from '../../pbweb/ContractCall_pb'
import { TransactionID, SignatureList } from '../../pbweb/BasicTypes_pb'
import i from './internal'
import { TransactionBody, Transaction } from '../../pbweb/Transaction_pb'
import forge from 'node-forge'
import debug from 'debug'

const log = debug('test:contractcall')

/**
 *
 * contractCall prepares the contractCall object in a protobuf acceptable format to be parsed back.
 * @param {Object} self
 * @param {string} contract
 * @param {string} gas
 * @param {string} amount
 * @param {string} sender
 * @param {Uint8Array} functionParams
 * @param {string} memo
 * @param {number} fee
 * @param {boolean} generateRecord is a boolean to indicate whether records are to be stored in Hedera.
 */
function contractCall(
    self,
    contract,
    gas,
    amount,
    sender,
    functionParams,
    memo,
    fee,
    generateRecord
) {
    if (self.operator === undefined) {
        // operator (e.g. the current account that's paying the service fee to Hedera nodes)
        throw new Error(
            'please set the operator who will pay for this transaction before calling getAccountBalance'
        )
    }
    // let transferList = setRecipientTransferLists(sender, recipientList)

    let body = new ContractCallTransactionBody()
    body.setContractid(i.contractIDFromString(contract))
    body.setGas(parseInt(gas, 10))
    body.setAmount(parseInt(amount, 10))
    body.setFunctionparameters(Uint8Array.from(functionParams))

    let txID = new TransactionID()
    txID.setAccountid(i.accountIDFromString(sender))
    txID.setTransactionvalidstart(i.getTimestamp())

    log(`fee is ${fee}`)
    let txBody = new TransactionBody()
    txBody.setTransactionid(txID)
    txBody.setTransactionfee(fee)
    txBody.setTransactionvalidduration(i.getDuration())
    txBody.setGeneraterecord(generateRecord)
    txBody.setContractcall(body)
    txBody.setNodeaccountid(self.nodeAccountID)
    txBody.setMemo(memo)

    // sign
    let txBodyBytes = txBody.serializeBinary()
    let privateKeyHex = self.operator.keypair.privateKey
    let publicKeyHex = self.operator.keypair.publicKey
    let sig = i.signWithKeyAndVerify(txBodyBytes, privateKeyHex, publicKeyHex)

    let sigList = new SignatureList()
    sigList.setSigsList([sig])

    let tx = new Transaction()
    tx.setBody(txBody)
    // tx.setSigs(sigMain.getSignaturelist())
    tx.setSigs(sigList)
    log('tx body bytes')
    log(tx)
    console.log("tx body bytes")
    console.log(tx)
    log(forge.util.bytesToHex(tx.serializeBinary()))
    return tx
}

export default contractCall
