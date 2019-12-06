import {
    createImage,
    updateImage
} from './qr'
import bannerCSS from '../../html/css/banner.css'
import debug from 'debug'

const log = debug('all:ui-utils')

/**
 *
 * @module UI-Utils
 */

let parseHTML = function (str) {
    let tmp = document.implementation.createHTMLDocument()
    tmp.body.innerHTML = str
    return tmp.body.children
}

let getHTML = function (url, callback) {
    // feature detection
    if (!window.XMLHttpRequest) return

    // create new request
    let xhr = new XMLHttpRequest()

    // setup callback
    xhr.onload = function () {
        if (callback && typeof callback === 'function') {
            callback(this.responseXML)
        }
    }

    // get the HTML
    xhr.open('GET', url)
    xhr.responseType = 'document'
    xhr.send()
}

let getHTMLAsync = function (url) {
    return new Promise((resolve, reject) => {
        getHTML(url, htmlDocument => {
            log('getHTMLAsync')
            log(typeof htmlDocument)
            if (htmlDocument !== undefined) {
                resolve(htmlDocument)
            } else {
                reject('no html document for you')
            }
        })
    })
}

// alertString is the error message for the user
// elem is the element to disable
// timing  (in millinseconds) is the time before el is enabled again
// alertString, elem, timing = 3000

let alertNotification = async function (alertObj, kill = false) {
    // do not inject notification if it already exists
    log(alertObj)
    let existingNotification = document.getElementById('notification')
    if (kill && existingNotification) {
        existingNotification.parentNode.removeChild(existingNotification)
        return
    }
    if (kill) return
    if (existingNotification !== null) return

    let url = chrome.extension.getURL('html/notification.html')
    let html = await getHTMLAsync(url)

    // notification node
    const n = html.getElementById('notification')
    const textPara = n.querySelector('p')
    textPara.innerHTML = alertObj.alertString
    const button = html.getElementById('once')
    button.onclick = function () {
        body.removeChild(n)
        mockPopups.forEach(el => {
            el.style.borderTopLeftRadius = '5px'
            el.style.borderTopRightRadius = '5px'
        })
    }

    // body node
    const body = document.getElementsByTagName('body')[0]
    // mockup node list
    const mockPopups = document.querySelectorAll('.mock-popup')
    mockPopups.forEach(el => {
        el.style.borderTopLeftRadius = '0px'
        el.style.borderTopRightRadius = '0px'
    })
    body.insertBefore(n, body.childNodes[0])

    // execute callback function if there is one
    let timing = alertObj.timing ? alertObj.timing : 3000
    log('timing', timing)
    if (alertObj.cb) {
        setTimeout(() => {
            if (alertObj) {
                alertObj.cb(alertObj.elem)
            }
            n.parentNode.removeChild(n)
        }, timing)
    } else {
        setTimeout(() => {
            n.parentNode.removeChild(n)
        }, timing)
    }
}

let cryptoTransferBanner = async function (alertString,
    buttonGroup = false,
    loginStatus = false,
    actionTrigger = "crypto-transfer") {
    let banner = await alertBanner(alertString, buttonGroup, loginStatus, actionTrigger)
    return banner
}

let smartContractBanner = async function (
    alertString,
    buttonGroup = false,
    loginStatus = false,
    actionTrigger = "smart-contract"
) {
    let banner = await alertBanner(alertString, buttonGroup, loginStatus, actionTrigger)
    return banner
}

let alertBanner = async function (
    alertString,
    buttonGroup = true,
    loginStatus = true,
    actionTrigger = "alert"
) {
    log('alertBanner triggered')

    // close banner if it already exists
    let existingBanner = document.getElementById('hedera-banner-wrapper')
    if (existingBanner !== null) {
        existingBanner.parentNode.removeChild(existingBanner)
    }

    // manipulate html object as needed
    let chromeExtensionBanner = chrome.extension.getURL('html/banner.html')
    let doc = await getHTMLAsync(chromeExtensionBanner)

    if (alertString !== undefined) {
        doc.getElementById('alert-string').innerHTML = alertString
    }

    doc.getElementById('login-status').setAttribute('data-status', loginStatus)

    if (buttonGroup === false) {
        doc.getElementById('button-group').style.display = 'none'
    }

    // applies our styles defined in banner.css
    let banner = doc.getElementById('hedera-banner-wrapper')
    banner.setAttribute('data-id', chrome.runtime.id)
    switch (actionTrigger) {
        case "smart-contract":
            banner.setAttribute('data-smart-contract-trigger', "true")
            break;
        case "crypto-transfer":
            banner.setAttribute('data-crypto-transfer-trigger', "true")
            break;
        default:
            break;
    }
    let fileref = document.createElement('link')
    fileref.setAttribute('rel', 'stylesheet')
    fileref.setAttribute('type', 'text/css')
    fileref.setAttribute('href', bannerCSS)

    // This is where banner is inserted into our body
    let body = document.getElementsByTagName('body')[0]
    body.insertBefore(banner, body.childNodes[0])
    body.style.marginTop = '0'
    body.style.marginLeft = '0'
    body.style.marginRight = '0'

    // return the banner so we can apply javascript logic to it
    return document
}

let ready = function (fn) {
    if (
        document.attachEvent ?
        document.readyState === 'complete' :
        document.readyState !== 'loading'
    ) {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}

let iconConfigured = function () {
    // dark grey
    chrome.browserAction.setIcon({
        path: {
            '16': '../icons/Ext-Icon-Configured.png'
        }
    })
    chrome.browserAction.setTitle({
        title: 'Hedera Browser Extension has access to this website'
    })
}

let iconInstalled = async function (cb) {
    // light grey
    chrome.browserAction.setIcon({
        path: {
            '16': '../icons/Ext-Icon-Installed.png'
        }
    }, () => {
        chrome.browserAction.setTitle({
            title: 'This website does not accept HBAR micropayments'
        }, () => {
            if (cb) {
                cb()
            }
        })
    })
}

let iconActive = function (cb) {
    // green
    chrome.browserAction.setIcon({
        path: {
            '16': '../icons/Ext-Icon-Active.png'
        }
    }, () => {
        chrome.browserAction.setTitle({
            title: 'This website is approved for HBAR micropayments'
        }, () => {
            if (cb) {
                cb()
            }
        })
    })
}

let iconBlocked = function (cb) {
    // red
    log('RED')
    chrome.browserAction.setIcon({
        path: {
            '16': '../icons/Ext-Icon-Blocked.png'
        }
    }, () => {
        chrome.browserAction.setTitle({
            title: 'This website is not approved for HBAR micropayments'
        }, () => {
            if (cb) {
                cb()
            }
        })
    })
}

// htmlFile is a string specifying the filename, e.g. 'account-overview.html'
// by default, we will also segue (transit) to the given htmlFile location
let popupSetAndSegue = function (htmlFile, segue = true) {
    let chromeExtensionID = chrome.runtime.id
    chrome.browserAction.setPopup({
        popup: `chrome-extension://${chromeExtensionID}/html/${htmlFile}`
    })
    if (segue) window.location.href = htmlFile
}

let openModal = function (htmlFile, segue = true) {
    let chromeExtensionID = chrome.runtime.id
    log("Chrome Extension ID:", chromeExtensionID, window);
    chrome.browserAction.setPopup({
        popup: `chrome-extension://${chromeExtensionID}/html/${htmlFile}`
    })
    log('current location:', window.location)
    window.location.href = htmlFile
    // TODO: Remove scrollbar for x-axis
    // window.open(`chrome-extension://${chromeExtensionID}/html/${htmlFile}`, "extension_popup", "width=350,height=520,status=no,scrollbars=yes,resizable=no");
}

let isElement = function (o) {
    return typeof HTMLElement === 'object' ?
        o instanceof HTMLElement //DOM2
        :
        o &&
        typeof o === 'object' &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string'
}

function setButtonGroupOptions(
    doc,
    port,
    micropaymentTag,
    msg,
    approveOnly = true
) {
    if (doc === undefined) return
    let banner = doc.getElementById('banner')
    let buttonAlways = doc.getElementById('always')
    let buttonOnce = doc.getElementById('once')
    let buttonNo = doc.getElementById('no')
    let buttonNever = doc.getElementById('never')
    if (approveOnly) {
        buttonAlways.innerHTML = 'Approve'
        buttonAlways.onclick = function () {
            banner.style.display = 'none'
            port.postMessage({
                text: 'yes-always',
                micropaymentTag: micropaymentTag,
                requestedPayment: msg.requestedPayment,
                currThr: msg.currThr
            })
        }
        buttonOnce.parentNode.style.display = 'none'
        buttonNo.parentNode.style.display = 'none'
        buttonNever.parentNode.style.display = 'none'
    } else {
        buttonOnce.onclick = function () {
            banner.style.display = 'none'
            port.postMessage({
                text: 'yes-once',
                micropaymentTag: micropaymentTag,
                requestedPayment: msg.requestedPayment, // already in tinyBars
                currThr: msg.currThr // already in tinyBars
            })
        }
        buttonAlways.onclick = function () {
            banner.style.display = 'none'
            port.postMessage({
                text: 'yes-always',
                micropaymentTag: micropaymentTag,
                requestedPayment: msg.requestedPayment,
                currThr: msg.currThr
            })
        }
        buttonNo.onclick = function () {
            banner.style.display = 'none'
            port.postMessage({
                text: 'no-once',
                micropaymentTag: micropaymentTag,
                requestedPayment: msg.requestedPayment,
                currThr: msg.currThr
            })
        }
        buttonNever.onclick = function () {
            banner.style.display = 'none'
            port.postMessage({
                text: 'no-always',
                micropaymentTag: micropaymentTag,
                requestedPayment: msg.requestedPayment,
                currThr: msg.currThr
            })
        }
    }
}

export {
    parseHTML,
    getHTML,
    getHTMLAsync,
    alertNotification,
    alertBanner,
    smartContractBanner,
    cryptoTransferBanner,
    ready,
    iconConfigured,
    iconInstalled,
    iconActive,
    iconBlocked,
    createImage,
    updateImage,
    popupSetAndSegue,
    openModal,
    setButtonGroupOptions
}