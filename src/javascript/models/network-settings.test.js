import NetworkSettings from './network-settings'

beforeEach(() => {
    localStorage.clear()
})

test('Networking settings', async () => {
    expect(() => {
        let ns = new NetworkSettings()
    }).toThrow()

    let ns = new NetworkSettings('testnet')

    let settings = await ns.getSettings()
    expect(settings).toEqual({})

    await ns.setSettings({ limit: 0 })

    settings = await ns.getSettings()
    expect(settings).toEqual({ limit: 0 })

    await ns.setLimit(1000)
    let limit = await ns.getLimit()
    expect(limit).toBe(1000)

    settings = await ns.getSettings()
    expect(settings).toEqual({ limit: 1000 })
})

test('Limit should be 0 if it has not yet been set', async () => {
    let ns = new NetworkSettings('testnet')

    let limit = await ns.getLimit()
    expect(limit).toBe(0)
    expect(ns.setLimit('hello')).rejects.toThrow()
    expect(ns.setSettings()).rejects.toThrow()
})

test('Limit should be 0 if it has not yet been set, and settings.limit is null', async () => {
    let ns = new NetworkSettings('testnet')

    // limit is set to null somehow, which is incorrect
    await ns.setSettings({ limit: null })

    // internal logic will insist that limit is the default limit 0, and not null
    let settings = await ns.getOrSetSettings()
    expect(settings.limit).toBe(0)
})
