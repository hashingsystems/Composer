import Dinero from 'dinero.js'
import {
    tinyBarsToDollarsUnit,
    dollarsToTinyBarsUnit,
    dollarsToTinyBarsCurr,
    tinyBarsToHBarsUnit,
    tinyBarsToHBarsCurr,
    hBarsToTinyBarsUnit,
    hBarsToTinyBarsCurr,
    dollarsToHbarsCurr,
    hBarsToDollarsCurr
} from './currency'

test('conversion', () => {
    // log("conversion")
})

test('1 USD as a Dinero object', () => {
    let one = Dinero({
        amount: 100,
        currency: 'USD'
    }).toFormat()
    expect(one).toBe('$1.00')
})

test('construct a custom currency', () => {
    // 5 hBars, since Dinero assumes X100
    let d = Dinero({
        amount: 500
    })
    let hBarString = d.toFormat().substr(1)
    let hBar = `${hBarString} ℏ`
    expect(hBar).toBe('5.00 ℏ')
})

test('tinyBars to hBars currency', () => {
    let tBarsToHBarsCurr = tinyBarsToHBarsCurr(110000000000000000, 2)
    expect(tBarsToHBarsCurr).toBe('1100000000.00 ℏ')

    let tBarsToHBarsCurr1 = tinyBarsToHBarsCurr(898356632927)
    expect(tBarsToHBarsCurr1).toBe('8983.56632927 ℏ')

    let tBarsToHBarsCurr2 = tinyBarsToHBarsCurr(1)
    expect(tBarsToHBarsCurr2).toBe('0.00000001 ℏ')

    let tBarsToHBarsCurr3 = tinyBarsToHBarsCurr(999900099000, 8)
    expect(tBarsToHBarsCurr3).toBe('9999.00099000 ℏ')
})

test('tinyBars to hBars unit', () => {
    let tinyBarsToHBarsU = tinyBarsToHBarsUnit(100000000)
    expect(tinyBarsToHBarsU.toNumber()).toBe(1)

    let tinyBarsToHBarsU2 = tinyBarsToHBarsUnit(1)
    expect(tinyBarsToHBarsU2.toNumber()).toBe(0.00000001)

    let tinyBarsToHBarsU1 = tinyBarsToHBarsUnit(898356632927)
    expect(tinyBarsToHBarsU1.toNumber()).toBe(8983.56632927)
})

test('tinyBars to Dollars unit', () => {
    let tinyBarsToDolsU = tinyBarsToDollarsUnit(100000000)
    expect(tinyBarsToDolsU.toNumber()).toBe(0.12)
    expect(tinyBarsToDolsU.toFixed(2)).toBe('0.12')

    let tinyBarsToDolsU1 = tinyBarsToDollarsUnit(1) // smallest currency in tinybars
    expect(tinyBarsToDolsU1.toNumber()).toBe(0.0000000012)
    expect(tinyBarsToDolsU1.toFixed(10)).toBe('0.0000000012')

    let tinyBarsToDolsU2 = tinyBarsToDollarsUnit(0.1)
    expect(tinyBarsToDolsU2.toNumber()).toBe(0)
    expect(tinyBarsToDolsU2.toFixed()).toBe('0')

    let tinyBarsToDolsU3 = tinyBarsToDollarsUnit(0)
    expect(tinyBarsToDolsU3.toNumber()).toBe(0)
    expect(tinyBarsToDolsU2.toFixed()).toBe('0')

    let tinyBarsToDolsU4 = tinyBarsToDollarsUnit(4666668) // tinyBars.toFix(3) returns a rounded up string
    expect(tinyBarsToDolsU4.toNumber()).toBe(0.0056000016)
    expect(tinyBarsToDolsU4.toFixed(4)).toBe('0.0056')

    let USDObj = tinyBarsToDollarsUnit(5678990001112)
    let USDNum = USDObj.toNumber()
    expect(USDNum).toBe(6814.788001334399)
    let USDString = `$${USDObj.toFixed(3)}`
    expect(USDString).toBe('$6814.788')

    let amountInUsdObj = tinyBarsToDollarsUnit(200000)
    expect(`$${amountInUsdObj.toNumber()}`).toBe('$0.00024')

    let amountInUsdObj1 = tinyBarsToDollarsUnit(277777775)
    expect(`$${amountInUsdObj1.toFixed(5)}`).toBe('$0.33333')
})

test('hBars to tinyBars currency', () => {
    let hBarsTotinyBarsC = hBarsToTinyBarsCurr(1)
    expect(hBarsTotinyBarsC).toBe('100,000,000.00 tℏ')
})

test('hBars to tinyBars unit', () => {
    let hBarsTotinyBarsU = hBarsToTinyBarsUnit(1)
    expect(hBarsTotinyBarsU.toNumber()).toBe(100000000)

    let tinyBarsToHBarsU2 = tinyBarsToHBarsUnit(1)
    expect(tinyBarsToHBarsU2.toNumber()).toBe(0.00000001)

    let tinyBarsToHBarsU1 = tinyBarsToHBarsUnit(898356632927)
    expect(tinyBarsToHBarsU1.toNumber()).toBe(8983.56632927)

    let tinyBarsToHBarsU3 = tinyBarsToHBarsUnit(8983566329273)
    expect(tinyBarsToHBarsU3.toNumber()).toBe(89835.66329273001)

    let tinyBarsToHBarsU4 = tinyBarsToHBarsUnit(89835663292755)
    expect(tinyBarsToHBarsU4.toNumber()).toBe(898356.63292755)

    let tinyBarsToHBarsU5 = tinyBarsToHBarsUnit(2212345678)
    expect(tinyBarsToHBarsU5.toNumber()).toBe(22.12345678)
})

test('hBars to Dollars currency', () => {
    let hBarsToDol = hBarsToDollarsCurr(1)
    expect(hBarsToDol).toBe('$0.12')
})

test('Dollars to tinyBars currency', () => {
    let dolToTinyBarsCurr = dollarsToTinyBarsCurr(0.12)
    expect(dolToTinyBarsCurr).toBe('100,000,000.00 tℏ')

    let dolToTinyBarsCurr1 = dollarsToTinyBarsCurr(0.00499)
    expect(dolToTinyBarsCurr1).toBe('4,158,333.25 tℏ')

    let dolToTinyBarsCurr2 = dollarsToTinyBarsCurr(0.00479)
    expect(dolToTinyBarsCurr2).toBe('3,991,666.67 tℏ')
})

test('dollars to tinyBars unit', () => {
    let dollarsToTinyBarsU = dollarsToTinyBarsUnit(0.12)
    expect(dollarsToTinyBarsU.toNumber()).toBe(100000000)

    let dollarsToTinyBarsU1 = dollarsToTinyBarsUnit(0.0000000012) // smallest currency in USD
    expect(dollarsToTinyBarsU1.toNumber()).toBe(1)

    let dollarsToTinyBarsU2 = dollarsToTinyBarsUnit(0.0304)
    expect(dollarsToTinyBarsU2.toNumber()).toBe(25333333)

    let dollarsToTinyBarsU3 = dollarsToTinyBarsUnit(0.9013337335)
    expect(dollarsToTinyBarsU3.toNumber()).toBe(751111444)
})

test('Dollars to hBars currency', () => {
    let dolToHbars = dollarsToHbarsCurr(0.12)
    expect(dolToHbars).toBe('1.00 ℏ')

    let dolToHbars1 = dollarsToHbarsCurr(0.00499)
    expect(dolToHbars1).toBe('0.04 ℏ')

    let dolToHbars2 = dollarsToHbarsCurr(0.00479)
    expect(dolToHbars2).toBe('0.04 ℏ')
})
