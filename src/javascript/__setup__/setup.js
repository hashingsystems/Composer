import {
    NetworkManager,
    NetworkSettings,
    HostRule,
    Account,
    AccountManager
} from '../models'

import { LocalStorage } from './localstorage-mock'

import dotenv from 'dotenv'
import Dexie from 'dexie'
import mockIndexedDB from 'fake-indexeddb'
import FDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'
import KeyPairing from '../models/key-pairing'
import addressBook from '../hedera/address-book'

const config = dotenv.config().parsed

// mock local storage
if (typeof global._localStorage !== 'undefined') {
    Object.defineProperty(global, '_localStorage', {
        value: new LocalStorage(jest),
        writable: false
    })
} else {
    global.localStorage = new LocalStorage(jest)
}

if (typeof global._sessionStorage !== 'undefined') {
    Object.defineProperty(global, '_sessionStorage', {
        value: new LocalStorage(jest),
        writable: false
    })
} else {
    global.sessionStorage = new LocalStorage(jest)
}

// mock global ADDRESS_BOOK when running tests
global.ADDRESS_BOOK = addressBook['test']['ADDRESS_BOOK']

global.TRANSACTION_FEE = 200000
global.BALANCE_QUERY_FEE = 200000

// mock indexed db on Dexie
Dexie.dependencies.indexedDB = mockIndexedDB
Dexie.dependencies.IDBKeyRange = FDBKeyRange

// mock specific methods to avoid ugly dependency injection code in our tests
NetworkManager.prototype.setItem = localStorage.setItem
NetworkManager.prototype.getItem = localStorage.getItem
NetworkSettings.prototype.setItem = localStorage.setItem
NetworkSettings.prototype.getItem = localStorage.getItem

HostRule.prototype.setItem = localStorage.setItem
HostRule.prototype.getItem = localStorage.getItem

AccountManager.prototype.setItem = localStorage.setItem
AccountManager.prototype.getItem = localStorage.getItem
Account.prototype.setItem = localStorage.setItem
Account.prototype.getItem = localStorage.getItem

KeyPairing.prototype.setItem = localStorage.setItem
KeyPairing.prototype.getItem = localStorage.getItem

const paymentServer = config.TEST_PAYMENTSERVER

const testaccount = {
    accountID: config.TEST_ACCOUNTID,
    publicKey: config.TEST_PUBLICKEY,
    privateKey: config.TEST_PRIVATEKEY,
    solidityAddress: config.TEST_SOLIDITYADDRESS
}

if (
    testaccount.accountID === undefined ||
    testaccount.publicKey === undefined ||
    testaccount.privateKey === undefined ||
    paymentServer === undefined
) {
    global.SKIP_NETWORK_TESTS = true
} else {
    global.SKIP_NETWORK_TESTS = false
}
