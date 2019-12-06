import HederaTag from '.'
import { JSDOM } from 'jsdom'
import path from 'path'
import debug from 'debug'

const log = debug('test:hedera')

test('When document object is invalid', () => {
    let result = HederaTag.micropayment(null)
    expect(result).toBe(false)
})

test('When hedera-micropayment tag is VALID', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'publisherexample1_valid.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.micropayment(document)
    log(result)
    expect(result).toEqual({
        recipientList: [
            {
                tinybars: '444',
                to: '0.0.1003'
            }
        ],
        time: '1',
        submissionNode: undefined,
        paymentServer: 'http://localhost:8099',
        contentID: 'test1',
        memo: 'test1',
        type: 'article',
        redirect: {
            nonPayingAccount: '/nomicropaymentreceived.html',
            homePage: '/',
            noAccount: '/no-account'
        },
        extensionId: 'pggademcllgdajmghcgeidpcbllikmcp'
    })
})

test('When hedera-micropayment tag is INVALID - does not contain recipientList', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'publisherexample2_invalid_recipientlist_empty.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    // get the document object that we can operate on
    let document = dom.window.document
    // test it
    let result = HederaTag.micropayment(document)
    // since publisherexample1.html has an old tag that does not have recipientList, it should fail
    expect(result).toBe(false)
})

test('When hedera-micropayment tag is INVALID - recipientList amount is empty', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'publisherexample3_invalid_recipientlist_amount_empty.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.micropayment(document)
    expect(result).toBe(false)
})

test('When hedera-micropayment tag is INVALID - recipientList accountID is invalid', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'publisherexample4_invalid_accountid.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.micropayment(document)
    expect(result).toBe(false)
})

test('When hedera-micropayment tag is INVALID - accountID is invalid', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'publisherexample4_invalid_accountid.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.micropayment(document)
    expect(result).toBe(false)
})

test('When hedera-micropayment tag is INVALID - submissionNode account is invalid', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'publisherexample5_invalid_submissionnode.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.micropayment(document)
    expect(result).toBe(false)
})

test('When hedera-micropayment tag is VALID - paymentserver is valid', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'publisherexample6_valid_paymentserver.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.micropayment(document)
    expect(result).toEqual({
        recipientList: [
            {
                tinybars: '444',
                to: '0.0.1003'
            }
        ],
        time: '1',
        submissionNode: '0.0.3',
        paymentServer: 'http://localhost:8099',
        contentID: 'test1',
        memo: 'test1',
        type: 'article',
        extensionId: 'ajeohoociaeemadgmpfdkcbhmloppohn',
        redirect: {
            nonPayingAccount: '/nomicropaymentreceived.html',
            noAccount: '/no-account',
            homePage: '/customhomepage'
        }
    })
})

test('When hedera-micropayment tag is INVALID - paymentserver is invalid', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'publisherexample7_invalid_paymentserver.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.micropayment(document)
    expect(result).toBe(false)
})
