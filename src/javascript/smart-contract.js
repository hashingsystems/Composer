import {
    getLocalStorage,
    setLocalStorage
} from './models/db'
import {
    tabsQuery
} from './chrome-promise'
import debug from 'debug'

const log = debug('all:smart-contract')

document.addEventListener('DOMContentLoaded', async () => {
    // debugger;
    let getI18n = chrome.i18n.getMessage
    console.log("this is  gegetI18nt  fom smart-contract.js   ", getI18n)
    document.getElementById('smartContractText').innerHTML = getI18n(
        'smart_contract_text'
    )
    document.getElementById('smartContractComingSoon').innerHTML = getI18n(
        'smart_contract_coming_soon'
    )

    // which URL is the user on
    const q = {
        active: true,
        currentWindow: true
    }
    let tabs = await tabsQuery(q)
    log(tabs);
    let currTab = tabs[0]
    let url = new URL(currTab.url)

    log(url.origin + url.pathname)

    let prefix = 'hedera-contract-'

    let contractTagKey = prefix + url.origin

    log("contractTagKey smart-contract.js:: ", contractTagKey)
    let contractTag = await getLocalStorage(contractTagKey)
    log("contractTag smart-contract.js:: ", contractTag)
    // const data = {
    //     params: [898765, 7345678, 5, "sarvo"],
    //     contractid: '0.0.1234'
    // }

    // let storedata = await setLocalStorage({ [contractTagKey]: data })

    // The user is currently on a hedera-contract tag page
    if (contractTag !== undefined && contractTag !== null) {
        window.location.href = 'smart-contract-details.html'
    }

    // else {
    //     // The user is NOT on a hedera-contract tag page
    //     window.location.href = 'smart-contract.html'
    // }
})