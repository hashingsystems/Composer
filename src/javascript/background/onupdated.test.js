// import onUpdatedListener from './onupdated'
import chrome from 'sinon-chrome'
import assert from 'assert'
import debug from 'debug'
import { Account } from '../models'
import * as controller from './controller'

const log = debug('all:background:onupdated')

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

test('test if this works', async () => {
    let testaccount = {
        accountID: process.env.TEST_ACCOUNTID,
        publicKey: process.env.TEST_PUBLICKEY,
        privateKey: process.env.TEST_PRIVATEKEY
    }

    //setup the mock functions
    controller.manageUser = jest.fn().mockImplementation(async () => {
        let Account = {
            accountID: testaccount.accountID,
            details: {
                accountID: testaccount.accountID,
                balance: 100000172977549,
                privateKey: testaccount.privateKey,
                publicKey: testaccount.publicKey
            },
            keypair: {
                privateKey: testaccount.privateKey,
                publicKey: testaccount.publicKey
            },
            name: 'devnet, 0.0.1001'
        }
        return {
            currentAccount: Account,
            msg: { type: 'logins', accountID: testaccount.accountID }
        }
    })

    controller.manageHostRule = jest.fn().mockImplementation(() => {
        let limit = 111
        let preference = 'Symbol(yes-always)'
        let status = 'existing-rule'
        return { 'devnet,http://localhost:9090': { limit, preference, status } }
    })

    controller.manageTabError = jest.fn().mockImplementation(() => {
        let id = 2444
        let url = 'http://localhost:9090'
        let currTab = { id, url }
        return currTab
    })

    controller.manageRuntimeError = jest.fn().mockImplementation(() => {})

    controller.manageState = jest.fn().mockImplementation(() => {})

    controller.manageStateMicropayment = jest.fn().mockImplementation(() => {})

    controller.manageStateSmartContract = jest.fn().mockImplementation(() => {})

    controller.manageUserCookies = jest.fn().mockImplementation(() => {})

    const spy = jest.spyOn(controller, 'manageUser')
    expect(spy).not.toHaveBeenCalled()
    const spy1 = jest.spyOn(controller, 'manageHostRule')
    expect(spy1).not.toHaveBeenCalled()
    const spy2 = jest.spyOn(controller, 'manageTabError')
    expect(spy2).not.toHaveBeenCalled()
    const spy3 = jest.spyOn(controller, 'manageState')
    expect(spy3).not.toHaveBeenCalled()

    const spy4 = jest.spyOn(controller, 'manageUserCookies')
    expect(spy4).not.toHaveBeenCalled()
    const spy5 = jest.spyOn(controller, 'manageRuntimeError')
    expect(spy5).not.toHaveBeenCalled()

    let currTab, info, status, url, type, currentAccount, msg, here
    let onUpdatedListener = jest.fn().mockImplementation(async () => {
        status = 'complete'
        info = { status }
        if (info.status === 'complete') {
            currTab = await controller.manageTabError()
            if (currTab === undefined) return

            here = { currentAccount, msg }
            here = await controller.manageUser()

            if (here.currentAccount === undefined) {
                chrome.tabs.sendMessage.withArgs(currTab.id, here.msg)
                return
            }
            chrome.tabs.sendMessage.withArgs(currTab.id, here.msg)

            url = new URL(currTab.url)
            type = 'hedera-tag'
            msg = { type }

            await controller.manageHostRule(url)

            chrome.tabs.sendMessage.withArgs(
                currTab.id,
                here.msg,
                async function(response) {
                    console.log('receive response', response)
                    // catch chrome runtime error
                    if (controller.manageRuntimeError(response)) return

                    log('manage user cookies')
                    await controller.manageUserCookies(url)

                    log('manage host rule')
                    await controller.manageHostRule(url)

                    log('manage state')
                    await controller.manageState(currTab, url, response)
                }
            )
        }
    })

    await onUpdatedListener()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)
    // expect(spy3).toHaveBeenCalledTimes(1)
    // expect(spy4).toHaveBeenCalledTimes(1)
    // expect(spy5).toHaveBeenCalledTimes(1)

    assert.ok(chrome.runtime.sendMessage.withArgs(currTab.id, msg))
})

test('this is one test', () => {
    // use chrome to call the listeners
    chrome.tabs.onUpdated.addListener(tab => {
        console.log('what is the tab that appears', tab)
        onUpdatedListener(tab)
    })
    assert.ok(chrome.tabs.onUpdated.addListener.calledOnce)
})
