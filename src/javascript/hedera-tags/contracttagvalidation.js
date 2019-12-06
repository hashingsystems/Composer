import validateUrl from '../validate'
import {
    isNullOrUndefined
} from 'util'
import i from '../hedera/internal'
import debug from 'debug'

const log = debug('all:hedera:contracttagvalidation')

const validateAbi = abi => {
    log('abi', abi, typeof abi)
    if (typeof abi === 'string') {
        abi = JSON.parse(abi)
        log('JSON abi ', abi)
    }
    // No abi is defined, return false
    if (isNullOrUndefined(abi)) {
        return false
    }
    try {
        return abi
    } catch (e) {
        return false
    }
}

const valididatePaymentServer = paymentserver => {
    // payment server is only nik's server TODO
    // return true;
    let checkPaymentServer = validateUrl.isValidUrl(paymentserver)
    try {
        if (checkPaymentServer) {
            return paymentserver
        }
        return false
    } catch (e) {
        log('error in contract call tag payment server')
    }
}

const validateParams = params => {
    if (typeof params === 'string') {
        params = JSON.parse(params)
    }
    // No params are defined, return false
    if (isNullOrUndefined(params)) {
        return false
    }
    try {
        return params
    } catch (e) {
        return false
    }
}

const validateContractId = contractid => {
    try {
        let checkContractIdIsValid = i.contractIDFromString(contractid)
        let contractString = i.contractStringFromContractID(
            checkContractIdIsValid
        )
        return contractString
    } catch (e) {
        return false
    }
}

const validateAmount = amount => {
    if (typeof amount === 'string') {
        //TODO: Implement proper implementation for Integer check
        try {
            amount = parseInt(amount)
        } catch (error) {
            amount = 0
        }
    }
    if (isNullOrUndefined(amount)) {
        return 0
    }

    if (isNaN(amount)) {
        return 0
    }
    return amount
}

const validate = (document, currentExtensionId) => {
    // Something is wrong with the document object, return false
    if (document === null || document === undefined) {
        return false
    }

    log("this will be sarvo validate   ", document)

    // No hedera-contracts are found, return null
    let tags = document.getElementsByTagName('hedera-contract')
    console.log("tags contractValidation        ", tags);
    if (tags.length === 0) {
        return null
    }
    // log('hedera-contract found')

    let paymentserver = valididatePaymentServer(tags[0].dataset.paymentserver)
    console.log("Sarpayment     ", paymentserver)
    if (paymentserver === false) {
        log('PAYMENT SERVER', paymentserver)
        return false
    }

    let abi = validateAbi(tags[0].dataset.abi)
    console.log("Sarabi    ", abi)
    if (abi === false) {
        log('ABI', abi)
        return false
    }
    let params = validateParams(tags[0].dataset.params)
    console.log("Sarparams    ", params)
    if (params === false) {
        log('PARAMS', params)
        return false
    }

    let contractid = validateContractId(tags[0].dataset.contractid)
    console.log("Sarcontractid    ", contractid)

    if (contractid === false) {
        log('CONTRACTID', contractid)
        return false
    }

    let memo = tags[0].dataset.memo

    let amount = validateAmount(tags[0].dataset.amount)
    //TODO: Fix this
    if (isNullOrUndefined(amount)) {
        amount = 0
    }

    return {
        contractid: contractid,
        memo: memo,
        paymentserver: paymentserver,
        abi: abi,
        params: params,
        amount: amount,
        extensionid: tags[0].dataset.extensionid
    }
}

export default {
    validateAbi,
    valididatePaymentServer,
    validateParams,
    validateContractId,
    validate
}