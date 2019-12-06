import {
    AccountID,
    Signature,
    SignatureList,
    SignaturePair,
    FileID,
    ContractID
} from '../../pbweb/BasicTypes_pb'
import { Timestamp } from '../../pbweb/Timestamp_pb'
import { Duration } from '../../pbweb/Duration_pb'
import forge from 'node-forge'
import nano from 'nano-seconds'
import { isNullOrUndefined } from 'util'
import debug from 'debug'

const log = debug('test:internal')

/**
 * @module internal
 */

/**
 * @const ed25519 is a forge key @see https://github.com/digitalbazaar/forge
 */
const ed25519 = forge.pki.ed25519

/**
 * accountIDFromString converts a string type AccountID into a Hedera AccountID object.
 * @param {string} account is a string delimited by dot, of the format 'shardNum.realmNum.accountNum'.
 * @returns {Object} returns a Hedera AccountID.
 */
function accountIDFromString(account) {
    let accountSplit = account.split('.')
    let accountID = new AccountID()
    if (
        isNaN(parseInt(accountSplit[0])) ||
        isNaN(parseInt(accountSplit[1])) ||
        isNaN(parseInt(accountSplit[2]))
    ) {
        throw new Error('AccountID contains invalid character(s)')
    }

    if (accountSplit.length !== 3) {
        throw new Error('AccountID is invalid')
    }
    accountID.setShardnum(parseInt(accountSplit[0]))
    accountID.setRealmnum(parseInt(accountSplit[1]))
    accountID.setAccountnum(parseInt(accountSplit[2]))
    return accountID
}

/**
 * accountStringFromAccountID converts a Hedera AccountID object to a string type AccountID.
 * @param {Object} accountID is a Hedera AccountID.
 * @returns {string} returns a string delimited by dot, of the format 'shardNum.realmNum.accountNum'.
 */
function accountStringFromAccountID(accountID) {
    return (
        accountID.getShardnum().toString() +
        '.' +
        accountID.getRealmnum().toString() +
        '.' +
        accountID.getAccountnum().toString()
    )
}

/**
 * fileIDFromString converts a string type FileID into a Hedera FileID object.
 * @param {string} file is a string delimited by dot, of the format 'shardNum.realmNum.fileNum'.
 * @returns {Object} returns a Hedera FileID.
 */
function fileIDFromString(file) {
    let fileSplit = file.split('.')
    let fileID = new FileID()

    if (
        isNaN(parseInt(fileSplit[0])) ||
        isNaN(parseInt(fileSplit[1])) ||
        isNaN(parseInt(fileSplit[2]))
    ) {
        throw new Error('AccountID contains invalid character(s)')
    }

    if (fileSplit.length !== 3) {
        throw new Error('AccountID is invalid')
    }
    fileID.setShardnum(parseInt(fileSplit[0]))
    fileID.setRealmnum(parseInt(fileSplit[1]))
    fileID.setFilenum(parseInt(fileSplit[2]))
    return fileID
}

/**
 * contractIDFromString converts a string type ContractID into a Hedera ContractID object.
 * @param {string} contract is a string delimited by dot, of the format 'shardNum.realmNum.contractNum'.
 * @returns {Object} returns a Hedera ContractID.
 */
function contractIDFromString(contract) {
    let contractSplit = contract.split('.')
    let contractID = new ContractID()

    if (
        isNaN(parseInt(contractSplit[0])) ||
        isNaN(parseInt(contractSplit[1])) ||
        isNaN(parseInt(contractSplit[2]))
    ) {
        throw new Error('ContractID contains invalid character(s)')
    }

    if (contractSplit.length !== 3) {
        throw new Error('ContractID is invalid')
    }
    contractID.setShardnum(parseInt(contractSplit[0]))
    contractID.setRealmnum(parseInt(contractSplit[1]))
    contractID.setContractnum(parseInt(contractSplit[2]))
    return contractID
}

function contractIdExistsAndIsValid(contract) {
    let contractSplit
    try {
        contractSplit = contract.split('.')
    } catch (e) {
        return false
    }
    if (contractSplit.length !== 3) {
        return false
    }
    return true
}

/**
 * contractStringFromContractID converts a Hedera ContractID object to a string type ContractID.
 * @param {Object} contractID is a Hedera ContractID.
 * @returns {string} returns a string delimited by dot, of the format 'shardNum.realmNum.contractNum'.
 */
function contractStringFromContractID(contractID) {
    return (
        contractID.getShardnum().toString() +
        '.' +
        contractID.getRealmnum().toString() +
        '.' +
        contractID.getContractnum().toString()
    )
}

function getSumOfTransfer(recipientList) {
    // recipientList must always exist
    if (recipientList === undefined || recipientList.length === 0) {
        // undefined is only returned when there recipientList is invalid
        return undefined
    }

    let requestedPayment = 0

    // recipientList is an object
    for (var k in recipientList) {
        requestedPayment += parseInt(recipientList[k].tinybars)
    }

    if (isNaN(requestedPayment)) {
        requestedPayment = undefined
        // undefined returned when recipientList amount is empty
        // because returning int 0 implies cryptotransfer and transaction costs will incur
        return requestedPayment
    }
    return requestedPayment
}

/**
 * getTimestamp sets the timestamp with a 5 secs delay before the transaction is sent to Hedera node.
 */
function getTimestamp() {
    let ts = new Timestamp()
    const ns = nano.now()

    let secondsInDeci = parseInt(nano.toString(ns)) / 1000000000
    let splitSeconds = secondsInDeci.toString().split('.')
    let seconds = parseInt(splitSeconds[0])
    let nanosecond = parseInt(splitSeconds[1])

    ts.setSeconds(seconds - 10)
    ts.setNanos(nanosecond)
    return ts
}
/**
 * getDuration sets the length of duration the transaction stays in Hedera network
 */
function getDuration() {
    let d = new Duration()
    d.setSeconds(60)
    return d
}

/**
 * sign with a private key (hex-encoded) and return a signature
 * @param {Object} txBodyBytes is a
 * @param {string} privateKeyHex is a hex-encoded private key.
 * @param {string} publicKeyHex is a hex-encoded public key.
 * @returns {Object} returns a Hedera Signature
 */
function signWithKeyAndVerify(txBodyBytes, privateKeyHex, publicKeyHex) {
    let message = txBodyBytes
    let encoding = 'binary'
    let privateKey = forge.util.hexToBytes(privateKeyHex)
    let publicKey = forge.util.hexToBytes(publicKeyHex)
    let signature = ed25519.sign({
        message,
        encoding,
        privateKey
    })
    let verified = ed25519.verify({
        message,
        encoding,
        signature,
        publicKey
    })
    if (verified === false) {
        return undefined
    }
    let sig = new Signature()
    sig.setEd25519(signature)
    return sig

    // let sigPair = new SignaturePair()
    // sigPair.setEd25519(signature)
    // return sigPair
}

/**
 * This function //functionTODO
 * @param {*} txBodyBytes
 * @param  {...any} keypairsInHex
 */
function signWithKeysAndVerify(txBodyBytes, ...keypairsInHex) {
    let keypairs = []
    keypairsInHex.forEach(function(keypair) {
        let keypairInBytes = {
            privateKey: forge.util.hexToBytes(keypair.privateKey),
            publicKey: forge.util.hexToBytes(keypair.publicKey)
        }
        keypairs.push(keypairInBytes)
    })

    let ed25519Signatures = []
    keypairs.forEach(function(keypair) {
        let sig = new Signature()
        let signature = ed25519.sign({
            message: txBodyBytes,
            privateKey: keypair.privateKey
        })
        sig.setEd25519(signature)
        let verified = ed25519.verify({
            message: txBodyBytes,
            signature: signature,
            publicKey: keypair.publicKey
        })
        if (verified === false) {
            return undefined
        }
        ed25519Signatures.push(sig)
    })

    let sigList = new SignatureList()
    sigList.setSigsList(ed25519Signatures)
    return sigList
}

/**
 * This function //functionTODO
 * @param {*} txBodyBytes
 * @param  {...any} privateKeysInHex
 */
function signWithKeys(txBodyBytes, ...privateKeysInHex) {
    let privateKeys = []
    privateKeysInHex.forEach(function(pkInHex) {
        let privateKeyInBytes = forge.util.hexToBytes(pkInHex)
        privateKeys.push(privateKeyInBytes)
    })

    let ed25519Signatures = []
    privateKeys.forEach(function(pk) {
        let sig = new Signature()
        let signature = ed25519.sign({
            message: txBodyBytes,
            privateKey: pk
        })
        sig.setEd25519(signature)
        ed25519Signatures.push(sig)
    })
    // prepare sigList container
    let sigList = new SignatureList()
    sigList.setSigsList(ed25519Signatures)
    return sigList
}

/**
 *
 * randNodeAddr provides a random node for grpc calls
 * @param {object} nodeAddresses
 * @returns object that contains the node ip and node accountID
 */
function randNodeAddr(nodeAddresses) {
    let randNodeGen =
        nodeAddresses[Math.floor(Math.random() * nodeAddresses.length)]
    let randNodeSplit = JSON.stringify(randNodeGen).split(/"/)
    let address = randNodeSplit[3]
    let account = randNodeSplit[1]
    return {
        address,
        account
    }
}

/**
 *
 * nodeAddr provides the chosen node that exist in the list of node addresses (file 0.0.101) for grpc calls.
 * @param {object} account
 * @param {Array} nodeAddresses
 * @returns object that contains the node ip and node accountID
 */
function nodeAddr(account, nodeAddresses) {
    let address
    let retrieveNodeFromList = nodeAddresses.find(obj =>
        obj.hasOwnProperty(account)
    )
    if (isNullOrUndefined(retrieveNodeFromList)) {
        throw new Error('node does not exist, please choose other nodes')
    }
    address = retrieveNodeFromList[account]
    return {
        address,
        account
    }
}

/**
 *
 * @param {string} acccount
 */
function solidityAddressFromAccountIDString(account) {
    const accountID = accountIDFromString(account)
    const shardNum = accountID.getShardnum()
    const realmNum = accountID.getRealmnum()
    const accountNum = accountID.getAccountnum()
    const solidityByteArray = new ArrayBuffer(20)

    let bytes = longToByteArray(shardNum)
    // byte 0 to byte 3 are shardNum
    for (let i = 0; i < 4; i++) {
        solidityByteArray[i] = bytes[i]
    }

    bytes = longToByteArray(realmNum)
    // byte 4 to byte 11 are realmNum
    for (let i = 0; i < 8; i++) {
        solidityByteArray[i + 4] = bytes[i]
    }

    bytes = longToByteArray(accountNum)
    // byte 12 to 19 are accountNum
    for (let i = 0; i < 8; i++) {
        solidityByteArray[i + 12] = bytes[i]
    }

    return buf2hex(solidityByteArray)
}

function buf2hex(buffer) {
    let res = ''
    for (let i = 0; i < buffer.byteLength; i++) {
        let hex = buffer[i].toString(16)
        if (hex.length === 1) {
            hex = '0' + hex
        }
        res += hex
    }
    return res
}

function longToByteArray(long) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0]
    for (var index = 0; index < byteArray.length; index++) {
        var byte = long & 0xff
        byteArray[index] = byte
        long = (long - byte) / 256
    }
    return byteArray.reverse()
}

function validMemoBytes(memo) {
    // validate 100 bytes and below only
    let memoInChar = memo.length
    log('memoInChar', memoInChar)
    let memoInBytes = Buffer.byteLength(memo, 'utf8')
    log('memoInBytes', memoInBytes)
    if (memoInBytes < 100) {
        return memo
    }
    // memo is too long, throw error or false
    throw new Error('Memo must be less than 100 bytes')
}

export default {
    accountIDFromString,
    accountStringFromAccountID,
    fileIDFromString,
    contractIDFromString,
    contractStringFromContractID,
    solidityAddressFromAccountIDString,
    getSumOfTransfer,
    getTimestamp,
    getDuration,
    signWithKeyAndVerify,
    signWithKeysAndVerify,
    signWithKeys,
    randNodeAddr,
    nodeAddr,
    longToByteArray,
    contractIdExistsAndIsValid,
    validMemoBytes
}
