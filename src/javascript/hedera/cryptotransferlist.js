import { AccountAmount, TransferList } from '../../pbweb/CryptoTransfer_pb'
import i from './internal'
import debug from 'debug'

const log = debug('all:hedera:cryptotransferlist')

/**
 *
 * setReceipientTransferLists prepares the transferList
 * @param {string} sender refers to the paying account. It is a string delimited by dot, of the format 'shardNum.realmNum.accountNum'.
 * @param {Array} recipientList refers to the list of accounts receiving the payment. It consists of the amount and accountID of receiver.
 */
function setRecipientTransferLists(sender, recipientList) {
    if (recipientList === undefined || recipientList.length === 0) {
        // no recipients for cryptotransfer
        throw new Error('No recipients for cryptotransfer')
    }

    if (sender === undefined || sender === '0.0.0') {
        throw new Error('Invalid sender for cryptotransfer')
    }

    let transferList = new TransferList()
    let finalList = []
    let totalDeducted = 0
    log('recipientList', recipientList)

    for (var k in recipientList) {
        // user[k] = recipientList[k];
        let xAcctAmtRecipient = new AccountAmount()
        xAcctAmtRecipient.setAccountid(
            i.accountIDFromString(recipientList[k].to)
        )
        xAcctAmtRecipient.setAmount(parseInt(recipientList[k].tinybars))
        log('xAcctAmtRecipient', xAcctAmtRecipient)
        finalList.push(xAcctAmtRecipient)

        totalDeducted += parseInt(recipientList[k].tinybars)
    }
    // Last in the list will be the sender
    log('totalDeducted', totalDeducted)
    let acctAmtSender = new AccountAmount()
    acctAmtSender.setAccountid(i.accountIDFromString(sender))
    acctAmtSender.setAmount(-totalDeducted)
    finalList.push(acctAmtSender)

    log('listOfRecipients', finalList)
    transferList.setAccountamountsList(finalList)
    return transferList
}

export default setRecipientTransferLists
