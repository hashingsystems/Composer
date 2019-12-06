import validate from '../validate'
import testips from './testdata/testips.json'
import { mobileNetwork } from '../network'

let ips

beforeEach(() => {
    ips = testips['ips']
})

test('list of ips', async () => {
    let list = validate.listOfIPs(ips)
    expect(list).toBeTruthy()

    let iplistnone = []
    let noiplist = await validate.listOfIPs(iplistnone)
    expect(noiplist).toBeFalsy()
})

test('Basic IPv4 versus IPv6 tests', () => {
    expect(validate.IPv4(ips[0])).toBeFalsy()
    expect(validate.IPv6(ips[0])).toBeTruthy()

    expect(validate.IPv4(ips[1])).toBeFalsy()
    expect(validate.IPv6(ips[1])).toBeTruthy()

    expect(validate.IPv4(ips[2])).toBeTruthy()
    expect(validate.IPv6(ips[2])).toBeFalsy()

    expect(validate.IPv4(ips[3])).toBeTruthy()
    expect(validate.IPv6(ips[3])).toBeFalsy()

    expect(validate.IPv6(ips[4])).toBeTruthy()
    expect(validate.IPv6(ips[5])).toBeTruthy()
    expect(validate.IPv6(ips[6])).toBeTruthy()
    expect(validate.IPv6(ips[7])).toBeTruthy()
    // expect(validate.IPv6(ips[8])).toBeFalsy()
    expect(validate.IPv6(ips[9])).toBeFalsy()
})

test('IPv4 Pin validation', () => {
    expect(() => {
        validate.checkPin('192.0.2.1')
    }).toThrowError(validate.PIN_ERRORS.INVALID_CHAR)

    expect(() => {
        validate.checkPin('   ')
    }).toThrowError(validate.PIN_ERRORS.NONE)

    expect(() => {
        validate.checkPin('192A0A2A1234')
    }).toThrowError(validate.PIN_ERRORS.INVALID_IPV4_ADDR)

    expect(() => {
        validate.checkPin('192a0a2a1')
    }).toThrowError(validate.PIN_ERRORS.INVALID_CHAR)

    let a = validate.checkPin('192')
    expect(a).toBe('192')
    let b = validate.checkPin('192A0A2A1')
    expect(b).toBe('192.0.2.1')
    let c = validate.checkPin('192A0A2A12')
    expect(c).toBe('192.0.2.12')
    let d = validate.checkPin('192A0A2A123')
    expect(d).toBe('192.0.2.123')

    let e = validate.checkPin('A192A0A2A123')
    expect(e).toBe('192.0.2.123')
    let f = validate.checkPin('A0A2A123')
    expect(f).toBe('0.2.123')
    let g = validate.checkPin('A2A123')
    expect(g).toBe('2.123')
    let h = validate.checkPin('A192A0A2A123')
    expect(h).toBe('192.0.2.123')

    let i = validate.checkPin('0A2A123')
    expect(i).toBe('0.2.123')
    let j = validate.checkPin('2A123')
    expect(j).toBe('2.123')
    let k = validate.checkPin('A123')
    expect(k).toBe('123')
})

test('IPv6 Pin validation', () => {
    let a = validate.checkPin('2001:cdba:0000:0000:0000:0000:3257:9652')
    expect(a).toBe('2001:cdba:0000:0000:0000:0000:3257:9652')
    let b = validate.checkPin('2001:cdba::3257:9652')
    expect(b).toBe('2001:cdba::3257:9652')
    let c = validate.checkPin('::0:2F3B:2AA:FF:FE28:9C5A')
    expect(c).toBe('::0:2F3B:2AA:FF:FE28:9C5A')
    let d = validate.checkPin('2001:cdba::257:9652')
    expect(d).toBe('2001:cdba::257:9652')

    expect(() => {
        validate.checkPin('   ')
    }).toThrowError(validate.PIN_ERRORS.NONE)

    expect(() => {
        validate.checkPin('02001:0000:1234:0000:0000:C1C0:ABCD:0876')
    }).toThrowError(validate.PIN_ERRORS.INVALID_IPV6_ADDR)
})
