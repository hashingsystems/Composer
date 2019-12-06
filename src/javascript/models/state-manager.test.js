import { StateManager, HostRule } from '.'
import k from './constants'

// note, we need to do import from 'url' because test runs in node environment, not browser
// in browsser environment, URL class is present by default and is not the same type as this URL class
import { URL } from 'url'
import debug from 'debug'

const log = debug('test:models:state-manager')

let urlHome
let tagHome
let urlNonPayingAccount
let tagNonPayingAccount
let urlArticle
let tagArticle

let urlNotAHederaMicropaymentSite

beforeEach(() => {
    localStorage.clear()
    urlHome = new URL('https://dailytimestamp.com')
    urlArticle = new URL('htps://dailytimestamp.com/article/hedera-rocks')
    urlNonPayingAccount = new URL(
        'https://dailytimestamp.com/non-paying-account'
    )
    // type 'maximum' is a reserved type
    tagHome = {
        amount: 4666669, // amount requested by the website
        account: '0.0.1003', // account id of the "pay to" account
        recipientList: [
            {
                tinybars: 4666669,
                to: '0.0.1003'
            }
        ],
        time: undefined, // optional parameter
        paymentserver: 'https://mps.dailytimestamp.com', // ip address of the payment server
        contentID: '122', // id of the content
        memo: 'test', // optional memo field
        type: 'maximum'
    }
    // type 'article' can be anything
    tagArticle = {
        amount: 4666667, // amount requested by the website
        account: '0.0.1003', // account id of the "pay to" account
        recipientList: [
            {
                tinybars: 4666669,
                to: '0.0.1003'
            }
        ],
        time: undefined, // optional parameter
        paymentserver: 'https://mps.dailytimestamp.com', // ip address of the payment server
        contentID: '123', // id of the content
        memo: 'test', // optional memo field
        type: 'article'
    }
    // type '402' indicates the non paying page redirect
    tagNonPayingAccount = {
        amount: 4666669, // amount requested by the website
        account: '0.0.1003', // account id of the "pay to" account
        recipientList: [
            {
                tinybars: 4666669,
                to: '0.0.1003'
            }
        ],
        time: undefined, // optional parameter
        paymentserver: 'https://mps.dailytimestamp.com', // ip address of the payment server
        contentID: '123', // id of the content
        memo: 'test', // optional memo field
        type: '402'
    }
    urlNotAHederaMicropaymentSite = new URL('https://www.google.com')
})

// NOT_SET
test('Not set, Homepage, Less Than', async () => {
    let hostRule = await new HostRule().init(urlHome.origin)
    await hostRule.getOrSetStatusRule({
        limit: 4666668,
        preference: k.PREF.NOT_SET.toString()
    })

    let sm = await new StateManager().init(urlHome, tagHome)
    let state = sm.getState()

    expect(state.icon).toBe(k.ICON_STATE.BLACK)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('raise-threshold')
})

// NOT_SET
test('Not Set, Homepage, More than or Equals', async () => {
    let hostRule = await new HostRule().init(urlHome.origin)
    await hostRule.getOrSetStatusRule({
        limit: 4666669,
        preference: k.PREF.NOT_SET.toString()
    })

    let sm = await new StateManager().init(urlHome, tagHome)
    let state = sm.getState()

    expect(state.icon).toBe(k.ICON_STATE.GREEN)
    expect(state.banner).toBe(false)
})

test('Yes Always, Homepage, Less Than', async () => {
    let hostRule = await new HostRule().init(urlHome.origin)
    await hostRule.getOrSetStatusRule({
        limit: 4666668,
        preference: k.PREF.YES_ALWAYS.toString()
    })

    let sm = await new StateManager().init(urlHome, tagHome)
    let state = sm.getState()

    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBe(true)
    expect(state.msg.type).toBe('raise-threshold')
})

// YES_ALWAYS
test('Yes Always, Homepage, More Than or Equals', async () => {
    let hostRule = await new HostRule().init(urlHome.origin)
    await hostRule.getOrSetStatusRule({
        limit: 4666669,
        preference: k.PREF.YES_ALWAYS.toString()
    })

    let sm = await new StateManager().init(urlHome, tagHome)
    let state = sm.getState()

    expect(state.icon).toBe(k.ICON_STATE.GREEN)
    expect(state.banner).toBe(false)
})

// NO_ALWAYS
test('No Always, Homepage, Less Than', async () => {
    let hostRule = await new HostRule().init(urlHome.origin)
    await hostRule.getOrSetStatusRule({
        limit: 4666668,
        preference: k.PREF.NO_ALWAYS.toString()
    })

    let sm = await new StateManager().init(urlHome, tagHome)
    let state = sm.getState()

    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBe(true)
    expect(state.msg.type).toBe('raise-threshold')
})

// NO_ALWAYS
test('No Always, Homepage, More Than or Equals', async () => {
    let hostRule = await new HostRule().init(urlHome.origin)
    await hostRule.getOrSetStatusRule({
        limit: 4666669,
        preference: k.PREF.NO_ALWAYS.toString()
    })

    let sm = await new StateManager().init(urlHome, tagHome)
    let state = sm.getState()

    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBe(true)
    expect(state.msg.type).toBe('raise-threshold')
})

test('Not set, non-paying-account, Less Than', async () => {
    let hostname = urlNonPayingAccount.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 4666666,
        preference: k.PREF.NOT_SET.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)
    let sm = await new StateManager().init(
        urlNonPayingAccount,
        tagNonPayingAccount
    )
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.BLACK)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('raise-threshold')
})

test('Not set, non-paying-account, More Than', async () => {
    let hostname = urlNonPayingAccount.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 5666666,
        preference: k.PREF.NOT_SET.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(
        urlNonPayingAccount,
        tagNonPayingAccount
    )
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.GREEN)
    expect(state.banner).toBeFalsy()
    expect(state.msg.type).toBe('redirect-homepage')
})

test('Yes Always, non-paying-account, Less Than', async () => {
    let hostname = urlNonPayingAccount.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 4666666,
        preference: k.PREF.YES_ALWAYS.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)
    let sm = await new StateManager().init(
        urlNonPayingAccount,
        tagNonPayingAccount
    )
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('raise-threshold')
})

test('Yes Always, non-paying-account, More Than', async () => {
    let hostname = urlNonPayingAccount.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 5666666,
        preference: k.PREF.YES_ALWAYS.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(
        urlNonPayingAccount,
        tagNonPayingAccount
    )
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.GREEN)
    expect(state.banner).toBeFalsy()
    expect(state.msg.type).toBe('redirect-homepage')
})

test('No Always, non-paying-account, Less Than', async () => {
    let hostname = urlNonPayingAccount.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 4666666,
        preference: k.PREF.NO_ALWAYS.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)
    let sm = await new StateManager().init(
        urlNonPayingAccount,
        tagNonPayingAccount
    )
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('raise-threshold')
})

test('No Always, non-paying-account, More Than', async () => {
    let hostname = urlNonPayingAccount.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 5666666,
        preference: k.PREF.NO_ALWAYS.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(
        urlNonPayingAccount,
        tagNonPayingAccount
    )
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('raise-threshold')
})
test('Not set, Article, Less Than', async () => {
    let hostname = urlArticle.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 4666666,
        preference: k.PREF.NOT_SET.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(urlArticle, tagArticle)
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.BLACK)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('redirect')
})

test('Not set, Article, More Than', async () => {
    let hostname = urlArticle.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 5666666,
        preference: k.PREF.NOT_SET.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(urlArticle, tagArticle)
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.GREEN)
    expect(state.banner).toBeFalsy()
    expect(state.msg.type).toBe('crypto-transfer')
})

test('Yes always, Article, Less Than', async () => {
    let hostname = urlArticle.origin
    let hostRule = await new HostRule().init(hostname)

    let rule = {
        limit: 4666666,
        preference: k.PREF.YES_ALWAYS.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(urlArticle, tagArticle)
    let state = sm.getState()
    log('status rule is.......: ', statusRule)

    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('redirect')
})

test('Yes always, Article, More Than', async () => {
    let hostname = urlArticle.origin
    let hostRule = await new HostRule().init(hostname)

    let rule = {
        limit: 5666668,
        preference: k.PREF.YES_ALWAYS.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(urlArticle, tagArticle)
    let state = sm.getState()
    log('status rule is.......: ', statusRule)

    expect(state.icon).toBe(k.ICON_STATE.GREEN)
    expect(state.banner).toBeFalsy()
    expect(state.msg.type).toBe('crypto-transfer')
})

test('No Always, Article, Less Than', async () => {
    let hostname = urlArticle.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 4666666,
        preference: k.PREF.NO_ALWAYS.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(urlArticle, tagArticle)
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('redirect')
})

test('No Always, Article, More Than', async () => {
    let hostname = urlArticle.origin
    let hostRule = await new HostRule().init(hostname)
    let rule = {
        limit: 5666666,
        preference: k.PREF.NO_ALWAYS.toString()
    }
    let statusRule = await hostRule.getOrSetStatusRule(rule)

    let sm = await new StateManager().init(urlArticle, tagArticle)
    let state = sm.getState()
    log('status rule is.......: ', statusRule)
    expect(state.icon).toBe(k.ICON_STATE.RED)
    expect(state.banner).toBeTruthy()
    expect(state.msg.type).toBe('redirect')
})

test('Not a hedera-micropayment website', async () => {
    let hostRule = await new HostRule().init(
        urlNotAHederaMicropaymentSite.origin
    )

    // null means no hedera-micropayment html tag on this website
    let sm = await new StateManager().init(urlNotAHederaMicropaymentSite, null)
    let state = sm.getState()
    expect(state.icon).toBe(k.ICON_STATE.GREY)
})
