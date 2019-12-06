import * as network from './index'
import KeyPairing from '../models/key-pairing'
import debug from 'debug'

const log = debug('test:network')

test('ips', async () => {
    let pin = '1'
    await expect(network.mobileNetwork(pin)).rejects.toThrow()

    let pin1 = '2A1'
    await expect(network.mobileNetwork(pin)).rejects.toThrow()

    let pin2 = '0A2A1'
    await expect(network.mobileNetwork(pin2)).rejects.toThrow()

    let pin3 = '192A0A2A1'
    await expect(network.mobileNetwork(pin3)).rejects.toThrow()
})

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
    // let a = await mobileNetwork('1')
    // log(a, typeof (a))
    // expect(a).toBe(`http://${ips[0]}:8080`)

    let b = await network.mobileNetwork('0.2.1')
    log(b, typeof b, ips[0])
    expect(b).toBe(`http://${ips[0]}:8080`)
})

test('get account details from mobile', async () => {
    const spy = jest.spyOn(network, 'mobileNetwork')
    const spy2 = jest.spyOn(network, 'httpRequest')
    expect(spy).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    network.httpRequest = jest.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => {}
        })
    )
    network.mobileNetwork = jest.fn().mockImplementation(function() {
        return 'http://192.0.2.1:8080'
    })
    let pin = '1'
    // let jsonData = await network.getAccountDetailsFromMobile(pin)
    // expect(spy).toHaveBeenCalled()
    jest.restoreAllMocks()
}, 10000)
