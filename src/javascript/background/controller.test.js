import * as controller from './controller'
import * as promises from '../chrome-promise/index'
import chrome from 'sinon-chrome'
import { StateManager, AccountManager } from '../models'
import { URL } from 'url'
import * as db from '../models/db'
import assert from 'assert'
import featureFlags from '../features'
import * as iconState from '../ui-utils'

let url
beforeAll(async () => {
    global.chrome = chrome
    localStorage.clear()
    url = 'https://dailytimestamp.com/article/hedera-rocks'
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

test('Background controller manager', () => {
    let micropaymentTag = {
        amount: 4666667, // amount requested by the website
        account: '0.0.1003', // account id of the "pay to" account
        recipientList: [
            {
                tinybars: 4666669,
                to: '0.0.1002'
            }
        ],
        time: undefined, // optional parameter
        paymentserver: 'http://localhost:8099', // ip address of the payment server
        contentID: '123', // id of the content
        memo: 'onactivated-test', // optional memo field
        type: 'article'
    }
    let msg = { micropaymentTag }
})

test('manageUser defined', async () => {
    const testAccount = {
        accountID: process.env.TEST_ACCOUNTID,
        publicKey: process.env.TEST_PUBLICKEY,
        privateKey: process.env.TEST_PRIVATEKEY,
        solidityAddress: process.env.TEST_SOLIDITYADDRESS
    }
    let am = await new AccountManager().init(testAccount)
    await am.setCurrentAccount(testAccount)
    let returnedUser = await controller.manageUser()
    expect(returnedUser.currentAccount.accountID).toBe(testAccount.accountID)
    let currName = 'testnet,' + testAccount.accountID
    expect(returnedUser.currentAccount.name).toBe(currName)
    expect(returnedUser.msg.type).toBe('login')
    expect(returnedUser.msg.accountID).toBe(testAccount.accountID)
})

test('manageUser undefined', async () => {
    let am = await new AccountManager().init(undefined)
    await am.setCurrentAccount(undefined)
    let undefinedUser = await controller.manageUser()
    expect(undefinedUser.currentAccount).toBeUndefined()
})

test('manageHostRule', async () => {
    const spy = jest.spyOn(controller, 'manageHostRule')
    let urlArticle = new URL(url)
    await controller.manageHostRule(urlArticle)
    expect(spy).toHaveBeenCalled()

    let urlArticle2 = new URL('htt://dailytimestamp.com/article/hedera-rocks')
    let notURL = await controller.manageHostRule(urlArticle2)
    expect(notURL).toBeUndefined()
})

test('manageState', async () => {
    let currTab = {}
    let response = {}
    let urlArticle = new URL(url)
    await controller.manageState(currTab, urlArticle, response)
})

test('manageStateMicropayment', async () => {
    let urlArticle = new URL(url)
    let currTab = 1111
    let contentID = 17
    let extensionid = 'qwe'
    let paymentServer = 'http://localhost:8099'
    let submissionNode = '0.0.4'
    let recipientList = { to: '0.0.1002', tinybars: 111 }
    let response = {
        contentID,
        extensionid,
        paymentServer,
        recipientList,
        submissionNode
    }

    db.setLocalStorage = jest.fn().mockImplementation(() => {
        console.log('blah1')
    })
    await controller.manageStateMicropayment(currTab, urlArticle, response)
})

test('manageStateMicropayment', async () => {
    //TODO
    let urlArticle = new URL(url)
    let currTab = { id: 1 }
    let contentID = 17
    let extensionid = 'qwe'
    let paymentServer = 'http://localhost:8099'
    let submissionNode = '0.0.4'
    let recipientList = { to: '0.0.1002', tinybars: 111 }
    let response = {
        contentID,
        extensionid,
        paymentServer,
        recipientList,
        submissionNode
    }
    let state = {
        banner: false,
        icon: 3,
        msg: { response: response, type: 'crypto-transfer' }
    }

    iconState.iconBlocked = jest.fn()
    iconState.iconConfigured = jest.fn()
    iconState.iconActive = jest.fn()
    iconState.iconInstalled = jest.fn()

    let spy = jest.spyOn(iconState, 'iconBlocked')
    let spy2 = jest.spyOn(iconState, 'iconConfigured')
    let spy3 = jest.spyOn(iconState, 'iconActive')
    let spy4 = jest.spyOn(iconState, 'iconInstalled')

    let sm = await new StateManager().init(urlArticle, response)
    sm.getState = jest.fn().mockImplementation(() => {
        console.log('HELLOw')
        return state
    })
    let spy5 = jest.spyOn(sm, 'getState')

    controller.manageStateMicropayment = jest.fn().mockImplementation(() => {
        if (state.icon === 3) {
            iconState.iconBlocked()
            if (state.msg !== null)
                chrome.tabs.sendMessage.withArgs(currTab.id, state.msg)
        }
    })
    await controller.manageStateMicropayment()
    expect(spy).toHaveBeenCalled()
    expect(spy5).not.toHaveBeenCalled()
    assert.ok(chrome.runtime.sendMessage.withArgs(currTab.id, state.msg))
})

test('manageStateSmartContract', async () => {
    let urlArticle = new URL(url)
    let response = { contractid: '0.0.1064' }

    global.ENV_NAME = 'test'
    db.setLocalStorage = jest.fn().mockImplementation(() => {
        console.log('blah1')
    })
    let stateTrue = await controller.manageStateSmartContract(
        urlArticle,
        response
    )
    expect(stateTrue).toBeTruthy()
    delete global.ENV_NAME
})

test('manageSmartContract', async () => {
    let urlArticle = new URL(url)
    let response = {}
    db.setLocalStorage = jest.fn().mockImplementation(() => {
        console.log('blah1')
    })
    await controller.manageSmartContract(urlArticle, response)
})

test('manageRuntimeError', async () => {
    chrome.runtime.lastError = 'something went wrong'
    let returnedSomeError = await controller.manageRuntimeError()
    expect(returnedSomeError).toBeTruthy()
})

test('manageRuntimeError2', async () => {
    let returnedNoError = await controller.manageRuntimeError()
    expect(returnedNoError).toBeFalsy()
})

test('manageUserCookies cookie error, return undefined', async () => {
    const spy = jest.spyOn(controller, 'manageUserCookies')
    expect(spy).not.toHaveBeenCalled()
    promises.cookiesGet = jest.fn().mockImplementation(() => {
        return
    })
    let urlArticle2 = new URL(url)
    let cookiesError = await controller.manageUserCookies(urlArticle2)
    expect(spy).toHaveBeenCalled()
    expect(cookiesError).toBeUndefined()
    jest.restoreAllMocks()
})

test('manageUserCookies cookie present, save to local storage', async () => {
    const spy3 = jest.spyOn(controller, 'manageUserCookies')
    // const spy4 = jest.spyOn(db, 'setLocalStorage')
    expect(spy3).not.toHaveBeenCalled()
    // expect(spy4).not.toHaveBeenCalled()
    promises.cookiesGet = jest.fn().mockImplementation(() => {
        let value = 1
        let cookie = { value }
        return cookie
    })
    db.setLocalStorage = jest.fn().mockImplementation(() => {
        console.log('blah2')
    })
    let urlArticle2 = new URL(url)
    await controller.manageUserCookies(urlArticle2)
    expect(spy3).toHaveBeenCalled()
    jest.restoreAllMocks()
})

test('manageTabError', async () => {
    promises.tabsQuery = jest.fn().mockImplementation(() => {
        return [{ active: true, id: 2444, url: 'http://localhost:9090' }]
    })
    let returnedTab = await controller.manageTabError()
    expect(returnedTab.id).toBe(2444)
    expect(returnedTab.url).toBe('http://localhost:9090')

    promises.tabsQuery = jest.fn().mockImplementation(() => {
        return new Error()
    })
    returnedTab = await controller.manageTabError()
    expect(returnedTab).toBeUndefined()
    jest.restoreAllMocks()
})
