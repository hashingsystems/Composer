import chrome from 'sinon-chrome/extensions'
import { tabsQuery, cookiesGet } from './index'

beforeAll(() => {
    global.chrome = chrome
})

beforeEach(() => {
    chrome.flush()
})

afterAll(() => {
    chrome.flush()
    delete global.chrome
})

test('should resolve tabs query', () => {
    chrome.runtime.lastError = null
    chrome.tabs.query.yields([1, 2])
    expect.assertions(1)
    return tabsQuery().then(q => expect(q).toEqual([1, 2]))
})

// test('should resolve cookies', () => {
//     chrome.cookies.get({ hello: 0 })
//     return cookiesGet().then(cookies => expect(cookies).toEqual({ hello: 0 }))
// })

test('should reject cookies', () => {
    try {
        cookiesGet()
    } catch (e) {
        expect(e).toEqual(new Error('no cookie for you'))
    }
})
