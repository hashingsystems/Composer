// import account from './testdata/account.json'
// import account2 from './testdata/account2.json'
// import account3 from './testdata/account3.json'
// import accountnew from './testdata/accountnew.json'
// import accountcorrect from './testdata/accountcorrect.json'

// in our tests, we want to compare the differences between node-forge, tweetnacl and supercop
import forge from 'node-forge'
import nacl from 'tweetnacl'
import supercop from 'supercop.js'
import i from './internal'
import nano from 'nano-seconds'
import { AccountID } from '../../pbweb/BasicTypes_pb'
import debug from 'debug'

const log = debug('test:internal')

// const ed25519 = forge.pki.ed25519

test('timestamp nanos', () => {
    let secondsT = Math.round((new Date().getTime() - 10000) / 1000)

    const ns = nano.now()

    let secondsInDeci = parseInt(nano.toString(ns)) / 1000000000
    let splitSeconds = secondsInDeci.toString().split('.')
    let seconds = parseInt(splitSeconds[0])
    let nanosecond = parseInt(splitSeconds[1])
})

test('accountID from String', () => {
    expect(() => {
        i.accountIDFromString('test anything')
    }).toThrowError('AccountID contains invalid character(s)')
    expect(() => {
        i.accountIDFromString('0..4')
    }).toThrowError('AccountID contains invalid character(s)')
    expect(() => {
        i.accountIDFromString('04.blah')
    }).toThrowError('AccountID contains invalid character(s)')
    expect(() => {
        i.accountIDFromString('.')
    }).toThrowError('AccountID contains invalid character(s)')
    expect(() => {
        i.accountIDFromString('0.3')
    }).toThrowError('AccountID contains invalid character(s)')
    expect(() => {
        i.accountIDFromString('')
    }).toThrowError('AccountID contains invalid character(s)')
    expect(() => {
        i.accountIDFromString('0.0.4.4')
    }).toThrowError('AccountID is invalid')

    let accountID = new AccountID()
    let accStringConversion = i.accountIDFromString('0.0.6')
    accountID.setShardnum(0)
    accountID.setRealmnum(0)
    accountID.setAccountnum(6)
    expect(accountID).toEqual(accStringConversion)
})

test('sum of transfer in object', () => {
    let recipientList = [
        {
            tinybars: 25,
            to: '0.0.111'
        },
        {
            tinybars: 3400,
            to: '0.0.777'
        },
        {
            tinybars: 342,
            to: '0.0.1111'
        }
    ]
    let requestedPayment = i.getSumOfTransfer(recipientList)
    expect(requestedPayment).toEqual(3767)
})

test('sum of transfer in string', () => {
    let recipientList = `[{"tinybars":"4666669","to":"0.0.1003"}]`
    let requestedPayment = i.getSumOfTransfer(JSON.parse(recipientList))
    expect(requestedPayment).toEqual(4666669)

    let recipientList1 = `[{"tinybars":"4666669","to":"0.0.1003"}, {"tinybars":"5000","to":"0.0.1004"}]`
    let requestedPayment1 = i.getSumOfTransfer(JSON.parse(recipientList1))
    expect(requestedPayment1).toEqual(4671669)

    let recipientListErr = `[{"tinybars":"","to":"0.0.1003"}, {"tinybars":"","to":"0.0.1004"}]`
    let requestedPaymentErr = i.getSumOfTransfer(JSON.parse(recipientListErr))
    expect(requestedPaymentErr).toEqual(undefined)
})

// test('ed25519', () => {
//     let keypair = ed25519.generateKeyPair()
// })

// test('forge: Sign string and Verify with ed25519 generated keys', () => {
//     let keypair = ed25519.generateKeyPair()
//     let privateKey = keypair.privateKey
//     let publicKey = keypair.publicKey
//     expect(privateKey).toBeInstanceOf(Uint8Array)
//     expect(publicKey).toBeInstanceOf(Uint8Array)
//     expect(privateKey.length).toBe(64)
//     expect(publicKey.length).toBe(32)
//     let message = 'whatever'
//     let encoding = 'utf8'
//     let signature = ed25519.sign({ message, encoding, privateKey })
//     let verified = ed25519.verify({ message, encoding, signature, publicKey })
//     expect(verified).toBeTruthy()
// })

// test('forge: Sign bytes and Verify with ed25519 generated keys', () => {
//     let keypair = ed25519.generateKeyPair()
//     let privateKey = keypair.privateKey
//     let publicKey = keypair.publicKey
//     expect(privateKey).toBeInstanceOf(Uint8Array)
//     expect(publicKey).toBeInstanceOf(Uint8Array)
//     expect(privateKey.length).toBe(64)
//     expect(publicKey.length).toBe(32)
//     let message = Buffer.from('whatever')
//     let encoding = 'binary'
//     let signature = ed25519.sign({ message, encoding, privateKey })
//     let verified = ed25519.verify({ message, encoding, signature, publicKey })
//     expect(verified).toBeTruthy()
// })

// test('forge: Sign and Verify with account set 1 (account set 1 is the 0.0.1024 account for Staging testnet)', () => {
//     let privateKey = Buffer.from(account.privateKey, 'hex')
//     let publicKey = Buffer.from(account.publicKey, 'hex')
//     expect(privateKey).toBeInstanceOf(Uint8Array)
//     expect(publicKey).toBeInstanceOf(Uint8Array)
//     let privateKeyBase64 = privateKey.toString('base64')
//     let publicKeyBase64 = publicKey.toString('base64')
//     expect(privateKey.length).toBe(64)
//     expect(publicKey.length).toBe(32)
//     let message = Buffer.from('helloworld')
//     let encoding = 'binary'
//     let signature = ed25519.sign({ message, encoding, privateKey })
//     let verified = ed25519.verify({ message, encoding, signature, publicKey })
//     expect(verified).toBeFalsy()
// })

// test('forge: Sign and Verify with account set 2 (account set 2 is the 0.0.1017 account for Development testnet', () => {
//     let privateKey = Buffer.from(account2.privateKey, 'hex')
//     let publicKey = Buffer.from(account2.publicKey, 'hex')
//     expect(privateKey).toBeInstanceOf(Uint8Array)
//     expect(publicKey).toBeInstanceOf(Uint8Array)
//     expect(privateKey.length).toBe(64)
//     expect(publicKey.length).toBe(32)
//     let message = 'whatever'
//     let encoding = 'utf8'
//     let signature = ed25519.sign({ message, encoding, privateKey })
//     let verified = ed25519.verify({ message, encoding, signature, publicKey })
//     expect(verified).toBeFalsy()
// })

// test('forge: Sign and Verify with account set 3 (account set 3 is the 0.0.1022 account for Staging testnet', () => {
//     let privateKey = Buffer.from(account3.privateKey, 'hex')
//     let publicKey = Buffer.from(account3.publicKey, 'hex')
//     expect(privateKey).toBeInstanceOf(Uint8Array)
//     expect(publicKey).toBeInstanceOf(Uint8Array)
//     expect(privateKey.length).toBe(64)
//     expect(publicKey.length).toBe(32)
//     let message = 'whatever'
//     let encoding = 'utf8'
//     let signature = ed25519.sign({ message, encoding, privateKey })
//     let verified = ed25519.verify({ message, encoding, signature, publicKey })
//     expect(verified).toBeFalsy()
// })

// test('tweetnacl: Sign and verify', () => {
//     let privateKey = Buffer.from(account.privateKey, 'hex')
//     let publicKey = Buffer.from(account.publicKey, 'hex')
//     expect(privateKey).toBeInstanceOf(Uint8Array)
//     expect(publicKey).toBeInstanceOf(Uint8Array)
//     expect(privateKey.length).toBe(64)
//     expect(publicKey.length).toBe(32)
//     let message = 'whatever'
//     let msg = Buffer.from(message)
//     let signature = nacl.sign.detached(msg, privateKey)
//     expect(signature.length).toBe(64)
//     let verified = nacl.sign.detached.verify(msg, signature, publicKey)
//     expect(verified).toBeFalsy()
//     log('tweetnacl', verified)
// })

// test('supercop: Sign and verify', () => {
//     let privateKey = Buffer.from(accountcorrect.privateKey, 'hex')
//     let publicKey = Buffer.from(accountcorrect.publicKey, 'hex')
//     let message = Buffer.from('whatever', 'utf8')
//     let signature = supercop.sign(message, publicKey, privateKey)
//     let verified = supercop.verify(signature, message, publicKey)
// })

// test('supercop: Sign and verify', () => {
//     // log('supercop', supercop)
//     // log('what is this?', supercop.sign)
//     let privateKey = Buffer.from(account.privateKey, 'hex')
//     let publicKey = Buffer.from(account.publicKey, 'hex')
//     let message = Buffer.from('whatever', 'utf8')
//     let signature = supercop.sign(message, publicKey, privateKey)
//     let verified = supercop.verify(signature, message, publicKey)
//     // log('supercop', verified)
//     // log(verified)
//     // log(2222222)
// })

// test('compare privateKey generated publicKey with the json publicKey', () => {
//     let privateKey = Buffer.from(account.privateKey, 'hex')
//     let kp = nacl.sign.keyPair.fromSecretKey(privateKey)
//     let publicKeyBytes = Buffer(kp.publicKey)
// })

// test('forge: Sign and Verify with account set 1 (account set 1 is the 0.0.1024 account for Staging testnet)', () => {
//     let privateKey = Buffer.from(accountnew.privateKey, 'hex')
//     let publicKey = Buffer.from(accountnew.publicKey, 'hex')
//     expect(privateKey).toBeInstanceOf(Uint8Array)
//     expect(publicKey).toBeInstanceOf(Uint8Array)
//     let privateKeyBase64 = privateKey.toString('base64')
//     let publicKeyBase64 = publicKey.toString('base64')
//     expect(privateKey.length).toBe(64)
//     expect(publicKey.length).toBe(32)
//     let message = Buffer.from('helloworld')
//     let encoding = 'binary'
//     let signature = ed25519.sign({ message, encoding, privateKey })
//     let verified = ed25519.verify({ message, encoding, signature, publicKey })
// })

// This function exists here for sanity checks because privateKey by supercop is of a different structure
// compared to publicKey by nacl
// we are using node-forge's nacl, not supercop
// function signWithKeySupercop(txBodyBytes, privateKeyHex, publicKeyHex) {
//     log('SIGN WITH SUPERCOP FOR JAVA')
//     let message = Buffer.from(txBodyBytes)
//     log(forge.util.bytesToHex(txBodyBytes))
//     let privateKey = Buffer.from(privateKeyHex, 'hex')
//     let publicKey = Buffer.from(publicKeyHex, 'hex')

//     log(message instanceof Buffer)
//     log(privateKey instanceof Buffer)
//     log(publicKey instanceof Buffer)

//     let signature = supercop.sign(message, publicKey, privateKey)
//     log('signatureHex', signature.toString('hex'))
//     let verified = supercop.verify(signature, message, publicKey)
//     log('VERIFIED', verified)
//     log(signature.length)
//     log(message.length)

//     let sig = new Signature()
//     sig.setEd25519(signature)
//     return sig
// }

// // sign with private key (hex-encoded) using tweetnacl library and return a signature
// function signWithKeyNacl(txBodyBytes, privateKeyHex, publicKeyHex) {
//     log('SIGN WITH NACL FOR JAVA')

//     let message = txBodyBytes
//     log(forge.util.bytesToHex(txBodyBytes))
//     let privateKey = Buffer.from(privateKeyHex, 'hex')
//     let publicKey = Buffer.from(publicKeyHex, 'hex')

//     let signature = nacl.sign.detached(message, privateKey)
//     log('signatureHex', signature.toString('hex'))
//     let verified = nacl.sign.detached.verify(message, signature, publicKey)
//     log('VERIFIED', verified)
//     log(signature.length)
//     log(message.length)

//     let sig = new Signature()
//     sig.setEd25519(signature)
//     return sig
// }

test('solidityAddressFromAccountIDString', () => {
    const solidityAddress = i.solidityAddressFromAccountIDString('0.0.1023')
    expect(solidityAddress.length).toBe(40)
    expect(solidityAddress).toEqual('00000000000000000000000000000000000003ff')
})

test('longToByteArray', () => {
    const result = i.longToByteArray(1023)
    expect(result).toEqual([0, 0, 0, 0, 0, 0, 3, 255])
})

test('Check if attribute is present and valid', () => {
    let result = i.contractIdExistsAndIsValid(undefined)
    expect(result).toBeFalsy()

    result = i.contractIdExistsAndIsValid('')
    expect(result).toBeFalsy()

    result = i.contractIdExistsAndIsValid('0.1')
    expect(result).toBeFalsy()

    result = i.contractIdExistsAndIsValid(1)
    expect(result).toBeFalsy()

    result = i.contractIdExistsAndIsValid('0..1.0.0')
    expect(result).toBeFalsy()

    result = i.contractIdExistsAndIsValid('0.0.1')
    expect(result).toBeTruthy()
})

test('validMemoBytes', () => {
    const validatedMemo = i.validMemoBytes('this is a message')
    expect(validatedMemo).toEqual('this is a message')

    const validatedMemo1 = i.validMemoBytes('123456789')
    expect(validatedMemo1).toEqual('123456789')

    expect(() => {
        i.validMemoBytes(
            '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40'
        )
    }).toThrowError('Memo must be less than 100 bytes')
})
