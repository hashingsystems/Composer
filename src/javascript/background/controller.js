import {
    iconConfigured,
    iconInstalled,
    iconBlocked,
    iconActive,
    openModal,
    popupSetAndSegue,
    alertBanner,
    alertNotification
} from '../ui-utils'
import {
    StateManager,
    AccountManager
} from '../models'
import k from '../models/constants'
import i from '../hedera/internal'
import {
    setLocalStorage,
    getLocalStorage
} from '../models/db'
import {
    cookiesGet,
    tabsQuery
} from '../chrome-promise'
import {
    HostRule
} from '../models'
import debug from 'debug'
import featureFlags from '../features'

const log = debug('all:background:controller')

/** 
 * check if we have a current user account
 * @returns {object}
 */
const manageUser = async () => {
    let am = await new AccountManager().init()
    let currentAccount = await am.getCurrentAccountObject()
    let type = 'login'
    let msg = {
        type
    }
    if (currentAccount !== undefined && currentAccount !== null) {
        msg.accountID = currentAccount.accountID
        return {
            currentAccount,
            msg
        }
    }
    return {
        currentAccount: undefined,
        msg
    }
}

/**
 * manage the smart contract information by saving into local storage
 * and switch the browser extension icon to green
 * @param {*} url
 * @param {*} response
 */
const manageSmartContract = async (url, response) => {
    // const contractTag = response
    // const prefix = 'hedera-contract-'
    // const contractTagKey = prefix + url.origin + url.pathname
    // await setLocalStorage({
    //     [contractTagKey]: contractTag
    // })
    // log('GREEN') // indicate to user that he/she should open the extension popup
    // iconActive()
    log("manageSmartContract::", url, response);
    const contractTag = response
    let fileName = "smart-contract.html";
    // let _url = new URL(`chrome-extension://${contractTag.extensionid}/html/${fileName}`)
    let senderUrl = url.searchParams.get('sender_url');
    let sufixUrl = senderUrl !== null ? senderUrl : url.origin
    let prefix = 'hedera-contract-'
    let contractTagKey = prefix + sufixUrl

    let currTab = await manageTabError()

    contractTag.windowId = currTab.windowId

    await setLocalStorage({
        [contractTagKey]: contractTag
    })
    let resp = await getLocalStorage(contractTagKey)
    log('GREEN', resp) // indicate to user that he/she should open the extension popup
    iconActive()

    // chrome.tabs.sendMessage(currTab.id, msg)
    window.open(`chrome-extension://${contractTag.extensionid}/html/smart-contract-details.html?sender_url=${sufixUrl}&windowId=${currTab.windowId}`, "extension_popup", "height=500,width=350,status=no,scrollbars=yes,resizable=no");
}

const manageStateSmartContract = async (url, response) => {
    if (response !== undefined) {
        if (i.contractIdExistsAndIsValid(response.contractid)) {
            log('contract scenario with hedera-contract object', response)

            // Community Testing V2 feature flag
            if (featureFlags.communityTestingV2) {
                let handleSmartContract = true;

                if (handleSmartContract) {
                    await manageSmartContract(url, response)
                }
            } else {
                // hedera-contract is handled for any website
                await manageSmartContract(url, response)
            }
            return true
        }
    }
    return false
}

const manageStateMicropayment = async (currTab, url, response) => {
    let sm = await new StateManager().init(url, response)
    let state = sm.getState()
    log("manageStateMicropayment:", response, state, currTab)
    //save: response
    let fileName = "crypto-transfer-details.html";
    let _url = new URL(`chrome-extension://${response.extensionId}/html/${fileName}`)
    let prefix = 'hedera-micropayment-'
    let senderUrl = url.searchParams.get('sender_url');
    let sufixUrl = senderUrl !== null ? senderUrl : url.origin
    let micropaymentTagKey = prefix + sufixUrl
    await setLocalStorage({
        [micropaymentTagKey]: response
    })
    // let resp = await getLocalStorage(micropaymentTagKey)
    // let currTab = await manageTabError()
    // chrome.tabs.sendMessage(currTab.id, msg)
    window.open(`chrome-extension://${response.extensionId}/html/crypto-transfer-details.html?sender_url=${sufixUrl}&windowId=${currTab.windowId}`, "extension_popup", "height=500,width=350,status=no,scrollbars=yes,resizable=no");
    // if (state.icon === k.ICON_STATE.RED) {
    //     iconBlocked()
    //     log('RED', state)
    //     if (state.msg !== null) chrome.tabs.sendMessage(currTab.id, state.msg)
    // } else if (state.icon === k.ICON_STATE.BLACK) {
    //     iconConfigured()
    //     log('BLACK', state)
    //     if (state.msg !== null) chrome.tabs.sendMessage(currTab.id, state.msg)
    // } else if (state.icon === k.ICON_STATE.GREEN) {
    //     iconActive()
    //     log('GREEN', state)
    //     if (state.msg !== null) chrome.tabs.sendMessage(currTab.id, state.msg)
    // } else {
    //     iconInstalled()
    //     log('GREY', state)
    //     if (state.msg !== null) chrome.tabs.sendMessage(currTab.id, state.msg)
    // }
}

const manageState = async (currTab, url, response) => {
    // contract scenario
    log("manageState:::", currTab);
    const isFound = await manageStateSmartContract(url, response)
    if (isFound) return // skips micropayment handling if hedera-contract is found

    // micropayment scenario is handled by StateManager
    await manageStateMicropayment(currTab, url, response)
}

const manageRuntimeError = response => {
    let lastError = chrome.runtime.lastError
    if (lastError) {
        log("manageRuntimeError:", lastError.message, response)
        if (response === undefined) {
            iconInstalled()
            // true, there is an error
            return true
        }
    }
    // no error
    return false
}

/**
 * Handles undefined tab error
 */
const manageTabError = async () => {
    let active = true
    let lastFocusedWindow = true
    let q = {
        active,
        lastFocusedWindow
    }
    let tabs = await tabsQuery(q)
    let currTab = tabs[0]
    if (currTab === undefined) {
        // icon grey, ie not active
        iconInstalled()
        return undefined
    }
    return currTab
}

const manageHostRule = async url => {
    if (ignoreNonHttp(url)) return
    log(url.origin)
    let hostRule = await new HostRule().init(url.origin)
    let statusRule = await hostRule.getOrSetStatusRule()
    log(statusRule)
}

/**
 * Get the customerID from the website cookie for later use
 * @param {URL} url
 */
const manageUserCookies = async url => {
    if (ignoreNonHttp(url)) return

    let cookie
    try {
        cookie = await cookiesGet(url.origin, 'micropaymentID')
    } catch (e) {
        return
    }

    if (cookie !== undefined && cookie !== null) {
        let customerID = cookie.value
        await setLocalStorage({
            customerID
        })
    }
}

const ignoreNonHttp = url => {
    return url.protocol !== 'http:' && url.protocol !== 'https:'
}

export {
    manageUser,
    manageState,
    manageRuntimeError,
    manageTabError,
    manageHostRule,
    manageUserCookies,
    manageSmartContract,
    manageStateSmartContract,
    manageStateMicropayment
}