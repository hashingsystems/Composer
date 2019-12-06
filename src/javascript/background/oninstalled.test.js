import * as onInstalledListener from './oninstalled'
import chrome from 'sinon-chrome'
import * as iconState from '../ui-utils'

beforeAll(async () => {
    global.chrome = chrome
    localStorage.clear()
})

beforeEach(async () => {
    chrome.flush()
    chrome.runtime.sendMessage.flush()
    localStorage.clear()
})

afterEach(async () => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
})

afterAll(async function() {
    chrome.flush()
    delete global.chrome
})

test('onInstalled listener', async () => {
    iconState.iconInstalled = jest.fn()
    let spy = jest.spyOn(iconState, 'iconInstalled')
    let details = { reason: 'install' }
    onInstalledListener.default(details)
    expect(spy).toHaveBeenCalled()
})
