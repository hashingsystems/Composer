import { updateImage } from '../ui-utils'
import forge from 'node-forge'
import { Address4, Address6 } from 'ip-address'
import KeyPairing from '../models/key-pairing'
import debug from 'debug'

const log = debug('all:validate')

/**
 * @module Validate
 */
/**
 * @const {string} PIN_ERRORS
 * @throws Will throw Pin Errors if activation codes are invalid.
 */
const PIN_ERRORS = {
    NONE: 'Please input an activation code',
    INVALID:
        'Invalid code, ensure your devices are on the same wifi. If your port is blocked, you may need a mobile network connection instead',
    INVALID_CHAR: 'Activation code contains invalid characters.',
    INVALID_IPV6_ADDR: 'Please check that you have entered an IPV6 address.',
    INVALID_IPV4_ADDR: 'Please check that you have entered an IPV4 address.'
}

/**
 *
 * Validates it is regex type IPv4
 * @param {string} address
 */
function IPv4(address) {
    return new Address4(address).isValid()
}

/**
 *
 * Validates it is regex type IPv6
 * @param {string} address
 */
function IPv6(address) {
    return new Address6(address).isValid()
}

/**
 * // Loops through list of IPs in user's network, returns false if IPv6, returns true if IPv4 and updates QRCode
 * @param {string[]} ips
 */
async function listOfIPs(ips) {
    let ipv4results = []
    let ipv6results = []

    let ipv4 = 0
    let ipv6 = 0

    let temporaryKey = forge.random.getBytesSync(32)
    let encodedKey = forge.util.bytesToHex(temporaryKey)
    log('IPs', ips)
    for (const ipaddress of ips) {
        if (IPv4(ipaddress)) {
            ipv4 = ipv4 + 1
            ipv4results.push({
                ipaddress: ipaddress,
                count: ipv4
            })
        } else {
            IPv6(ipaddress)
            ipv6 = ipv6 + 1
            ipv6results.push({
                ipaddress: ipaddress,
                count: ipv6
            })
        }
    }
    log(ipv4results[0])
    log(ipv6results.length)

    if (
        (ipv4results.length === 0 && ipv6results.length > 0) ||
        ipv4results.length === 0 ||
        ipv4results[0] === undefined
    ) {
        log('We currently only support IPv4')
        return false
    }
    log(typeof ipv4results[0].ipaddress)
    if (ipv4results[0].ipaddress !== '') {
        let localIPAddr = ipv4results[0].ipaddress
        log('Setting here localIP is ', localIPAddr)
        await new KeyPairing().setTemporaryKeyAndLocalIP(
            temporaryKey,
            localIPAddr
        )
        updateImage(encodedKey, localIPAddr, document)
        return true
    }
}

/**
 *
 * checkPin verifies that the activation code that was entered is valid
 * @param {string} pin is the activation code shown on the mobile wallet when keypairs are exported.
 * @throws Will throw Pin Errors if activation codes are invalid.
 */
function checkPin(pin) {
    // check if pin contains only digits
    if (pin.match(/^\d+$/)) {
        log('222', pin)
        return pin
    }

    // check if pin contains characters that are not alphanumeric
    if (pin.match(/[^0-9A-Za-z]/)) {
        log('000', pin)
        // check if pin contains empty spaces
        if (pin.trim() === '' || pin === '') {
            log('002', pin)
            // return false
            throw new Error(PIN_ERRORS.NONE)
        }

        if (pin.match(/[:]/)) {
            if (IPv6(pin)) {
                log('003', pin)
                return pin
            }
            // return false
            throw new Error(PIN_ERRORS.INVALID_IPV6_ADDR)
        }
        // return false
        throw new Error(PIN_ERRORS.INVALID_CHAR)
    }

    // check if pin contains "alphanumeric"
    if (pin.match(/[0-9A-Z]/)) {
        log('111', pin)
        let replacePin = pin.replace(/A/g, '.') // `/A/gi` case insensitive
        log(replacePin)
        let replacePinArray = replacePin.split('.')
        switch (replacePinArray.length) {
            case 0:
                log('0', replacePinArray.length)
                break
            case 1:
                log('1', replacePinArray.length)
                if (replacePin.match(/[0-9A-Z]/)) {
                    // pin contains small letter 'a' instead
                    throw new Error(PIN_ERRORS.INVALID_CHAR)
                }
                return replacePin
            case 2:
                log('2', replacePinArray.length)
                if (replacePinArray[0] === '') {
                    let removeExtraCharPin = replacePin.slice(1)
                    log('2', removeExtraCharPin)
                    return removeExtraCharPin
                }
                return replacePin
            case 3:
                log('3', replacePinArray.length)
                if (replacePinArray[0] === '') {
                    let removeExtraCharPin = replacePin.slice(1)
                    log('3', removeExtraCharPin)
                    return removeExtraCharPin
                }
                return replacePin
            case 4:
                log('4', replacePinArray.length)
                if (IPv4(replacePin)) {
                    return replacePin
                } else if (replacePinArray[0] === '') {
                    let removeExtraCharPin = replacePin.slice(1)
                    log('4', removeExtraCharPin)
                    return removeExtraCharPin
                }
                // return false
                else {
                    throw new Error(PIN_ERRORS.INVALID_IPV4_ADDR)
                }
            case 5:
                log('5', replacePinArray.length)
                if (replacePinArray[0] === '') {
                    let removeExtraCharPin = replacePin.slice(1)
                    log('5', removeExtraCharPin)
                    return removeExtraCharPin
                }
                break
        }
    }
}

function isValidUrl(string) {
    try {
        new URL(string)
        return true
    } catch (_) {
        return false
    }
}

export default {
    PIN_ERRORS,
    IPv4,
    IPv6,
    listOfIPs,
    checkPin,
    isValidUrl
}
