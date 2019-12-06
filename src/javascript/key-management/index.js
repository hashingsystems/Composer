import forge from 'node-forge'
import { alertNotification } from '../ui-utils'
import { buttonState } from '../ui-utils/buttons'
import debug from 'debug'

const log = debug('all:key-management')

/**
 * @module KeyManagement
 */

/**
 * decryptAccountDetails decrypts the data that was received from mobile pairing.
 * @param {*} encrypted is a base64 encoded JSON data
 * @param {*} key is a hex-encoded temporary private key
 */
async function decryptAccountDetails(encrypted, key) {
    // change our encrypted data from base64 back into bytes
    let encryptedString = forge.util.decode64(encrypted)
    let bytes = new Uint8Array(encryptedString.length)
    for (let i = 0; i < encryptedString.length; i++) {
        bytes[i] = encryptedString.charCodeAt(i)
    }
    log('ENCRYPTED BYTES', bytes.buffer)

    let byteBufferStringRequiredByForge = forge.util.createBuffer(bytes.buffer)
    // decipher decrypt
    let decipher = forge.cipher.createDecipher('AES-CTR', key)
    let iv = forge.util.createBuffer()
    decipher.start({
        iv: iv
    })
    decipher.update(byteBufferStringRequiredByForge)
    // let result = decipher.finish()

    let combine = decipher.output.getBytes()
    let comp1 = combine.slice(0, length - 48)
    let comp2 = combine.slice(length - 48)

    // use comp1 to recreate SHA384 message digest
    let decipheredAccountDetails = comp1
    let accountDetails = JSON.parse(decipheredAccountDetails)
    log('THE DECIPHER output account is :', accountDetails)
    log('THE DECIPHER output accountID is :', accountDetails.accountID)

    let b = JSON.stringify(decipheredAccountDetails)
    let c = JSON.parse(b)
    let md = forge.md.sha384.create()
    md.update(c)
    let accountDetailsBytes = md.digest().getBytes()
    let comp1HexString = forge.util.bytesToHex(accountDetailsBytes)
    let comp1ByteArray = toByteArray(comp1HexString)
    let shaComp1MsgDigest = comp1ByteArray

    // use comp2 from bytes to readable byte array
    let comp2HexString = forge.util.bytesToHex(comp2)
    let comp2ByteArray = toByteArray(comp2HexString)
    let comp2MsgDigest = comp2ByteArray

    let button = document.getElementById('getAccountBalanceButton')

    buttonState(button)

    if (
        accountDetails.accountID === undefined ||
        accountDetails.accountID === '0.0.1' ||
        accountDetails.accountID === '0.0.0'
    ) {
        let alertObj = {
            alertString: 'Please add an accountID in pairing Device for export',
            elem: button,
            cb: buttonState
        }
        await alertNotification(alertObj)
    }

    let msgDigestEquals = dataViewsAreEqual(shaComp1MsgDigest, comp2MsgDigest)
    if (msgDigestEquals) {
        log(accountDetails.accountID)
        return accountDetails
    }
    let alertObj = {
        alertString: 'Unauthorized access',
        elem: button,
        cb: buttonState
    }
    await alertNotification(alertObj)
}

// compare DataViews
function dataViewsAreEqual(a, b) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false
    }
    return true
}

function toByteArray(hexString) {
    var result = []
    while (hexString.length >= 2) {
        result.push(parseInt(hexString.substring(0, 2), 16))
        hexString = hexString.substring(2, hexString.length)
    }
    return result
}

export { decryptAccountDetails, toByteArray, dataViewsAreEqual }
