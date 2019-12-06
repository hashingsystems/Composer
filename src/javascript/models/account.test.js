import testAccount1 from './testdata/account'
import Account from './account'
import debug from 'debug'

const log = debug('app:test:models:account')

test('Instantiate account, getDetails, setDetails', async () => {
    let a = await new Account().init('')
    expect(a).toBeUndefined()

    a = await new Account().init('1')
    expect(a).toBeUndefined()

    a = await new Account().init('0.1')
    expect(a).toBeUndefined()

    a = await new Account().init('0.0.1')
    expect(a).toBeInstanceOf(Account)
    let details = await a.getDetails()
    expect(details).toEqual({ accountID: '0.0.1' })

    // This time, it will work because 0.0.1000 matches
    // testAccount1.accountID's value (0.0.1000)
    a = await new Account().init('0.0.1000')
    const spy = jest.spyOn(a, 'setDetails')
    await a.setDetails(testAccount1)
    expect(spy).toHaveBeenCalled()

    // and the details are properly set, since we can retrieve them
    expect(a.getDetails()).resolves.toEqual(testAccount1)
})

test('Using init() to initialise our account object in ONE step with local storage', async () => {
    // we should be able to write
    // let a = await new Account(testAccount1).initAsync()
    let a = await new Account().init(testAccount1)
    let details = await a.getDetails()
    expect(details.accountID).toBe('0.0.1000')
})

test('getBalance 1', async () => {
    let a = await new Account().init(testAccount1)
    await a.setBalance(415000)
    expect(a.details.balance).toBe(415000)

    let all = await a.getBalance()
    expect(all.tinyBars).toBe(415000)
    expect(all.hBars).toBe('0.00415000 ℏ')
    expect(all.USD).toBe('$0.00049800')
})

test('getBalance less than 0.000000999 USD', async () => {
    let a = await new Account().init(testAccount1)
    await a.setBalance(1)
    expect(a.details.balance).toBe(1)

    let all = await a.getBalance()
    expect(all.tinyBars).toBe(1)
    expect(all.hBars).toBe('0.00000001 ℏ')
    expect(all.USD).toBe('$0.0000000012')
})

test('getBalance equals to 120 USD', async () => {
    let a = await new Account().init(testAccount1)
    await a.setBalance(99999999999)
    expect(a.details.balance).toBe(99999999999)

    let all = await a.getBalance()
    expect(all.tinyBars).toBe(99999999999)
    expect(all.hBars).toBe('999.99999999 ℏ')
    expect(all.USD).toBe('$120')
})

test('getBalance less than 999.9999 USD', async () => {
    let a = await new Account().init(testAccount1)
    await a.setBalance(94329999999)
    expect(a.details.balance).toBe(94329999999)

    let all = await a.getBalance()
    expect(all.tinyBars).toBe(94329999999)
    expect(all.hBars).toBe('943.29999999 ℏ')
    expect(all.USD).toBe('$113.196')
})

test('getBalance less than 999.9999 USD', async () => {
    let a = await new Account().init(testAccount1)
    await a.setBalance(83566329273)
    expect(a.details.balance).toBe(83566329273)

    let all = await a.getBalance()
    expect(all.tinyBars).toBe(83566329273)
    expect(all.hBars).toBe('835.66329273 ℏ')
    expect(all.USD).toBe('$100.280')
})

test('getBalance less than 99,999.9999 USD', async () => {
    let a = await new Account().init(testAccount1)
    await a.setBalance(8993568329273)
    expect(a.details.balance).toBe(8993568329273)
    let all = await a.getBalance()
    expect(all.tinyBars).toBe(8993568329273)
    expect(all.hBars).toBe('89935.68329273 ℏ')
    expect(all.USD).toBe('$10,792.282')
})

test('getBalance more than 99,999.9999 USD', async () => {
    let a = await new Account().init(testAccount1)
    await a.setBalance(103333333333325)
    expect(a.details.balance).toBe(103333333333325)
    let all = await a.getBalance()
    expect(all.tinyBars).toBe(103333333333325)
    expect(all.hBars).toBe('1033333.33333325 ℏ')
    expect(all.USD).toBe('$124,000')
})

test('getBalance more than 99 999.9999 USD', async () => {
    let a = await new Account().init(testAccount1)
    await a.setBalance(100000194568179)
    expect(a.details.balance).toBe(100000194568179)
    let all = await a.getBalance()
    expect(all.tinyBars).toBe(100000194568179)
    expect(all.hBars).toBe('1000001.94568179 ℏ')
    expect(all.USD).toBe('$120,000.23')
})

test('getBalance if details are undefined', async () => {
    let a = await new Account().init('0.0.0')
    let all = await a.getBalance()
    expect(all.tinyBars).toBe(0)
    expect(all.hBars).toBe(0)
    expect(all.USD).toBe('$0')
})
