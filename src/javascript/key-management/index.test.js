import { toByteArray, dataViewsAreEqual } from '.'

import forge from 'node-forge'
import debug from 'debug'

const log = debug('test:key-management')

test('toByteArray', () => {
    const byteArray = toByteArray('ffab')
    expect(byteArray).toEqual([255, 171])
})
test('sha384 in JavaScript', () => {
    // given the exact same message, our sha384 output will always be the same
    let message = 'abc'
    let md = forge.md.sha384.create()
    md.update(message)
    let mdHex = md.digest().toHex()
    let md2 = forge.md.sha384.create()
    md2.update(message)
    let md2Hex = md.digest().toHex()
    expect(mdHex).toBe(md2Hex)

    // if the ordering is wrong, the message digest will of course not be equal
    let message2 = 'acb'
    let md3 = forge.md.sha384.create()
    md3.update(message2)
    let md3Hex = md3.digest().toHex()
    expect(md3Hex).not.toBe(mdHex)
})
test('data views are equal', () => {
    let a = [22, 33, 44, 55, 66]
    let b = [22, 33, 44, 55, 66]
    let c = [33, 44, 55, 66]
    let equal = dataViewsAreEqual(a, b)
    expect(equal).toBeTruthy()

    let notequal = dataViewsAreEqual(b, c)
    expect(notequal).toBeFalsy()
})

// test('deciphering', () => {
//     if (CRYPTO_TEST === false) {
//         log('skip crypto test')
//         return
//     }
//     let encrypted = pairing.jsonData.data
//     let key = pairing.key
//     let encryptedString = forge.util.decode64(encrypted)

//     let bbytes = new Uint8Array(encryptedString.length)
//     for (let i = 0; i < encryptedString.length; i++) {
//         bbytes[i] = encryptedString.charCodeAt(i)
//     }

//     let byteBufferStringRequiredByForge = forge.util.createBuffer(bbytes.buffer)
//     // decipher decrypt
//     let decipher = forge.cipher.createDecipher('AES-CTR', key)
//     let iv = forge.util.createBuffer()
//     decipher.start({
//         iv: iv
//     })
//     decipher.update(byteBufferStringRequiredByForge)
//     // let result = decipher.finish()

//     let combine = decipher.output.getBytes()
//     let comp1 = combine.slice(0, length - 48)
//     let comp2 = combine.slice(length - 48)

//     // use comp1 to recreate SHA384 message digest
//     let decipheredAccountDetails = comp1
//     let b = JSON.stringify(decipheredAccountDetails)
//     let c = JSON.parse(b)

//     let md = forge.md.sha384.create()
//     md.update(c)
//     let accountDetailsBytes = md.digest().getBytes()
//     let comp1HexString = forge.util.bytesToHex(accountDetailsBytes)
//     let comp1ByteArray = toByteArray(comp1HexString)
//     let shaComp1MsgDigest = comp1ByteArray

//     // use comp2 from bytes to readable byte array
//     let comp2HexString = forge.util.bytesToHex(comp2)
//     let comp2ByteArray = toByteArray(comp2HexString)
//     let comp2MsgDigest = comp2ByteArray

//     let msgDigestEquals = dataViewsAreEqual(shaComp1MsgDigest, comp2MsgDigest)
//     log(msgDigestEquals)
//     expect(shaComp1MsgDigest).toEqual(comp2MsgDigest)
// })

test('slicing', () => {
    //     let encrypted = pairing.jsonData.data
    //     let key = pairing.key
    //     let encryptedString = forge.util.decode64(encrypted)
    //     let bbytes = new Uint8Array(encryptedString.length)
    //     for (let i = 0; i < encryptedString.length; i++) {
    //         bbytes[i] = encryptedString.charCodeAt(i)
    //     }
    //     let byteBufferStringRequiredByForge = forge.util.createBuffer(bbytes.buffer)
    //     // decipher decrypt
    //     let decipher = forge.cipher.createDecipher('AES-CTR', key)
    //     let iv = forge.util.createBuffer()
    //     decipher.start({
    //         iv: iv
    //     })
    //     decipher.update(byteBufferStringRequiredByForge)
    //     let combine = decipher.output.getBytes()
    //     let slice1 = combine.slice(0, length - 47)
    //     let slice2 = combine.slice(0, length - 48)
    //     let slice3 = combine.slice(0, length - 49)
    //     let slice4 = combine.slice(1, length - 47)
    //     let slice5 = combine.slice(1, length - 48)
    //     let slice6 = combine.slice(1, length - 49)
    //     let slice7 = combine.slice(length - 48)
    //     let slice8 = combine.slice(length - 49, length - 1)
    //     let slice10 = combine.slice(length - 48, length - 1)
    //     let slice12 = combine.slice(length - 47, length - 1)
})
