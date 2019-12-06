import Transactions from './transactions'
import { migrations } from './migrations'
import debug from 'debug'

const log = debug('test:models:transactions')

// suppress Dexie warnings. change this to false to run test if we want to see the warnings.
let suppressDexieWarning = true
let originalWarn

beforeEach(() => {
    if (suppressDexieWarning) {
        originalWarn = console.warn
        console.warn = jest.fn()
    }
})

afterEach(() => {
    if (suppressDexieWarning) {
        console.warn = originalWarn
    }
})

// We use different databaseName to prevent race condition during testing
// options.databaseName is automatically set in development, staging or production
// options.versionNumber defaults to using all migrations set in migrations/index.js

async function runMigration1(databaseName) {
    let accountID = '0.0.1001'
    let options = {
        databaseName: databaseName,
        versionNumber: 1
    }
    let t = await new Transactions().init(accountID, options)
    expect(t.db.verno).toBe(1)
    let data = {
        host: 'https://dailytimestamp.com',
        path: '/article/awesome',
        amount: 41666666,
        created: Date.now()
    }
    await t.save(data)

    t = await new Transactions().init(accountID, options)
    expect(t.db.verno).toBe(1)
    data = {
        host: 'https://dailytimestamp.com',
        path: '/article/somethingelse',
        amount: 41666666,
        created: Date.now()
    }
    await t.save(data)

    let recentTransactions = await t.retrieve(false)
    let tx0 = recentTransactions[0]
    delete tx0.id
    delete tx0.accountID
    expect(tx0).toEqual(data)
    return {
        t,
        accountID,
        options
    }
}

test('Test migration 1', async () => {
    let { t, accountID, options } = await runMigration1('db1')
    let recentTransactions = await t.retrieve(false)
    expect(recentTransactions.length).toBe(2)
    await t.delete()
})

test('Test migration 2', async () => {
    let { t, accountID, options } = await runMigration1('db2')
    options.versionNumber = 2

    t = await new Transactions().init(accountID, options)
    expect(t.db.verno).toBe(2)

    // we expect our indexed-db transactions table to id as primary key
    // and have the other keys
    let primKeyName = t.db.transactions.schema.primKey.name
    // our primary key is still id at this point because we screwed up previous migration
    expect(primKeyName).toBe('id')
    let tableKeys = Object.keys(t.db.transactions.schema.idxByName)
    expect(tableKeys).toEqual([
        'transactionId',
        'accountID',
        'host',
        'path',
        'amount',
        'created',
        'receipt'
    ])

    let data = {
        transactionId: '0.0.1001@1549809381.3511',
        host: 'https://dailytimestamp.com',
        path: '/article/awesome',
        amount: 41666666,
        created: Date.now()
    }
    await t.save(data)

    data = {
        transactionId: '0.0.1007@1549809369.6473',
        host: 'https://dailytimestamp.com',
        path: '/article/awesome',
        amount: 41666666,
        created: Date.now()
    }
    await t.save(data)

    let recentTransactions = await t.retrieve(false)
    log('MIGRATION LIST HERE INCLUDES WHO? ', recentTransactions)
    expect(recentTransactions.length).toBe(4)
    await t.delete()
})

test('Test migration 3', async () => {
    let { t, accountID, options } = await runMigration1('db3')
    options.versionNumber = 3

    t = await new Transactions().init(accountID, options)
    expect(t.db.verno).toBe(3)
    await t.delete()
})

test('Test migration 4', async () => {
    let { t, accountID, options } = await runMigration1('db4')
    options.versionNumber = undefined

    t = await new Transactions().init(accountID, options)
    expect(t.db.verno).toBe(4)
    let data = {
        transactionId: `${accountID}@${Date.now()}.413`,
        host: 'https://dailytimestamp.com',
        path: '/article/awesome',
        amount: 41666666,
        created: Date.now()
    }
    await t.save(data)

    data = {
        transactionId: `${accountID}@${Date.now()}.6473`,
        host: 'https://dailytimestamp.com',
        path: '/article/awesome',
        amount: 41666666,
        created: Date.now()
    }
    await t.save(data)

    data = {
        transactionId: `${accountID}@${Date.now()}.5735`,
        host: 'https://dailytimestamp.com',
        path: '/article/awesome',
        amount: 41666666,
        created: Date.now()
    }
    await t.save(data)
    // we expect our indexed-db transactions table to transactionId as primary key
    // and have the other keys
    let primKeyName = t.db.transactions.schema.primKey.name
    expect(primKeyName).toBe('transactionId')
    let tableKeys = Object.keys(t.db.transactions.schema.idxByName)
    // log(tableKeys)
    expect(tableKeys).toEqual([
        'accountID',
        'host',
        'path',
        'amount',
        'created',
        'receipt'
    ])
    let recentTransactions = await t.retrieve(false)
    log('WHO IS IN MIGRATION 4?? ', recentTransactions)
    expect(recentTransactions.length).toBe(5)
    await t.delete()
})

test('Test transactions model', async () => {
    let options = {
        databaseName: 'testdatabase'
    }
    let t = await new Transactions().init('0.0.1000', options)
    let now = Date.now()
    // save a transaction
    let data = {
        transactionId: '1',
        host: 'https://dailytimestamp.com',
        path: '/article/awesome',
        amount: 41666666,
        created: now
    }
    await t.save(data)

    t = await new Transactions().init('0.0.1000', options)
    now = Date.now()
    // save a transaction
    data = {
        transactionId: `0.0.1000@${Date.now()}.5735`,
        host: 'https://dailytimestamp.com',
        path: '/article/awesome',
        amount: 41666666,
        created: now
    }
    await t.save(data)

    let transactionList = await t.retrieve()
    expect(transactionList).toBeInstanceOf(Array)
    expect(transactionList.length).toBe(2)

    let firstTx = transactionList[0]

    // firstTx has an additional key id with value 1
    expect(firstTx.transactionId).toEqual(data.transactionId)
    // firstTx has an additional key accountID with value '0.0.1000'
    expect(firstTx.accountID).toEqual('0.0.1000')

    // make sure data has the accountID value
    data.accountID = '0.0.1000'

    let transformedData = t.getTheTimeStamp([data]) // accepts a list and returns a list
    let transformedDataFirst = transformedData[0]
    expect(firstTx.transactionId).toEqual(transformedDataFirst.transactionId)
    expect(firstTx).toEqual(transformedDataFirst)

    let retrievedData = await t.getByPrimaryKey(data.transactionId)
    expect(retrievedData).toEqual(data)

    retrievedData = await t.getByPrimaryKey('wontExist')
    expect(retrievedData).not.toBeDefined()

    await t.delete()
})

// DO NOT DELETE
// We should add an erroneous migration and prove that the previous migration is broken

// This test attempts to replicate the error, where
// user uses v1 indexed-db at first, then got upgraded to v2
// test('Test migration bug', async () => {
//     // migrate only up to version 1
//     let options = {
//         databaseName: 'testdatabase2',
//         versionNumber: 1
//     }
//     let accountID = '0.0.1001'

//     let t = await new Transactions().init(accountID, options)
//     expect(t._version).toBe(1)
//     // save a transaction and verify we can retrieve it
//     let data = {
//         host: 'https://dailytimestamp.com',
//         path: '/article/awesome',
//         amount: 41666666,
//         created: Date.now()
//     }
//     await t.save(data)
//     let transactionList = await t.retrieve(false)
//     let transaction0 = transactionList[0]
//     delete transaction0.id
//     delete transaction0.accountID
//     expect(transaction0).toEqual(data)

//     // now, migrate to version 2
//     options.versionNumber = 2
//     t = await new Transactions().init(accountID, options)
//     expect(t._version).toBe(2)
//     // save a transaction and verify we can retrieve it
//     let data2 = {
//         transactionId: 'someTransactionId',
//         host: 'https://dailytimestamp.com',
//         path: '/article/awesome',
//         amount: 41666666,
//         created: Date.now()
//     }
//     // This conclusively triggers the bug
//     // OpenFailedError: UpgradeError Not yet support for changing primary key
//     await t.save(data2)
//     // log(t.db)
//     // expect(t.save(data2)).rejects.toThrow()
//     // expect(t.retrieve(false)).rejects.toThrow()

//     // await t.delete()
// })
