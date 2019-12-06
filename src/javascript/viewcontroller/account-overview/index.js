import { HostRule } from '../../models'
import { dollarsToTinyBarsUnit } from '../../hedera/currency'
import debug from 'debug'
import k from '../../models/constants'
const log = debug('all:viewcontroller:account-view')

/**
 * A module that handles account-overview's view logic
 * @module AccountOverview
 */

/**
 *
 * hostRuleViewController gets and sets the host rule from @see HostRule
 * It manages what is shown in the UI of account-overview.
 * @param {string} hostname
 * @param {Document} document
 */
async function hostRuleViewController(hostname, document) {
    let hostRule = await new HostRule().init(hostname)
    let statusRule = await hostRule.getOrSetStatusRule()
    log('statusRule', statusRule)
    let limitMultiCurr = await hostRule.getCurrentLimitInMultiCurrency()

    // update view
    let thresholdDollarsElem = document.getElementById('localThresholdDollars')
    let thresholdBarsElem = document.getElementById('localThresholdBars')
    thresholdDollarsElem.value = limitMultiCurr.USDNum
    thresholdBarsElem.innerHTML = limitMultiCurr.hBars

    // when user changes the localThresholdDollars in the input field, update localThresholdBarsElem
    thresholdDollarsElem.oninput = function(e) {
        if (e.target.value >= 0) {
            let dollars = e.target.value
            let conversion = dollars * 100000000 * 100
            let rounded = conversion.toString().split('.')
            let final1 = Number(rounded[0])
            let dolToHbars = final1 / k.DEFAULT_EXCHANGE / 10000000000
            let hBarsCurrency = `${dolToHbars.toFixed(8)} ℏ`
            log('hBarsCurrency', hBarsCurrency)
            thresholdBarsElem.innerHTML = hBarsCurrency
        }
    }

    // once user leaves the localThresholdDollars input field, we save the value in tinyBars (which is an integer number)
    thresholdDollarsElem.onblur = async function() {
        let value = thresholdDollarsElem.value
        if (value >= 0) {
            let tinyBarsObj = dollarsToTinyBarsUnit(value)
            await hostRule.setLimit(tinyBarsObj.toNumber())
        }
    }
}

export default hostRuleViewController
