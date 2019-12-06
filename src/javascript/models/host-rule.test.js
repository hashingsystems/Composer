import HostRule from './host-rule'
import k from './constants'
import { hostname } from 'os'
import NetworkManager from './network-manager'

beforeEach(() => {
    localStorage.clear()
})

test('Incorrectly initialising HostRule', async () => {
    let hostRule = new HostRule()

    expect(hostRule.getRule()).rejects.toThrow()
    expect(hostRule.setRule()).rejects.toThrow()
    expect(hostRule.getOrSetStatusRule()).rejects.toThrow()
})

test('make sure our HostRule works', async () => {
    let hostRule = await new HostRule().init('https://thetimesta.mp')

    expect(hostRule.hostname).toBe('https://thetimesta.mp')

    await hostRule.setRule({
        limit: 1,
        preference: k.PREF.YES_ONCE.toString(),
        once: false
    })
    let rule = await hostRule.getRule()

    expect(typeof rule.limit).toBe('number')
    expect(rule.limit).toBe(1)

    expect(typeof rule.preference).toBe('string')
    expect(rule.preference).toBe(k.PREF.YES_ONCE.toString())

    expect(typeof rule.once).toBe('boolean')
    expect(rule.once).toBeFalsy()

    let hostRule2 = await new HostRule().init('https://whatever.com')
    let rule2 = await hostRule2.getOrSetStatusRule()
})

test('test Enum', () => {
    let key = HostRule.enumByValue('yes-once')
})

test('host rule getter and setter', async () => {
    let hostRule = await new HostRule().init('https://thetimesta.mp')
    await hostRule.setRule({
        limit: 1,
        preference: k.PREF.YES_ONCE.toString(),
        once: false
    })
    let rule = await hostRule.getRule()
})

test('Scenarios for getOrSetStatusRule', async () => {
    let hostname = 'https://www.google.com'
    let nm = await new NetworkManager().init()
    let currentNetwork = await nm.getCurrentNetwork()
    let name = currentNetwork + ',' + hostname
    let hostRule = await new HostRule().init(hostname)
    expect(hostRule.hostname).toBe(hostname)

    // first time we use getOrSetStatusRule, we should see new-host and the default rule
    let statusRule = await hostRule.getOrSetStatusRule()
    expect(statusRule.status).toBe('new-host')
    expect(statusRule[name]).toEqual(hostRule.defaultRule)

    // second time we use getOrSetStatusRule, we should see existing-rule and the default rule
    let statusRule2 = await hostRule.getOrSetStatusRule()
    expect(statusRule2.status).toBe('default-rule')
    expect(statusRule2[name]).toEqual(hostRule.defaultRule)

    // now we make the hostRule accept a rule we want
    let rule = {
        limit: 41666666,
        preference: k.PREF.YES_ONCE.toString(),
        once: true
    }
    let statusRule3 = await hostRule.getOrSetStatusRule(rule)
    expect(statusRule3.status).toBe('new-rule')
    expect(statusRule3[name]).toEqual(rule)

    let statusRule4 = await hostRule.getOrSetStatusRule()
    expect(statusRule4.status).toBe('existing-rule')
})
