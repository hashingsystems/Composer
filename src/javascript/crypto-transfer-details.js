import {
    getLocalStorage,
    removeLocalStorage
} from './models/db'
import {
    tabsQuery
} from './chrome-promise'
import {
    buttonState
} from './ui-utils/buttons'
import {
    cryptoTransferController
} from './viewcontroller/grpc'
import {
    tinyBarsToDollarsUnit,
    tinyBarsToHBarsUnit
} from './hedera/currency'
import debug from 'debug'
import {
    iconInstalled,
    iconBlocked
} from './ui-utils'

const log = debug('all:crypto-transfer-details')

document.addEventListener('DOMContentLoaded', async () => {

    let getI18n = chrome.i18n.getMessage
    document.getElementById('cryptoTransferText').innerHTML = getI18n(
        'crypto_transfer_text'
    )
    document.getElementById('toAccountIdText').innerHTML = getI18n(
        'to_account_id_text'
    )
    document.getElementById('hbarAmountText').innerHTML = getI18n(
        'hbar_amount_text'
    )
    document.getElementById('dollarAmountText').innerHTML = getI18n(
        'dollar_amount_text'
    )
    document.getElementById('memoText').innerHTML = getI18n(
        'memo_text'
    )
    document.getElementById('acceptButtonText').innerHTML = getI18n(
        'accept_button_text'
    )
    document.getElementById('denyButtonText').innerHTML = getI18n(
        'deny_button_text'
    )
    // which URL is the user on
    const q = {
        active: true,
        currentWindow: true
    }
    let tabs = await tabsQuery(q)
    let currTab = tabs[0]
    let url = new URL(currTab.url)

    let prefix = 'hedera-micropayment-'
    let urlString = url.origin
    let senderUrl = url.searchParams.get('sender_url');
    let windowId = url.searchParams.get('windowId');
    let sufixUrl = senderUrl !== null ? senderUrl : urlString
    log(sufixUrl);
    let micropaymentTagKey = prefix + sufixUrl

    let micropaymentTag = await getLocalStorage(micropaymentTagKey)
    // log(contractTag);
    console.log("tag: ", micropaymentTag)
    console.log("urlString: ", urlString, senderUrl)
    console.log("micropaymentTagKey: ", micropaymentTagKey)

    let sendResponse = async (params, response) => {
        let _ = await removeLocalStorage(micropaymentTagKey)
        const q = {
            active: true,
            windowId: parseInt(windowId)
        }
        let tabs = await tabsQuery(q)
        let currTab = tabs[0]
        chrome.tabs.sendMessage(currTab.id, params);
        switch (params.type) {
            case 'micro-payment-success':
                iconInstalled(() => {
                    window.close()
                })
                break;
            case 'micro-payment-deny':
                iconBlocked(() => window.close())
        }
    }

    let _createChildElement = (_label, _value) => {
        let div = document.createElement("div");
        div.setAttribute("class", "form-group col-6");
        let label = document.createElement("label");
        label.innerHTML = _label;
        div.appendChild(label);
        let input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("value", _value);
        input.setAttribute("readonly", true);
        div.appendChild(input);
        return div;

    }

    if (window.location.protocol !== 'chrome-extension:') {
        if (micropaymentTag === undefined || micropaymentTag === null) {
            window.location.href = 'account-overview.html'
            return
        }
    }

    // locate our dom elements (UI elements)
    let toAccountId = document.getElementById('account-id')
    let hbarAmountEl = document.getElementById('hbarAmount')
    let dollarAmountEl = document.getElementById('dollarAmount')
    let memoEl = document.getElementById('memo-text')
    let acceptButtonEl = document.getElementById('accept')
    let denyButtonEl = document.getElementById('deny')

    // assign the params
    if (micropaymentTag !== undefined) {
        let toAccount = micropaymentTag.recipientList[0];
        let _toAccountId = toAccount.to;
        let transactionCostInUsdObj = {}
        let transactionCostInHbar = 0

        transactionCostInUsdObj = tinyBarsToDollarsUnit(toAccount.tinybars)
        transactionCostInHbar = tinyBarsToHBarsUnit(toAccount.tinybars)

        dollarAmountEl.value = `$ ${transactionCostInUsdObj.toNumber()}`
        hbarAmountEl.value = `${transactionCostInHbar.toPrecision(8)} ℏ`

        memoEl.value = micropaymentTag.memo

        toAccountId.value = _toAccountId

        // log("VD:: contractTag :: ", contractTag);

        if (acceptButtonEl !== undefined) {
            acceptButtonEl.onclick = async function (e) {
                e.preventDefault()
                buttonState(acceptButtonEl, 'loading')
                await cryptoTransferController(micropaymentTag, null, sufixUrl, (err, res) => {
                    log("Got callback::: ", res);
                    if (err) {
                        sendResponse({
                            type: 'micro-payment-deny',
                            res: err
                        })
                    } else {
                        sendResponse({
                            type: 'micro-payment-success',
                            res
                        })
                    }
                    // window.close();
                    // window.location.href = "account-overview.html"
                })
            }
        }

        if (denyButtonEl !== undefined) {
            denyButtonEl.onclick = async function (e) {
                log(currTab);
                e.preventDefault()
                // buttonState(denyButtonEl, 'loading')
                // window.location.href = "account-overview.html"
                let res = 'Permission Denied'
                sendResponse({
                    type: 'micro-payment-deny',
                    res
                })
            }
        }

    }
})