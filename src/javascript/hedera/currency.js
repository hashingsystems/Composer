import Dinero from 'dinero.js'
import k from '../models/constants'
import Decimal from 'decimal.js'

/**
 * @module currency
 */

/**
 *
 * tinyBarsToDollarsUnit returns dollars in unit from tinyBars conversion.
 * tinyBars is converted to USD (at the current constant exchange rate of 0.12 USD to 1 HBar).
 * @param {number} tinyBars
 * @returns dollars in units
 */
function tinyBarsToDollarsUnit(tinyBars) {
    let a = parseInt(tinyBars) * 10000000000 // this is to ensure we catch 10 decimal places
    let b = a * k.DEFAULT_EXCHANGE
    let c = b / 1000000000000000000
    if (c.toString().match(/[e-]/)) {
        return new Decimal(c.toFixed(10))
    }
    return new Decimal(c)
}

/**
 *
 * dollarsToTinyBarsUnit returns tinyBars in unit from dollars conversion.
 * tinyBars is converted to USD (at the current constant exchange rate of 0.12 USD to 1 HBar).
 * smallest number being 1 tinyBar, ie USD0.0000000012.
 * @param {number} dollars
 * @returns tinyBars in units
 */
function dollarsToTinyBarsUnit(dollars) {
    let a = dollars * 100000000
    let b = a * 1
    let c = b / k.DEFAULT_EXCHANGE
    let d = new Decimal(c)
    return d.toNearest(1, Decimal.ROUND_DOWN)
}

/**
 *
 * dollarsToTinyBarsCurr returns tinyBars in string from dollars conversion.
 * @param {number} dollars
 * @returns tinyBars in string
 */
function dollarsToTinyBarsCurr(dollars) {
    let dineroConversion = dollars * 100000000 * 100
    let dineroRounded = dineroConversion.toString().split('.')
    let final1 = Number(dineroRounded[0])
    let dolToTinyBarsCurr = Dinero({
        amount: final1,
        precision: 2
    })
        .divide(k.DEFAULT_EXCHANGE)
        .toFormat()
    let tinyBarsUnit = dolToTinyBarsCurr.slice(1)
    let tBarsCurrency = `${tinyBarsUnit} tℏ`
    return tBarsCurrency
}

// 100000000 tinyBars (100 million tinyBars) is equal to 1 HBar.
/**
 *
 * tinyBarsToHBarsUnit returns hBars in unit from tinyBars conversion
 * 1 tinyBar === 0.00000001 hBars
 * @param {number} tinyBars
 * @returns hBars in unit
 */
function tinyBarsToHBarsUnit(tinyBars) {
    let a = parseInt(tinyBars) * 10000000000 // this is to ensure we catch 10 decimal places
    let b = a / 100000000
    let c = b / 10000000000
    if (c.toString().match(/[e-]/)) {
        return new Decimal(c.toFixed(8))
    }
    return new Decimal(c)
}

/**
 *
 * tinyBarsToHBarsCurr  returns hBars in string from tinyBars conversion
 * @param {number} tinyBars
 * @param {number=} deciPlace
 */
function tinyBarsToHBarsCurr(tinyBars, deciPlace = 8) {
    let hBarsUnit = tinyBarsToHBarsUnit(tinyBars).toFixed(deciPlace)
    let hBarCurrency = `${hBarsUnit} ℏ`
    return hBarCurrency
}

/**
 *
 * hBarsToTinyBarsUnit returns tinyBars in unit from hBars conversion
 * 1 HBar is equal to 100000000 (100 million) tinyBars
 * @param {number} HBars
 * @returns a Decimal object
 */
function hBarsToTinyBarsUnit(HBars) {
    let d = HBars * 100000000
    return new Decimal(d)
}

/**
 *
 * hBarsToTinyBarsCurr returns tinyBars in string from hBars conversion
 * @param {number} hBars
 * @returns tinyBats in string
 */
function hBarsToTinyBarsCurr(hBars) {
    // TODO make sure hbars accept up to 2 decimal places
    let dineroConversion = hBars * 100
    let hBarsTotinyBars = Dinero({
        amount: dineroConversion
    })
        .multiply(100000000)
        .toFormat()
    let tinyBarsUnit = hBarsTotinyBars.slice(1)
    let tinyBarsCurrency = `${tinyBarsUnit} tℏ`
    return tinyBarsCurrency
}

/**
 *
 * dollarsToHbarsCurr returns hBars in string from dollars conversion
 * @param {number} dollars
 * @returns hBars in string
 */
function dollarsToHbarsCurr(dollars) {
    let dineroConversion = dollars * 100000000 * 100
    let dineroRounded = dineroConversion.toString().split('.')
    let final1 = Number(dineroRounded[0])

    let dolToHbars = Dinero({
        amount: final1,
        precision: 2
    })
        .divide(k.DEFAULT_EXCHANGE)
        .divide(100000000)
        .toFormat()

    let hBarsUnit = dolToHbars.slice(1)
    let hBarsCurrency = `${hBarsUnit} ℏ`
    return hBarsCurrency
}

/**
 *
 * hBarsToDollarsCurr returns dollars in string from hBars conversion
 * @param {number} hBars
 * @returns a dinero object
 */
function hBarsToDollarsCurr(hBars) {
    // TODO make sure hbars accept up to 2 decimal places
    let dineroConversion = hBars * 100
    let hBarsToDol = Dinero({
        amount: dineroConversion
    })
        .multiply(k.DEFAULT_EXCHANGE)
        .toFormat()
    return hBarsToDol
}

export {
    tinyBarsToDollarsUnit,
    dollarsToTinyBarsUnit,
    dollarsToTinyBarsCurr,
    tinyBarsToHBarsUnit,
    tinyBarsToHBarsCurr,
    hBarsToTinyBarsUnit,
    hBarsToTinyBarsCurr,
    dollarsToHbarsCurr,
    hBarsToDollarsCurr
}
