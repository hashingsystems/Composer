import Dexie from 'dexie'
import NetworkManager from './network-manager'
import {
    tinyBarsToDollarsUnit
} from '../hedera/currency'
import {
    migrations
} from './migrations'

const migrationFuncList = migrations()

/**
 * @module Transactions
 */

/**
 * Transactions class manages user's recent transactions backed by indexed-db (via Dexie library)
 */
class Transactions {
    /**
     * @constructor
     */
    constructor() {}
    /**
     *
     * @param {string} accountID is a string, denoted as "0.0.1000" (shardNum.realmNum.accountNum); or
     * @param {Object} options has versionNumber key and databaseName key
     * @example
     * let txs = await new Transactions().init('0.0.1000')
     */
    async init(accountID, options = {}) {
        let versionNumber = options.versionNumber
        let databaseName = options.databaseName
        this.accountID = accountID
        let nm = await new NetworkManager().init()
        let currentNetwork = await nm.getCurrentNetwork()
        if (databaseName) {
            this.databaseName = databaseName
        } else {
            this.databaseName = `micropayment_${currentNetwork}`
        }
        this.db = await this.setup(this.databaseName, versionNumber)
        return this
    }

    /**
     * @param {string} databaseName
     * @param {number} versionNumber
     */
    async setup(databaseName, versionNumber) {
        let db = new Dexie(databaseName)
        if (versionNumber === undefined)
            versionNumber = migrationFuncList.length
        return await this._migrate(db, versionNumber)
    }

    async _migrate(db, versionNumber) {
        // we already have a list of migrations
        for (let i = 0; i < versionNumber; i++) {
            let m = migrationFuncList[i]
            db = m(db)
            // bump indexed-db migration version
            this._version = db.verno
        }
        return db
    }

    /**
     * saves micropayment transaction data.
     * data comprises these keys: accountID (required), host, path, amount, created, transactionId (required) and receipt (boolean).
     * @param {*} data
     * @example
     * let txs = await new Transactions().init(accountID)
     * txs.save(data)
     */
    async save(data) {
        if (this._version === 1) {
            await this.db['transactions'].put({
                id: data.id,
                accountID: this.accountID,
                host: data.host,
                path: data.path,
                amount: data.amount,
                created: data.created,
                type: 'crypto-transfer'
            })
        } else {
            if (data.receipt === undefined) data.receipt = false
            if (this.db['transactions'] === undefined) return
            await this.db['transactions'].put({
                transactionId: data.transactionId,
                accountID: this.accountID,
                host: data.host,
                path: data.path,
                amount: data.amount,
                created: data.created,
                receipt: data.receipt,
                type: 'crypto-transfer'
            })
        }
    }

    async saveSmartContractDetails(data) {
        data.accountID = this.accountID;
        data.created = new Date();
        data.host = data.host || ""
        data.path = data.path || ""
        data.amount = data.amount || 0
        data.type = 'smart-contract-call'
        if (this._version === 1) {
            await this.db['transactions'].put(data)
        } else {
            if (data.receipt === undefined) data.receipt = false
            if (this.db['transactions'] === undefined) return
            await this.db['transactions'].put(data)
        }
    }

    async getByPrimaryKey(transactionId) {
        return await this.db['transactions'].get(transactionId)
    }

    /**
     * retrieves micropayment transaction data
     * @param {boolean} formatting - by default, the returned recent transactions will be formatted
     * @returns {Array} list of recent transaction objects
     *
     * @example
     * let t = await new Transactions().init(accountID)
     * let transactionList = await t.retrieve()
     */
    async retrieve(formatting = true) {
        let result, final
        console.log("this.db['transactions'] ::", this.db['transactions']);
        if (this.db['transactions'] === undefined) return []

        if (this._version === 1) {
            console.log("VERSION 1 ::::", this.accountID)
            result = await this.db['transactions']
                .where('accountID')
                .equals(this.accountID)
                .toArray()
            if (result.length > 0) {
                // .slice(Math.max(result.length - 10, 0))
                final = result.reverse()
                return formatting ? this.getTheTimeStamp(final) : final
            }
        } else {
            console.log("VERSION 2 ::::", this.db.transactions)
            result = await this.db.transactions.orderBy('created').toArray();
            if (result.length > 0) {
                // .slice(Math.max(result.length - 10, 0))
                final = result.reverse() // 'created'
                return formatting ? this.getTheTimeStamp(final) : final
            }
        }
        return formatting ? this.getTheTimeStamp(result) : final
    }

    /**
     * getTheTimeStamp returns the transformed data to render in UI of recent-transactions.
     * ie. truncated hostname, tinyBars into dollars, timestamp into a string format
     * @param {*} result
     * @returns {Array} list of recent transaction objects
     */
    getTheTimeStamp(result) {
        let newResult = result.map(a => Object.assign({}, a))
        newResult.forEach(function (v, i) {
            // host
            if (newResult[i].host.length >= 15) {
                let host = new URL(newResult[i].host)
                let hostname = host.hostname
                let truncated = hostname.slice(0, 14)
                if (truncated.length !== hostname.length) {
                    // truncate
                    newResult[i].host = truncated + '...'
                } else {
                    // do not truncate, but we do not want to show the protocol
                    newResult[i].host = hostname
                }
            }

            // amount
            let tinyConvertToDollars = tinyBarsToDollarsUnit(v.amount)
            newResult[i].amount = `$ ${tinyConvertToDollars}`

            // created
            let timestampToGMTDateView = new Date(v.created).toString()
            let dateTimeView = timestampToGMTDateView.split('GMT')
            newResult[i].created = dateTimeView[0]
        })
        return newResult
    }

    async delete() {
        this.db.close()
        await Dexie.delete(this.databaseName)
    }
}

export default Transactions