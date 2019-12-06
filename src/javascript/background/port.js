import {
    iconInstalled,
    iconBlocked,
    iconActive,
    openModal
} from '../ui-utils'
import {
    tabsQuery
} from '../chrome-promise'
import {
    HostRule,
    AccountManager,
    Transactions
} from '../models'
import k from '../models/constants'
import debug from 'debug'

import {
    manageUser,
    manageState,
    manageRuntimeError,
    manageTabError,
    manageHostRule,
    manageUserCookies
} from './controller'

const log = debug('all:background:port')


const portListener = async port => {
    console.log("##################");
    console.log(port);
    port.onMessage.addListener(async function (msg) {
        log('RESPONSE', msg)

        if (msg.text === 'hedera-contract-tag' || msg.text === 'hedera-micropayment-tag') {

            let response = msg.contractTag ? msg.contractTag : msg.micropaymentTag

            log('PORT:::RESPONSE:::', response)
            let active = true
            let currentWindow = true
            let q = {
                active,
                currentWindow
            }
            let tabs = await tabsQuery(q)
            let currTab = tabs[0]

            log('Tabs::', tabs)

            if (currTab === undefined) {
                // icon grey, ie not active
                iconInstalled()
                return undefined
            }

            if (currTab === undefined) return

            let url = new URL(currTab.url)

            if (manageRuntimeError(response)) {
                log('Pablo port:: manageRuntimeError')
                return
            }

            log('manage user cookies')
            await manageUserCookies(url)

            log('manage host rule')
            await manageHostRule(url)

            log('manage state')
            await manageState(currTab, url, response)


            return
        }

        if (msg.text === 'smart-contract-success') {
            log("PORT Smart contract success...")
            let active = true
            let currentWindow = true
            let lastFocusedWindow = true

            let q = {
                active,
                currentWindow
            }
            let tabs = await tabsQuery(q)
            let currTab = tabs[0]

            log('Tabs::', tabs)
            let url = new URL(currTab.url)
            let senderUrl = url.searchParams.get('sender_url');

            let q2 = {
                windowType: 'normal',
                url: senderUrl,
                windowId: 2771
            }
            let tabs2 = await tabsQuery(q)
            let currTab2 = tabs2[0]

            log('Tabs2::', tabs2, senderUrl)

            return
        }
        if (msg.text === 'change-icon') {
            iconBlocked()
            return true
        }

        if (msg.text === 'indexeddb-save') {
            let am = await new AccountManager().init()
            let a = await am.getCurrentAccountObject()
            let txs = await new Transactions().init(a.accountID)
            log(txs)
            let data = msg.data
            log('Saving data', data)
            await txs.save(data)
            return true
        }

        let key = HostRule.enumByValue(msg.text)
        log(typeof key, key)
        let am = await new AccountManager().init()
        let currentAccount = await am.getCurrentAccountObject()
        if (currentAccount) {
            let q = {
                active: true,
                lastFocusedWindow: true
            }
            let tabs = await tabsQuery(q)
            let currTab = tabs[0]
            if (currTab === undefined) {
                iconInstalled()
                return true
            }
            let url = new URL(currTab.url)
            let hostRule = await new HostRule().init(url.origin)
            let rule = {}
            log('msg is', msg)
            let currThr = msg.currThr
            let requestedPayment = msg.requestedPayment
            log(url.origin)
            log(currThr)
            log(requestedPayment)

            let newThr
            switch (k.PREF[key]) {
                case k.PREF.YES_ONCE:
                    // 3 types of cases for each enum
                    if (currThr < requestedPayment) {
                        log('LESS THAN')
                        // raise users threshold for current website and save the higher amt
                        newThr = currThr
                    } else if (currThr === requestedPayment) {
                        log('EQUALS')
                        // no change
                        newThr = requestedPayment
                    } else {
                        log('MORE THAN')
                        // currThr > requestedPayment
                        newThr = currThr
                    }
                    // make payment then
                    log('CRYPTOTRANSFER execute: background, YES_ONCE')
                    chrome.tabs.sendMessage(currTab.id, {
                        type: 'crypto-transfer',
                        response: msg.micropaymentTag,
                        url
                    })
                    iconBlocked()
                    // await cryptoTransferController(
                    //     msg.micropaymentTag,
                    //     url,
                    //     true
                    // )
                    rule = {
                        limit: newThr,
                        preference: k.PREF.YES_ONCE.toString(),
                        once: true
                    }
                    await hostRule.setRule(rule)
                    break
                case k.PREF.YES_ALWAYS:
                    log(key)
                    if (currThr < requestedPayment) {
                        newThr = requestedPayment
                    } else if (currThr === requestedPayment) {
                        newThr = requestedPayment
                    } else if (currThr > requestedPayment) {
                        newThr = currThr
                    }
                    // make payment then
                    log(msg.micropaymentTag.type)
                    log(msg.micropaymentTag.type !== 'maximum')
                    log(msg.micropaymentTag.type !== '402')
                    let evaluateCondition =
                        msg.micropaymentTag.type !== 'maximum' &&
                        msg.micropaymentTag.type !== '402'
                    log(evaluateCondition)
                    if (
                        msg.micropaymentTag.type !== 'maximum' &&
                        msg.micropaymentTag.type !== '402'
                    ) {
                        log('CRYPTOTRANSFER execute: background, YES_ALWAYS')
                        chrome.tabs.sendMessage(currTab.id, {
                            type: 'crypto-transfer',
                            response: msg.micropaymentTag,
                            url
                        })
                        iconActive()
                        // await cryptoTransferController(msg.micropaymentTag, url)
                    } else {
                        if (msg.micropaymentTag.type === '402') {
                            chrome.tabs.sendMessage(currTab.id, {
                                type: 'redirect-homepage'
                            })
                        }
                        log('DO NOT make payment because this is the home page')
                    }

                    rule = {
                        limit: newThr,
                        preference: k.PREF.YES_ALWAYS.toString(),
                        once: false
                    }
                    await hostRule.setRule(rule)
                    break
                case k.PREF.NO_ONCE:
                    log(key)
                    rule = {
                        limit: currThr,
                        preference: k.PREF.NO_ONCE.toString(),
                        once: true
                    }
                    // no payment needed
                    iconBlocked()
                    await hostRule.setRule(rule)
                    break
                case k.PREF.NO_ALWAYS:
                    log(key)
                    // never increase threshold
                    // means no payment needed
                    rule = {
                        limit: currThr,
                        preference: k.PREF.NO_ALWAYS.toString(),
                        once: false
                    }
                    // no payment needed block always
                    iconBlocked()
                    await hostRule.setRule(rule)
                    break
                default:
                    rule = {
                        limit: 0,
                        preference: undefined,
                        once: true
                    }
                    await hostRule.setRule(rule)
                    log('Something went wrong')
                    break
            }
            log('host rule', await hostRule.getRule())
        }
        return true;
    })
}

export default portListener