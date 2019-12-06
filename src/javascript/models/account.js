import { tinyBarsToDollarsUnit, tinyBarsToHBarsCurr } from '../hedera/currency'
import AbstractLocalStorage from './abstract-local-storage'
import NetworkManager from './network-manager'
import debug from 'debug'
import { isNullOrUndefined } from 'util'

const log = debug('app:models')

/**
 * @module Account
 */

/**
 * Account is a simple class to manage user's account details easily backed by Local Storage.
 */
class Account extends AbstractLocalStorage {
    constructor() {
        super()
    }

    /**
     * Constructs a new Account
     * @param {string|Object} - acc is either an
     * accountID, a string, denoted as "0.0.1000" (shardNum.realmNum.accountNum); or
     * accountDetails, containing accountID, privateKey, publicKey, accountIndex, accountLabel.
     * @example
     * let a = await new Account().init(acc)
     */
    async init(acc) {
        if (this._validate(acc) === false) return undefined
        if (typeof acc === 'string') await this._isString(acc)
        if (typeof acc === 'object') await this._isObject(acc)
        // define a dynamic property name based on the current network and the accountID string
        Object.defineProperty(this, this.name, {
            value: this.details,
            writable: true
        })
        let details = await this.getDetails()
        if (details === undefined) {
            await this.setDetails(this.details)
        } else {
            this.details = details
            this.keypair = {
                privateKey: details.privateKey,
                publicKey: details.publicKey
            }
        }
        return this
    }

    /**
     *
     * setDetails sets the accountDetails of an account which contains accountID, privateKey, publicKey, accountIndex, accountLabel
     * @param {Object} details
     * @example
     * let a = await new Account().init('0.0.1000')
     * let details = await a.setDetails(config.accountDetails)
     */
    async setDetails(details) {
        if (details === undefined) return
        if (this.accountID !== details.accountID) {
            let e = new Error('Mismatched this.accountID and details accountID')
            throw e
        }
        let accountID = this.accountID
        this[accountID] = details
        let detailsString = JSON.stringify(details)
        await this.setItem({
            [accountID]: detailsString
        })
    }

    /**
     * getDetails returns the accountDetails of the requested accountID
     * @example
     * let a = await new Account().init('0.0.1000')
     * let details = await a.getDetails()
     */
    async getDetails() {
        // defensive coding
        if (this.accountID === undefined) return undefined
        // actual logic that matters
        let detailsString = await this.getItem(this.accountID)
        if (detailsString === undefined || detailsString === null) {
            return undefined
        }
        let details = JSON.parse(detailsString)
        return details
    }

    /**
     *
     * setBalance sets the account balance in terms of tinyBars
     * @param {number} balance
     * @example
     * let a = await new Account().init('0.0.1001')
     * await a.setBalance(415000)
     */
    async setBalance(balance) {
        this.details = await this.getDetails()
        log('1111111 setBalance', this.details)

        this.details.balance = balance
        log('2222222 setBalance', balance)
        await this.setDetails(this.details)
    }

    /**
     *
     * getBalance returns the balance of an account in different units of measure, ie, tinyBars, hBars, USD
     * @example
     * let a = await new Account().init('0.0.1000')
     * let all = await a.getBalance()
     * log('USD', all.USD)
     * log('HBars', all.hBars)
     */
    async getBalance() {
        let formatter
        let tinyBars = 0
        let hBars = 0
        let USD = '$0'
        this.details = await this.getDetails()
        let balance = this.details.balance
        if (balance === undefined) {
            return { tinyBars, hBars, USD }
        }

        log('Balance', balance)
        tinyBars = balance

        switch (true) {
            case balance < 0:
                tinyBars = undefined
                hBars = undefined
                USD = undefined
                log('less than 0 tinybars, USD is ', USD)
                break
            case balance == 0:
                log('equals to 0 tinybars, USD is ', USD)
                break
            case balance < 100: // less than 0.000000999 USD
                hBars = tinyBarsToHBarsCurr(balance, 8)
                USD = `$${tinyBarsToDollarsUnit(balance).toFixed(10)}`
                log('less than 0.000000999 USD, USD is ', USD)
                break
            case balance < 83325: // less than 0.0000999 USD
                hBars = tinyBarsToHBarsCurr(balance, 8)
                USD = `$${tinyBarsToDollarsUnit(balance).toFixed(9)}`
                break
            case balance < 8333325: // less than 0.00999 USD
                hBars = tinyBarsToHBarsCurr(balance, 8)
                USD = `$${tinyBarsToDollarsUnit(balance).toFixed(8)}`
                break
            case balance < 833333325: // less than 0.9999 USD
                hBars = tinyBarsToHBarsCurr(balance, 6)
                USD = `$${tinyBarsToDollarsUnit(balance).toFixed(8)}`
                break
            case balance == 99999999999: // equals to 120 USD
                hBars = tinyBarsToHBarsCurr(balance, 8)
                USD = `$${tinyBarsToDollarsUnit(balance).toFixed(0)}`
                break
            case balance < 833333333325: // less than 999.9999 USD
                hBars = tinyBarsToHBarsCurr(balance, 8)
                USD = `$${tinyBarsToDollarsUnit(balance).toFixed(3)}`
                break
            case balance < 83333333333325: // less than 99,999.9999 USD
                formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 3
                })
                hBars = tinyBarsToHBarsCurr(balance, 8)
                USD = formatter.format(
                    tinyBarsToDollarsUnit(balance).toFixed(8)
                )
                break
            default:
                formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                })
                hBars = tinyBarsToHBarsCurr(balance, 8)
                USD = formatter.format(
                    tinyBarsToDollarsUnit(balance).toFixed(8)
                )
                log('more than 99,999.9999USD', USD)
                break
        }

        return { tinyBars, hBars, USD }
    }

    /**
     *
     * @typicalname _
     * @param {string|Object} acc
     * acc is either
     * accountID, a string, denoted as "0.0.1000" (shardNum.realmNum.accountNum); or
     * accountDetails, containing accountID, privateKey, publicKey, accountIndex, accountLabel.
     */
    async _isString(acc) {
        let currentNetwork = await this._currentNetwork()
        this.accountID = acc
        this.details = {
            accountID: acc,
            privateKey: undefined,
            publicKey: undefined,
            accountIndex: undefined,
            accountLabel: undefined,
            balance: undefined
        }
        this.name = `${currentNetwork},${this.accountID}`
    }

    /**
     *
     * @typicalname _
     * @param {string|Object} acc
     * acc is either
     * accountID, a string, denoted as "0.0.1000" (shardNum.realmNum.accountNum); or
     * accountDetails, containing accountID, privateKey, publicKey, accountIndex, accountLabel.
     */
    async _isObject(acc) {
        let currentNetwork = await this._currentNetwork()
        this.accountID = acc.accountID
        this.details = {
            accountID: acc.accountID,
            privateKey: acc.privateKey,
            publicKey: acc.publicKey,
            accountIndex: acc.accountIndex,
            accountLabel: acc.accountLabel,
            balance: acc.balance
        }
        this.name = `${currentNetwork},${this.accountID}`
    }

    /**
     *
     *
     * @typicalname _
     */
    async _currentNetwork() {
        let nm = await new NetworkManager().init()
        let currentNetwork = await nm.getCurrentNetwork()
        return currentNetwork
    }

    /**
     *
     * @typicalname _
     * @param {string} accountIDString
     */
    _validateAccountIDStr(accountIDString) {
        let accountIDArray = accountIDString.split('.').map(Number)
        if (accountIDArray.length !== 3) return false
        return true
    }

    /**
     *
     * @typicalname _
     * @param {string|Object} acc
     * acc is either
     * accountID, a string, denoted as "0.0.1000" (shardNum.realmNum.accountNum); or
     * accountDetails, containing accountID, privateKey, publicKey, accountIndex, accountLabel.
     */
    _validate(acc) {
        if (isNullOrUndefined(acc)) return false
        if (typeof acc === 'string') {
            return this._validateAccountIDStr(acc)
        }
        if (typeof acc === 'object') {
            let accountIDStr = acc.accountID
            let accountIDStrValidation = this._validateAccountIDStr(
                accountIDStr
            )
            if (accountIDStrValidation === false) return false
            return true
        }
        return false
    }
}

export default Account
