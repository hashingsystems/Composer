import {
    Transactions,
    AccountManager
} from './models'
import List from 'list.js'
import debug from 'debug'

const log = debug('all:recent-transactions')

document.addEventListener('DOMContentLoaded', async function () {
    let getI18n = chrome.i18n.getMessage
    document.getElementById('recentTransactionsText').innerHTML = getI18n(
        'recent_transactions_text'
    )

    // current account
    let am = await new AccountManager().init()
    let a = await am.getCurrentAccountObject()

    // retrieve micropayment transactions for this account
    let txs = await new Transactions().init(a.accountID)
    log(txs)
    let transactionList = await txs.retrieve()
    log('Retrieved transactions', transactionList)
    let _transactionList = []
    transactionList.forEach((transaction, index) => {
        if (transaction.type === 'smart-contract-call') {
            transaction.host = transaction.contractID
            transaction.icon = `<img src="../html/images/icon-contract.png"/>`;
        } else {
            transaction.icon = `<img src="../html/images/cyrpto-transfer-icon.png"/>`;
        }

        _transactionList.push(transaction)
    });
    log('Retrieved transactions paul', transactionList, _transactionList)

    let options = {
        valueNames: ['icon', 'host', 'amount', 'created'],
        item: '<li><span class="icon"></span>' +
            '<span class="host"></span>' +
            '<span class="amount"></span>' +
            '<span class="created"></span></li>'
    }

    transactionList.sort(function compare(a, b) {
        var dateA = new Date(a.created);
        var dateB = new Date(b.created);
        return dateB - dateA;
    });

    // render into UI
    new List('recent-transactions', options, transactionList)
})