import chrome from 'sinon-chrome'
import assert from 'assert'
import * as iconState from '../ui-utils'
import portListener from './port'
import onUpdatedListener from './onupdated'
import onActivatedListener from './onactivated'
import * as onInstalledListener from './oninstalled'

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
})

afterAll(async function() {
    chrome.flush()
    delete global.chrome
})
test('onInstalled listener', async () => {
    var chrome = {
        runtime: {
            onInstalled: {
                addListener: function() {}
            }
        }
    }

    // onInstalledListener.default = jest.fn()

    // chrome.runtime.onInstalled.addListener(onInstalledListener.default())

    // spyOn(chrome.runtime.onInstalled, 'addListener').and.callThrough()

    // expect(chrome.runtime.onInstalled).toHaveBeenCalledWith(
    //     onInstalledListener.default()
    // )
})
