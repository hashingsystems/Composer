import onPortListener from './port'
import chrome from 'sinon-chrome'

beforeAll(async () => {
    global.chrome = chrome
})

beforeEach(async () => {
    chrome.flush()
    chrome.runtime.sendMessage.flush()
})

afterAll(async function() {
    chrome.flush()
    delete global.chrome
})

test('onConnect Listener', async () => {
    chrome.runtime.onConnect.addListener(port => onPortListener(port))
})
