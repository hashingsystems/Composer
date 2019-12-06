import k from './constants'
import { isUndefined } from '../utils'
import AbstractLocalStorage from './abstract-local-storage'
import NetworkManager from './network-manager'
import { tinyBarsToDollarsUnit, tinyBarsToHBarsCurr } from '../hedera/currency'
import debug from 'debug'

const log = debug('all:models:host-rule')

/**
 * @module HostRule
 */

/**
 * @const {string} errMsgHostName network error message
 */
const errMsgHostName = 'Provide host name in init()'

/**
 * HostRule class allows the user to set the rules and limits of a particular host, ie domain.
 * @extends AbstractLocalStorage
 * @example
 * let hostRule = await new HostRule().init(url.origin)
 */
class HostRule extends AbstractLocalStorage {
    /**
     * @constructor
     */
    constructor() {
        super()
        // limit is in terms of tinyBars
        // preference is based on the 3 possible states
        // once keeps track of whether the 'yes-once' and 'no-once' scenario has been used up
        this.defaultRule = {
            limit: k.DEFAULT_LIMIT,
            preference: k.PREF.NOT_SET.toString(),
            once: false
        }
    }

    /**
     *
     * init intializes the object
     * @param {string} hostname
     */
    async init(hostname) {
        this._throw(hostname, errMsgHostName)

        let nm = await new NetworkManager().init()
        let currentNetwork = await nm.getCurrentNetwork()
        let name = currentNetwork + ',' + hostname // name is the currentNetwork + hostname of the domain/website, delimited by comma.
        let rule = this.defaultRule
        // define a dynamic property name based on the host's name and make it accessible for modification
        Object.defineProperty(this, name, {
            value: rule,
            writable: true
        })
        this._name = name
        this.currentNetwork = currentNetwork
        this.hostname = hostname
        return this
    }

    /**
     *
     * setRule sets the host-limit keypair when the user visits a domain.
     * The limit for each domain is set here
     * @param {Object} rule
     * @example
     * let hostRule = await new HostRule().init(url.origin)
     * rule = {limit,preference,once}
     * await hostRule.setRule(rule)
     *
     */
    async setRule(rule) {
        this._throw(this.hostname, errMsgHostName)
        // update our value
        this[this._name] = rule
        this.limit = rule.limit
        let name = this._name
        let ruleString = JSON.stringify(this[this._name])
        log('ruleString', ruleString)
        await this.setItem({
            [name]: ruleString
        })
    }

    /**
     *
     * getRule returns a rule object that contains the host-rule key pair.
     * There are 4 types of rules defined, namely 'new-rule', 'default-rule', 'existing-rule', 'new-host'.
     */
    async getRule() {
        this._throw(this.hostname, errMsgHostName)
        let ruleString = await this.getItem(this._name)
        if (ruleString === undefined || ruleString === null) {
            return undefined
        }
        let rule = JSON.parse(ruleString)
        rule.limit = parseInt(rule.limit, 10)
        this.limit = rule.limit
        return rule
    }

    /**
     *
     * getLimit returns the limit set by user, or if no limit is set, default limit = 0.
     */
    async getLimit() {
        this._throw(this.hostname, errMsgHostName)
        let rule = await this.getRule()
        this.limit = parseInt(rule.limit, 10)
        return this.limit
    }

    /**
     * functionTODO limit cannot be a string|number at the same time :D
     * //@param {} limit
     */
    async setLimit(limit) {
        this._throw(this.hostname, errMsgHostName)
        limit = parseInt(limit, 10) // must be an integer
        let rule = await this.getRule()
        rule.limit = limit
        await this.setRule(rule)
    }

    /**
     *
     * getOrSetStatusRule is the rule's status, given a host(ie. url.origin), and optionally a limit. To be used with @see HostRule
     * It sets a default limit, or if the host exists and its limit is not set to default, sets the limit again given user's input.
     * returns a result to denote whether limit has been set and the current host-limit key pair.
     * There are 4 types of status rules defined, namely 'new-rule', 'default-rule', 'existing-rule', 'new-host'.
     * @param {Object=} rule
     * @example
     * let hostRule = await new HostRule().init(url.origin)
     * let statusRule = await hostRule.getOrSetStatusRule()
     */
    async getOrSetStatusRule(rule) {
        this._throw(this.hostname, errMsgHostName)

        let name = this._name

        // getter
        let currentRule = await this.getRule()

        if (rule !== undefined && currentRule !== undefined) {
            await this.setRule(rule)
            this.limit = parseInt(rule.limit, 10)
            return {
                status: 'new-rule',
                [name]: rule
            }
        }

        // This is needed to ensure correct behaviour
        if (rule !== undefined && isUndefined(currentRule)) {
            await this.setRule(rule)
            return {
                status: 'new-rule',
                [name]: rule
            }
        }

        // first call from new host
        if (rule === undefined && currentRule === undefined) {
            // specify default rule for new host, for the first time
            await this.setRule(this.defaultRule)
            this.limit = parseInt(this.defaultRule.limit, 10)
            return {
                status: 'new-host',
                [name]: this.defaultRule
            }
        }

        if (rule === undefined && !isUndefined(currentRule)) {
            let currentRuleStr = JSON.stringify(currentRule)
            let defaultRuleStr = JSON.stringify(this.defaultRule)
            if (currentRuleStr === defaultRuleStr) {
                this.limit = parseInt(currentRule.limit, 10)
                return {
                    status: 'default-rule',
                    [name]: currentRule
                }
            }
            this.limit = parseInt(currentRule.limit, 10)
            return {
                status: 'existing-rule',
                [name]: currentRule
            }
        }
    }

    /**
     *
     * getCurrentLimitInMultiCurrency returns the user's limit of current host in different units of measure, ie, tinyBars, hBars, USD.
     */
    async getCurrentLimitInMultiCurrency() {
        this._throw(this.hostname, errMsgHostName)
        let limit = await this.getLimit()
        log('limit', limit, typeof limit)
        let USDNum = tinyBarsToDollarsUnit(limit)
        let USDString = `$${USDNum}`
        return {
            tinyBars: limit,
            hBars: tinyBarsToHBarsCurr(limit),
            USDString,
            USDNum
        }
    }

    /**
     *
     * getCurrentComputedLimit returns the higher limit between user's global limit and user's specific host limit.
     */
    async getCurrentComputedLimit() {
        this._throw(this.hostname, errMsgHostName)

        // we retrieve this user's global limit in NetworkSettings, via NetworkManager
        let nm = await new NetworkManager().init()
        let globalLimit = await nm.getCurrentLimit()
        log("User's global limit", globalLimit)
        let limit = await this.getLimit()
        log("User's specific limit on this host", limit)
        // whichever is higher, return it
        if (globalLimit > limit) {
            return globalLimit
        } else if (limit > globalLimit) {
            return limit
        }
        // if they are equal, then just return whichever
        return limit
    }

    /**
     *
     * getCurrentComputedLimitInMultiCurrency uses getCurrentComputedLimit and returns the limit in different units of measure, ie, tinyBars, hBars, USD.
     * returns a multi-currency javascript object
     */
    async getCurrentComputedLimitInMultiCurrency() {
        let limit = await this.getCurrentComputedLimit()
        let USDNum = tinyBarsToDollarsUnit(limit)
        let USDString = `$${USDNum}`
        return {
            tinyBars: limit,
            hBars: tinyBarsToHBarsCurr(limit),
            USDString,
            USDNum
        }
    }

    /**
     *
     * enumByValue allows a conversion between strings and enum value
     * @param {string} enumString
     */
    static enumByValue(enumString) {
        return Object.keys(k.PREF).find(
            key => k.PREF[key].toString() === Symbol(enumString).toString()
        )
    }

    /**
     *
     * @typicalname _
     * @param {*} value
     * @param {string} errMsg
     */
    _throw(value, errMsg) {
        if (value === undefined) {
            let e = new Error(errMsg)
            throw e
        }
    }
}

export default HostRule
