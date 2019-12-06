import {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage
} from './models/db'
import {
    tabsQuery
} from './chrome-promise'
import {
    buttonState
} from './ui-utils/buttons'
import getContractCallController from './viewcontroller/grpc/contractcall'
import {
    tinyBarsToDollarsUnit,
    tinyBarsToHBarsUnit
} from './hedera/currency'
import debug from 'debug'
import {
    iconInstalled,
    iconBlocked
} from './ui-utils'
import { hexToAccountID } from './hedera/utils';

const log = debug('all:smart-contract-details')

document.addEventListener('DOMContentLoaded', async () => {

    let getI18n = chrome.i18n.getMessage
    document.getElementById('smartContractText').innerHTML = getI18n(
        'smart_contract_text'
    )
    document.getElementById('contractIDText').innerHTML = getI18n(
        'contract_id_text'
    )
    document.getElementById('transactionCostText').innerHTML = getI18n(
        'transaction_cost_text'
    )
    document.getElementById('smartContractTNC').innerHTML = getI18n(
        'smart_contract_tnc'
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

    let prefix = 'hedera-contract-'
    let urlString = url.origin
    let senderUrl = url.searchParams.get('sender_url');
    let windowId = url.searchParams.get('windowId');
    let sufixUrl = senderUrl !== null ? senderUrl : urlString
    log(sufixUrl, windowId, url.searchParams);
    let contractTagKey = prefix + sufixUrl

    let contractTag = await getLocalStorage(contractTagKey)

    windowId = windowId ? windowId : contractTag.windowId
    // log(contractTag);
    console.log("tag: ", contractTag)
    console.log("urlString: ", urlString, senderUrl, sufixUrl)
    console.log("contractTagKey: ", contractTagKey)

    let closePopup = () => {
        setTimeout(() => {
            window.close();
        }, 500);
    }
    let sendResponse = async (params, cb) => {
        let _ = await removeLocalStorage(contractTagKey)
        if (windowId) {
            const q = {
                active: true,
                windowId: parseInt(windowId)
            }
            let tabs = await tabsQuery(q)
            let currTab = tabs[0]
            chrome.tabs.sendMessage(currTab.id, params);
        }
        switch (params.type) {
            case 'smart-contract-success':
                log("SendResponse::", params.res)
                iconInstalled(() => {
                    cb && cb()
                })
                break;
            case 'smart-contract-deny':
                iconBlocked(() => {
                    cb && cb()
                })
                break;
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
        if (contractTag === undefined || contractTag === null) {
            window.location.href = 'smart-contract.html'
            return
        }
    }

    // locate our dom elements (UI elements)
    let contractIDEl = document.getElementById('contract-id')
    let transactionCostEl = document.getElementById('transaction-cost')
    let paramsEl = document.getElementById('params')
    let acceptButtonEl = document.getElementById('accept')
    let denyButtonEl = document.getElementById('deny')

    // assign the params
    if (contractTag !== undefined) {
        let params = contractTag.params
        let abi = contractTag.abi
        if (Array.isArray(abi)) {
            abi = abi[0];
        }
        let contractid = contractTag.contractid
        let transactionCostInUsdObj = {}
        let transactionCostInHbar = 0
        if (transactionCostEl !== undefined) {
            transactionCostInUsdObj = tinyBarsToDollarsUnit(200000)
            transactionCostInHbar = tinyBarsToHBarsUnit(200000)
            transactionCostEl.value =
                `$ ${transactionCostInUsdObj.toNumber()}` +
                ' / ' +
                `${transactionCostInHbar.toPrecision(8)} ℏ`
        }

        if (params && params.length > 0 && abi.inputs && params.length === abi.inputs.length) {
            //Render UI for the parameters
            abi.inputs.forEach((input, index) => {
                let _label = input.name;
                let _value = params[index];
                let _type = input.type;
                if (_type === 'address') {
                    _value = hexToAccountID(_value);
                }
                paramsEl.appendChild(_createChildElement(_label, _value));
            });
        }

        contractIDEl.value = contractid

        log("VD:: contractTag :: ", contractTag);

        if (acceptButtonEl !== undefined) {
            acceptButtonEl.onclick = async function (e) {
                e.preventDefault()
                buttonState(acceptButtonEl, 'loading')
                await getContractCallController(contractTag, urlString, (err, res) => {
                    log("Got callback::: ", res);

                    if (err) {
                        let type = 'smart-contract-deny'
                        sendResponse({
                            type,
                            res: err
                        }, () => {
                            //closePopup();
                        })
                        closePopup();
                    } else {
                        let type = 'smart-contract-success'
                        sendResponse({
                            type,
                            res
                        }, () => {
                            //closePopup();
                        })
                        closePopup();

                    }
                })
            }
        }

        if (denyButtonEl !== undefined) {
            denyButtonEl.onclick = async function (e) {
                log(currTab);
                e.preventDefault()
                // buttonState(denyButtonEl, 'loading')
                // window.location.href = "account-overview.html"
                let type = 'smart-contract-deny'
                let res = 'Permission Denied'
                sendResponse({
                    type,
                    res
                }, () => {
                    //closePopup()
                })
                closePopup();
            }
        }

    }
})