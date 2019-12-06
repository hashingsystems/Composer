import Account from './account'
import AbstractLocalStorage from './abstract-local-storage'
import NetworkManager from './network-manager'

/**
 * @module AccountManager
 */

/**
 * @const {string} errMsgCurrentNetwork network error message
 */
const errMsgCurrentNetwork =
    'A current network is required. Use init() to initalise AccountManager.'

/**
 *
 * AccountManager class allows user to manage multiple accounts by setting the current account that is in-use for a particular Hedera network, ie testnet or mainnet.
 * @example
 * let am = await new AccountManager().init()
 */
class AccountManager extends AbstractLocalStorage {
    /**
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * intialises the network whether mainnet or testnet and returns the associated user account
     */
    async init() {
        let nm = await new NetworkManager().init()
        this.currentNetwork = await nm.getCurrentNetwork()
        this.keyNameCurrent = `${this.currentNetwork},CurrentAccount`
        this.keyNameExisting = `${this.currentNetwork},ExistingAccounts`
        return this
    }

    /**
     *
     * setCurrentAccount
     * @param {string|Object}
     * acc is either
     * accountID, a string, denoted as "0.0.1000" (shardNum.realmNum.accountNum); or
     * accountDetails, containing accountID, privateKey, publicKey, accountIndex, accountLabel
     * @example
     * let am = await new AccountManager().init()
     * am.setCurrentAccount('0.0.1001')
     * am.setCurrentAccount(config.accountDetails)
     */
    async setCurrentAccount(acc) {
        this._throw(this.currentNetwork, errMsgCurrentNetwork)
        let a = await new Account().init(acc)
        if (a === undefined) return undefined
        await this.addToExistingAccounts(a.accountID)
        await this.setItem({
            [this.keyNameCurrent]: a.accountID
        })
    }

    /**
     *
     * getCurrentAccount returns the current account of user
     */
    async getCurrentAccount() {
        this._throw(this.currentNetwork, errMsgCurrentNetwork)
        let currentAccount = await this.getItem(this.keyNameCurrent)
        return currentAccount
    }

    /**
     *
     * removeCurrentAccount removes current account
     */
    async removeCurrentAccount() {
        this._throw(this.currentNetwork, errMsgCurrentNetwork)
        await this.removeItem(this.keyNameCurrent)
    }

    /**
     *
     * setCurrentAccountBalance sets the current account balance in tinyBars
     * @param {number} balance is a number in terms of tinyBars
     */
    async setCurrentAccountBalance(balance) {
        this._throw(this.currentNetwork, errMsgCurrentNetwork)
        let accountID = await this.getCurrentAccount()
        let a = await new Account().init(accountID)
        await a.setBalance(balance)
    }

    /**
     *
     * getCurrentAccountObject returns the account object of the accountID that requested for it.
     * The Account object contains account details. @see Account
     */
    async getCurrentAccountObject() {
        this._throw(this.currentNetwork, errMsgCurrentNetwork)
        let accountID = await this.getCurrentAccount()
        if (accountID === undefined) return undefined
        let a = await new Account().init(accountID)
        return a
    }

    /**
     *
     * addToExistingAccounts saves account into Local Storage with existingAccounts.
     * @param {*} accountID
     */
    async addToExistingAccounts(accountID) {
        this._throw(this.currentNetwork, errMsgCurrentNetwork)
        let set = await this.getExistingAccounts()
        set.add(accountID)
        let setString = JSON.stringify(set)
        await this.setItem({
            [this.keyNameExisting]: setString
        })
    }

    /**
     *
     * getExistingAccounts returns the existing accounts delimited by comma as a Set object.
     */
    async getExistingAccounts() {
        this._throw(this.currentNetwork, errMsgCurrentNetwork)
        // stored as an stringified Array, delimited by comma
        let existingAccounts = await this.getItem(this.keyNameExisting)
        let existingAccountArray = []
        if (existingAccounts) {
            existingAccountArray = existingAccounts.split(',')
        }
        let set = new Set(existingAccountArray)
        return set
    }

    _throw(value, errMsg) {
        if (value === undefined) {
            let e = new Error(errMsg)
            throw e
        }
    }
}

export default AccountManager
