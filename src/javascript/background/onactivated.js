import {
    manageUser,
    manageRuntimeError,
    manageTabError,
    manageHostRule,
    manageUserCookies
} from './controller'
import debug from 'debug'

const log = debug('all:background:onactivated')

const onActivatedListener = async () => {
    let currTab = await manageTabError()
    if (currTab === undefined) return

    let {
        currentAccount,
        msg
    } = await manageUser()
    if (currentAccount === undefined) {
        chrome.tabs.sendMessage(currTab.id, msg)
        return
    }
    chrome.tabs.sendMessage(currTab.id, msg)

    let url = new URL(currTab.url)
    let type = 'hedera-tag'
    msg = {
        type
    }

    await manageHostRule(url)

    chrome.tabs.sendMessage(currTab.id, msg, async function (response) {
        // no hedera-tag catch chrome runtime error
        if (manageRuntimeError(response)) return

        await manageUserCookies(url)

        await manageHostRule(url)
        log("onActivatedListener::", response)
        // await manageState(currTab, url, response)
    })
}

export default onActivatedListener