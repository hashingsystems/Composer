import {
    manageUser,
    manageState,
    manageRuntimeError,
    manageTabError,
    manageHostRule,
    manageUserCookies
} from './controller'
import debug from 'debug'

const log = debug('all:background:onupdated')

const onUpdatedListener = async (tabID, info) => {
    log("onUpdatedListener: ", info.status, tabID)
    if (info.status === 'complete') {
        let currTab = await manageTabError()
        log("onUpdatedListener: complete:", currTab, tabID)
        if (currTab === undefined) return

        let {
            currentAccount,
            msg
        } = await manageUser()

        if (currentAccount === undefined) {
            chrome.tabs.sendMessage(currTab.id, msg)
            return
        }
        // chrome.tabs.sendMessage(currTab.id, msg)

        let url = new URL(currTab.url)
        let type = 'hedera-tag'
        msg = {
            type
        }

        // await manageHostRule(url)

        chrome.tabs.sendMessage(currTab.id, msg, async function (response) {
            log('receive response', response)
            // catch chrome runtime error
            if (manageRuntimeError(response)) {
                log('Pablo: manageRuntimeError')
                return
            }

            log('manage user cookies')
            await manageUserCookies(url)

            log('manage host rule')
            await manageHostRule(url)

            log('manage state')
            await manageState(currTab, url, response)
        })
    }
}

export default onUpdatedListener