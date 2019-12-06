import chrome from 'sinon-chrome'
import assert from 'assert'
import * as iconState from '../ui-utils'
import onActivatedListener from './onactivated'
import * as controller from './controller'
import AccountManager from '../models'

let micropaymentTag
beforeAll(async () => {
    global.chrome = chrome
    localStorage.clear()
})

beforeEach(async () => {
    chrome.flush()
    chrome.runtime.sendMessage.flush()
    localStorage.clear()

    micropaymentTag = {
        amount: 777, // amount requested by the website
        recipientList: [
            {
                tinybars: 777,
                to: '0.0.1002'
            }
        ],
        time: undefined, // optional parameter
        paymentserver: 'http://localhost:8099', // ip address of the payment server
        contentID: '123', // id of the content
        memo: 'onactivated-test', // optional memo field
        type: 'article'
    }
})

afterEach(async () => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
})

afterAll(async function() {
    chrome.flush()
    delete global.chrome
})
test('onActivated tab error path', async () => {
    controller.manageTabError = jest.fn().mockImplementation(async () => {
        return undefined
    })
    let spy = jest.spyOn(controller, 'manageTabError')
    let undefinedTab = await onActivatedListener()
    expect(spy).toHaveBeenCalled()
    expect(undefinedTab).toBeUndefined()
})

test('onActivate manage user path undefined', async () => {
    controller.manageTabError = jest.fn().mockImplementation(() => {
        return { id: 1 }
    })
    controller.manageUser = jest.fn().mockImplementation(() => {
        let msg = { micropaymentTag }
        const testAccount = undefined
        return { testAccount, msg }
    })

    let spy = jest.spyOn(controller, 'manageTabError')
    let spy2 = jest.spyOn(controller, 'manageUser')
    let undefinedAccount = await onActivatedListener()
    expect(spy).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(undefinedAccount).toBeUndefined()
})

test('onActivate manage user path', async () => {
    controller.manageTabError = jest.fn().mockImplementation(async () => {
        return { id: 1, url: 'https://hello.com' }
    })
    controller.manageUser = jest.fn().mockImplementation(async () => {
        let msg = { micropaymentTag }
        let accountID = process.env.TEST_ACCOUNTID
        let details = { accountID, balance: 167154327 }
        let name = 'devnet,0.0.1001'
        let currentAccount = { Account: { accountID, details, name } }
        return { currentAccount, msg }
    })
    controller.manageHostRule = jest.fn()
    let spy = jest.spyOn(controller, 'manageTabError')
    let spy2 = jest.spyOn(controller, 'manageUser')
    let spy3 = jest.spyOn(controller, 'manageHostRule')
    await onActivatedListener()
    expect(spy).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy3).toHaveBeenCalled()
})

test('onActivate last send', async () => {
    let currTab = { id: 1, url: 'https://hello.com' }
    controller.manageTabError = jest.fn().mockImplementation(async () => {
        return currTab
    })
    controller.manageUser = jest.fn().mockImplementation(async () => {
        let msg = { micropaymentTag }
        let accountID = process.env.TEST_ACCOUNTID
        let details = { accountID, balance: 167154327 }
        let name = 'devnet,0.0.1001'
        let currentAccount = { Account: { accountID, details, name } }
        return { currentAccount, msg }
    })
    controller.manageHostRule = jest.fn()
    controller.manageUserCookies = jest.fn()
    controller.manageState = jest.fn()

    let type = 'hedera-tag'
    let msg = { type }
    let response = {}
    let callbackFn = jest.fn().mockImplementation(async () => {
        let url = new URL('https://example.com/article')
        controller.manageUserCookies(url)
        controller.manageHostRule(url)
        controller.manageState(currTab, url, response)
    })
    chrome.tabs.sendMessage.withArgs(1, msg, callbackFn())
    let spy = jest.spyOn(controller, 'manageTabError')
    let spy2 = jest.spyOn(controller, 'manageUser')
    let spy3 = jest.spyOn(controller, 'manageHostRule')
    // let spy4 = jest.spyOn(controller, 'manageRuntimeError')
    let spy5 = jest.spyOn(controller, 'manageUserCookies')
    let spy6 = jest.spyOn(controller, 'manageState')
    await onActivatedListener()
    expect(spy).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy3).toHaveBeenCalledTimes(2)
    // expect(spy4).toHaveBeenCalled()
    expect(spy5).toHaveBeenCalled()
    expect(spy6).toHaveBeenCalled()
})
