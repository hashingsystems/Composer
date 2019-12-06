import NetworkManager from './network-manager'

beforeEach(() => {
    localStorage.clear()
})

test('Initialise NetworkManager wrongly but can recover by setting the right network', async () => {
    let nm = new NetworkManager()
    let currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBeNull()

    await nm.setCurrentNetwork('testnet')
    currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBe('testnet')

    await nm.setCurrentNetwork('mainnet')
    currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBe('mainnet')
})

test('Initialise NetworkManager correctly and set the network anyway', async () => {
    let nm = await new NetworkManager().init()
    await nm.setCurrentNetwork('testnet')
    let nm2 = await nm.init()
    expect(nm2.currentNetwork).toBe('testnet')
})

test('Network Manager getOrSetCurrentNetwork when no process', async () => {
    // simulate no process

    // deliberately set process.env to be undefined to test edge case
    let temp = Object.assign({}, process.env)
    process.env = undefined

    let nm = await new NetworkManager().init()
    let currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBe('testnet')

    // reset process.env
    process.env = temp
})

test('Network Manager getOrSetCurrentNetwork in mock', async () => {
    // simulate mock env
    process.env.NODE_ENV = 'mock'
    let nm = await new NetworkManager().init()
    let currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBe('devnet')
})

test('NetworkManager getOrSetCurrentNetwork in production', async () => {
    // simulate production env
    process.env.NODE_ENV = 'production'
    let nm = await new NetworkManager().init()
    let currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBe('mainnet')
})

test('Network Manager getOrSetCurrentNetwork in staging', async () => {
    // simulate staging env
    process.env.NODE_ENV = 'staging'
    let nm = await new NetworkManager().init()
    let currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBe('testnet')
})

test('NetworkManager getOrSetCurrentNetwork in development', async () => {
    // simulate development env
    process.env.NODE_ENV = 'development'
    let nm = await new NetworkManager().init()
    let currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBe('devnet')
})

test('Network Manager getOrSetCurrentNetwork in test', async () => {
    // simulate test env
    process.env.NODE_ENV = 'test'
    let nm = await new NetworkManager().init()
    let currentNetwork = await nm.getCurrentNetwork()
    expect(currentNetwork).toBe('testnet')
})

test('Correctly using NetworkManager to getCurrentSettings and setCurrentSettings', async () => {
    let nm = await new NetworkManager().init()
    let settings = await nm.getCurrentSettings()
    expect(settings).toEqual({ limit: 0 })

    let testValue = 4166667 // tinyBars
    settings.limit = testValue
    await nm.setCurrentSettings(settings)
    settings = await nm.getCurrentSettings()
    expect(settings.limit).toEqual(testValue)
})

test('Correctly using NetworkManager to getCurrentLimit and setCurrentLimit', async () => {
    let nm = await new NetworkManager().init()
    let limit = await nm.getCurrentLimit()
    expect(limit).toEqual(0)

    let testValue = 4166667 // tinyBars
    await nm.setCurrentLimit(testValue)
    limit = await nm.getCurrentLimit()
    expect(limit).toEqual(testValue)

    let limitMultiCurr = await nm.getCurrentLimitInMultiCurrency()
    expect(limitMultiCurr.tinyBars).toEqual(testValue)
    // need to double check that we have to string rendering precision implemented correctly
})

test('Incorrectly using NetworkManager for various methods', () => {
    let testSettingsValue = { limit: 4166667 }

    let nm = new NetworkManager()
    expect(nm.getCurrentSettings()).rejects.toThrow()
    expect(nm.setCurrentSettings(testSettingsValue)).rejects.toThrow()
    expect(nm.getCurrentLimit()).rejects.toThrow()
    expect(nm.setCurrentLimit(testSettingsValue.limit)).rejects.toThrow()
    expect(nm.getCurrentLimitInMultiCurrency()).rejects.toThrow()
})
