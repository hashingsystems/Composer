import { isNullOrUndefined } from 'util'
import address from '../hedera/address'
import validateUrl from '../validate'
import debug from 'debug'
import i from '../hedera/internal'

const log = debug('all:hedera:tags:micropaymenttagvalidation')

const validateRecipientList = recipientList => {
    if (typeof recipientList === 'string') {
        recipientList = JSON.parse(recipientList)
    }
    // No recipients are defined, return false (how about no payment page?)
    if (isNullOrUndefined(recipientList)) {
        return false
    }
    let requestedPayment = 0
    for (var k in recipientList) {
        requestedPayment += parseInt(recipientList[k].tinybars)
        try {
            i.accountIDFromString(recipientList[k].to)
        } catch (e) {
            return false
        }
    }
    if (isNaN(requestedPayment)) {
        return false
    }
    return recipientList
}

const validateSubmissionNode = submissionNode => {
    log('submissionNode', submissionNode)

    if (submissionNode === undefined) {
        // if undefined, chrome extension will randomly choose a node for call
        return undefined
    }
    try {
        let checkNodeExist = address.getNodeAddr(submissionNode)
        try {
            if (checkNodeExist) {
                return submissionNode
            }
        } catch (e) {
            return false
        }
    } catch (e) {
        return false
    }
}

const validateExtensionId = (extensionId, currentExtensionId) => {
    log('extensionid', extensionId)
    try {
        if (extensionId.match(currentExtensionId)) {
            log('extensionId is', extensionId)
            return extensionId
        }
        return false
    } catch (e) {
        return false
    }
}

const validatePaymentServer = paymentServer => {
    log('paymentserver', paymentServer)
    let checkPaymentServer = validateUrl.isValidUrl(paymentServer)
    try {
        if (checkPaymentServer) {
            return paymentServer
        }
        return false
    } catch (e) {
        return false
    }
}

const validateContentType = contentType => {
    switch (contentType) {
        case 'article':
            return contentType
        case 'video':
            return contentType
        case '':
            // empty field
            return false
        default:
            // unknown case
            return false
    }
}

const validateRedirect = redirect => {
    log('validateRedirect')

    if (redirect === undefined) {
        return undefined
    }

    let currentUrl
    try {
        currentUrl = new URL(window.location.href)
    } catch (e) {
        return undefined
    }

    let redirectUrls
    try {
        redirectUrls = JSON.parse(redirect)
    } catch (e) {
        return undefined
    }

    let keysInRedirectUrls = Object.keys(redirectUrls)
    let acceptableKeys = ['nonPayingAccount', 'homePage', 'noAccount']
    if (keysInRedirectUrls.length > acceptableKeys.length) {
        return undefined
    }

    for (let i = 0; i < keysInRedirectUrls.length; i++) {
        let keyName = keysInRedirectUrls[i]
        if (!acceptableKeys.includes(keyName)) {
            return undefined
        }
        // construct new url to make sure the provided redirectUrl is valid
        try {
            new URL(currentUrl.origin + redirectUrls[keyName])
        } catch (e) {
            return undefined
        }
    }

    // validates completely, provide defaults
    if (
        redirectUrls.nonPayingAccount === undefined ||
        redirectUrls.nonPayingAccount === ''
    ) {
        redirectUrls.nonPayingAccount = '/non-paying-account'
    }

    if (redirectUrls.noAccount === undefined || redirectUrls.noAccount === '') {
        redirectUrls.noAccount = '/no-account'
    }

    if (redirectUrls.homePage === undefined || redirectUrls.homePage === '') {
        redirectUrls.homePage = '/'
    }

    log('validates completely', redirectUrls)
    return redirectUrls
}

const validate = (document, currentExtensionId) => {
    // Something is wrong with the document object, return false
    if (document === null || document === undefined) {
        return false
    }

    // No hedera-micropayment tags are found, return null
    let tags = document.getElementsByTagName('hedera-micropayment')
    if (tags.length === 0) {
        return null
    }
    log('hedera-micropayment found')

    let recipientList = validateRecipientList(tags[0].dataset.recipientlist)
    if (recipientList === false) {
        log('RECIPIENT LIST', recipientList)
        return false
    }

    let submissionNode = validateSubmissionNode(tags[0].dataset.submissionnode)
    if (submissionNode === false) {
        log('SUBMISSION NODE', submissionNode)
        return false
    }

    let paymentServer = validatePaymentServer(tags[0].dataset.paymentserver)
    if (paymentServer === false) {
        log('PAYMENT SERVER', paymentServer)
        return false
    }

    let extensionId = validateExtensionId(
        tags[0].dataset.extensionid,
        currentExtensionId
    )
    if (extensionId === false) {
        log('EXTENSION ID', extensionId)
        return false
    }

    // redirect is { "nonPayingAccount": "/somecustomurlpath", "home": "/somecustomurlpath2", "noAccount": "/somecustomurlpath3"}
    let redirect = validateRedirect(tags[0].dataset.redirect)

    // All good, return our parsed hedera-micropayment tag as a json object
    log('hedera-micropayment validated')
    return {
        recipientList, // list of recipients for crypto transfer in object type
        submissionNode, // Node that will be used for the transaction (Optional: If not present it will be replaced with random node)
        paymentServer, // ip address of the payment server
        extensionId,
        time: tags[0].dataset.time, // optional parameter
        contentID: tags[0].dataset.contentid, // id of the content
        memo: tags[0].dataset.memo, // optional memo field
        type: tags[0].dataset.type, // Type of content. Can be article, video or download
        redirect // optional custom redirect urls
    }
}

export default { validate }
