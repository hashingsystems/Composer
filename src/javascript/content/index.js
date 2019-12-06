import HederaTag from '../hedera-tags'
import {
    alertBanner,
    setButtonGroupOptions,
    smartContractBanner,
    cryptoTransferBanner
} from '../ui-utils'
import {
    tinyBarsToDollarsUnit
} from '../hedera/currency'
import {
    cryptoTransferController
} from '../viewcontroller/grpc'
import getContractCallController from '../viewcontroller/grpc/contractcall'
import debug from 'debug'
import {
    getLocalStorage,
    setLocalStorage
} from '../models/db'
import { getAccountBalance } from '../viewcontroller/grpc'
import { AccountManager } from '../models'
const log = debug('all:content')

async function contentListener(msg, sender, sendResponse) {
    log("content-listener::", msg, sender)
    // console.trace();
    // check that websites contain hedera-tag
    let micropaymentTag = HederaTag.micropayment(document, chrome.runtime.id);
    let contractTag = HederaTag.contract(document, chrome.runtime.id);

    if (msg.type === 'login') {
        // if there is a micropayment tag on this web page and
        // the user is not already logged in (i.e. accountID being undefined),
        // we will trigger the alertBanner
        if (micropaymentTag !== null && msg.accountID === undefined) {
            msg.redirect = micropaymentTag.redirect.noAccount
            let alertString =
                "Hang tight! We're redirecting you to the steps on setting up your Hedera Browser Extension."

            await alertBanner(alertString, false, false)
            setTimeout(() => {
                // msg.redirect defaults to /no-account
                window.location.href = msg.redirect
            }, 6000)
        }
    }

    if (msg.type === 'smart-contract-success' || msg.type === 'smart-contract-deny' || msg.type === 'micro-payment-success' || msg.type === 'micro-payment-deny') {
        log('msg.type:::', msg.res)
        window.postMessage(msg, "*")
    }
    // If the received message has the expected format...
    if (msg.type === 'smart-contract-trigger') {
        let alertString = `Please open the extension to continue`
        // await alertBanner(alertString, false, false, true)
        await smartContractBanner(alertString)
    }

    if (msg.type === 'crypto-transfer-trigger') {
        let alertString = `Please open the extension to continue`
        // await alertBanner(alertString, false, false, true)
        await cryptoTransferBanner(alertString)
    }

    if (msg.type === 'hedera-tag') {
        // console.log(msg.type)
        // log('micropaymentTag', micropaymentTag)
        // Contract tag takes precedence when hedera-tag is detected, micropayment tag will not be
        // executed because sendResponse for micropayment will no longer be triggered
        if (contractTag !== null) {
            // contractTag can be 3 possible values - a valid object OR false OR null
            if (contractTag === false) {
                // false, because the hedera-micropayment tag is invalid
                let alertString = `Invalid contract tag provided .`
                await alertBanner(alertString, false, false)
            } else {
                // let alertString = `Contract Function getting Called .`
                // await alertBanner(alertString, false, false)
                // TODO this get called from here this is trigger point
                // const data = {
                //     ...contractTag
                // }
                // let fileName = "smart-contract.html";
                // let url = new URL(`chrome-extension://${contractTag.extensionid}/html/${fileName}`)

                // let prefix = 'hedera-contract-'

                // let contractTagKey = prefix + url.origin


                // let _ = await setLocalStorage({
                //     [contractTagKey]: data
                // })
                log("callback::", sendResponse)
                sendResponse(contractTag)
                // let alertString = `Please open the extension to continue`
                // // await alertBanner(alertString, false, false, true)
                // await smartContractBanner(alertString)
                return true
            }
        }

        if (micropaymentTag !== null) {
            // micropaymentTag can be 3 possible values - a valid object OR false OR null
            if (micropaymentTag === false) {
                // false, because the hedera-micropayment tag is invalid
                let alertString = `Invalid micropayment tag provided by publisher. Please contact publisher directly.`
                await alertBanner(alertString, false, false)
            } else {
                // valid object
                log('send micropaymentTag', micropaymentTag)
                sendResponse(micropaymentTag)
            }
        }
    }

    if (msg.type === 'redirect') {
        log(msg.type, msg.redirect)
        setTimeout(() => {
            // defaults to /non-paying-account ("paywall")
            window.location.href = msg.redirect
        }, 4000)
    }

    if (msg.type === 'redirect-homepage') {
        log(msg.type, msg.redirect)
        // defaults to /
        setTimeout(() => {
            window.location.href = msg.redirect
        }, 4000)
    }

    // If the message is raise-threshold
    if (msg.type === 'raise-threshold') {
        log(msg.type)
        // handle conversion of tinyBars into currency string for rendering
        log(typeof tinyBarsToDollarsUnit(msg.currThr))
        log(msg.currThr, typeof msg.currThr)
        log(msg.requestedPayment, typeof msg.requestedPayment)
        let requestedPaymentUSD = `$${tinyBarsToDollarsUnit(
            msg.requestedPayment
        )}`

        let alertString = `The Daily Timestamp has content that costs up to 
        <span class="bold-text">${requestedPaymentUSD}</span>. Would you
        like to approve browsing up to this amount?`
        let document = await alertBanner(alertString)
        // approveOnly true results in one single button
        // approveOnly false results in 4 buttons
        setButtonGroupOptions(document, port, micropaymentTag, msg, true)
    }

    // if the message is crypto-transfer //TODO:Remove after testing
    if (msg.type === 'crypto-transfer') {
        // log(msg.type)
        // console.trace("crypto-transfer")
        //sendResponse(micropaymentTag)
        // await cryptoTransferController(msg.response, port, msg.url)
        let alertString = `Open Popup to do a crypto transfer`
        await cryptoTransferBanner(alertString)
    }
    log("contentListener returns true as promised...")
    return true
}

const name = 'hedera-channel'
let port = chrome.runtime.connect({
    name
})

port.onDisconnect.addListener(obj => {
    log('disconnected port', obj);
})

// port.onMessage.addListener(contentListener)
chrome.runtime.onMessage.addListener(contentListener)



// Code to inject variable
var script = document.createElement('script');
script.textContent = `var extensionId = ${JSON.stringify(chrome.runtime.id)};`;
(document.head || document.documentElement).appendChild(script);
script.parentNode.removeChild(script);

// Code to Inject CDN
var script2 = document.createElement('script');
script2.type = 'text/javascript';
script2.src = 'https://cdn-hashjs.s3.amazonaws.com/hash.js';
(document.head || document.documentElement).appendChild(script2);

var script3 = document.createElement('script');
script3.type = 'text/javascript';
script3.src = 'https://cdn-hashjs.s3.amazonaws.com/assist.js';
(document.head || document.documentElement).appendChild(script3);


document.addEventListener('DOMNodeInserted', async (msg, sender, sendResponse) => {
    let micropaymentTag = HederaTag.micropayment(document, chrome.runtime.id)
    let contractTag = HederaTag.contract(document, chrome.runtime.id)
    let balanceTag = HederaTag.checkBalanceTag(document, chrome.runtime.id);
    if (contractTag !== null) {
        let e = document.getElementsByTagName('hedera-contract')[0]
        e.parentNode.removeChild(e);
        if (contractTag === false) {
            let alertString = `Invalid contract tag provided .`
            await alertBanner(alertString, false, false)
        } else {
            // sendResponse(contractTag)
            log('port::', port)
            let text = 'hedera-contract-tag'

            port.postMessage({
                text,
                contractTag
            })
        }
    }

    if (micropaymentTag !== null) {
        let e = document.getElementsByTagName('hedera-micropayment')[0]
        e.parentNode.removeChild(e);
        // micropaymentTag can be 3 possible values - a valid object OR false OR null
        if (micropaymentTag === false) {
            // false, because the hedera-micropayment tag is invalid
            let alertString = `Invalid micropayment tag provided by publisher. Please contact publisher directly.`
            await alertBanner(alertString, false, false)
        } else {
            // valid object
            log('send micropaymentTag', micropaymentTag)
            // sendResponse(micropaymentTag)
            let text = 'hedera-micropayment-tag'

            port.postMessage({
                text,
                micropaymentTag
            })
        }
    }

    if (balanceTag) {
        let e = document.getElementsByTagName('hedera-balance')[0]
        const accountID = e.getAttribute("data-accountID")
        e.parentNode.removeChild(e);
        // balanaceTag can be 2 possible values - a true OR false 
        let am = await new AccountManager().init()
        let currentAccount = await am.getCurrentAccountObject()
        if (accountID && (accountID.split('.')).length === 3) {
            currentAccount.details.accountID = accountID;
        }
        await getAccountBalance(currentAccount.details, false, (err, balance) => {
            if (err) {
                window.postMessage({ type: 'hedera-balance-deny', res: err }, "*")
            } else {
                window.postMessage({ type: 'hedera-balance-success', res: { balance, 'currentAccount': currentAccount.accountID } }, "*")
            }
        })
    }
})