import KeyPairing from './key-pairing'
import { mobileNetwork } from '../network'
import debug from 'debug'

const log = debug('test:models:key-pairing')

let ips

beforeAll(() => {
    ips = ['192.0.2.1', '255.255.255.0']
})
test('Should be able to save temporary key and local ip address', async () => {
    // test data
    let temporaryKey = 'whatever'
    let localIPAddr = ips[0]

    // exercise our KeyPairing storage capability
    let keyPairing = new KeyPairing()
    await keyPairing.setTemporaryKeyAndLocalIP(temporaryKey, localIPAddr)

    let storedLocalIPAddr = await keyPairing.getLocalIPAddr()
    expect(storedLocalIPAddr).toEqual(localIPAddr)

    let storedTemporaryKey = await keyPairing.getTemporaryKey()
    expect(storedTemporaryKey).toEqual(temporaryKey)
})

test('address to be called to wallet', async () => {
    let a = await mobileNetwork('1')
    log(a, typeof a)
    expect(a).toBe(`http://${ips[0]}:8080`)

    // let b = await mobileNetwork('0')
    // expect(b).toBe(`http://${ips[1]}:8080`)
})
