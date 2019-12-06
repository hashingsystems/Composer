import NetworkManager from '../../models/network-manager'
import { AccountManager } from '../../models'
import {
    dollarsToHbarsCurr,
    dollarsToTinyBarsUnit
} from '../../hedera/currency'
import debug from 'debug'

const log = debug('all:viewcontroller:account-settings')

/**
 * hello
 * A module that handles account-setting's view logic
 * @module AccountSettings
 */

/**
 *
 * limitViewController handles the UI view of global limit in account-setting
 * @param {Document} document
 */
async function limitViewController(document) {
    let nm = await new NetworkManager().init()
    let limitMultiCurr = await nm.getCurrentLimitInMultiCurrency()

    // update view
    let thresholdDollarsElem = document.getElementById('thresholdDollars')
    let thresholdBarsElem = document.getElementById('thresholdBars')
    thresholdDollarsElem.value = limitMultiCurr.USDNum
    thresholdBarsElem.innerHTML = limitMultiCurr.hBars

    // when user changes the thresholdDollars in the input field, update thresholdBarsElem
    thresholdDollarsElem.oninput = function(e) {
        let value = e.target.value
        thresholdBarsElem.innerHTML = dollarsToHbarsCurr(value)
    }

    // once user leaves the thresholdDollars input field, we save the value in tinyBars (which is an integer number)
    thresholdDollarsElem.onblur = async function() {
        let value = thresholdDollarsElem.value
        log('VALUE HERE IS ', value)
        let tinyBarsObj = dollarsToTinyBarsUnit(value)
        log('tinyBarsNum HERE IS ', tinyBarsObj.toNumber())
        await nm.setCurrentLimit(tinyBarsObj.toNumber())
    }
}

/**
 *
 * accountViewController handles the UI view of account details in account-setting
 * @param {Document} document
 */
async function accountViewController(document) {
    let am = await new AccountManager().init()
    let a = await am.getCurrentAccountObject()
    let publicKey = a.details.publicKey
    let accountID = a.accountID

    // update view
    document.getElementById('account-id').value = accountID
    document.getElementById('pub').value = publicKey
}

export { limitViewController, accountViewController }
