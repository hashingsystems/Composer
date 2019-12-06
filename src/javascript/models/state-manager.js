import { HostRule } from '.'
import k from './constants'
import isNode from 'detect-node'
import url from 'url'
import i from '../hedera/internal'
import debug from 'debug'

localStorage.debug = 'all:*'
const log = debug('all:state-manager')

/**
 * @module StateManager
 */

/**
 * @const errMsgURL error string
 */
const errMsgURL = 'Provide a URL object'

/**
 *
 * StateManager
 */
class StateManager {
    /**
     * @constructor
     */
    constructor() { }
    // url must be a URL object
    // tag refers to the Hedera micropayment tag object
    /**
     *
     * @param {URL} url
     * @param {Object} tag
     * @example
     * let url = new URL('https://hedera.com')
     * let response = {}
     * let sm = await new StateManager().init(url,response)
     */
    async init(url, tag) {
        log('init')
        this._throw(url, errMsgURL)
        log('init logic execution')
        this.url = url
        let hostRule = await new HostRule().init(url.origin)
        let name = hostRule._name
        let statusRule = await hostRule.getOrSetStatusRule()
        // 4 key attributes for us to make state decisions
        this.status = statusRule.status // status
        this.rule = statusRule[name] // preference
        this.computedLimit = await hostRule.getCurrentComputedLimit() // currThr
        this.tag = tag // micropayment tag
        // default redirect urls
        this.redirect = {
            nonPayingAccount: '/non-paying-account',
            noAccount: '/no-account',
            homePage: '/'
        }
        if (this.tag !== undefined && this.tag !== null) {
            if (this.tag.redirect !== undefined) {
                // if publisher's micropayment tag has custom redirect url paths specified,
                // use them instead
                this.redirect = this.tag.redirect
            }
        }
        log('init logic execution completed', this)
        return this
    }

    /**
     *
     * getState saves the extension's icon state and user's preference state
     * Icon State are
     * 0 for light grey (this website does not have hedera-micropayment tag)
     * 1 for dark grey (this website has hedera-micropayment tag, but user has not set preference)
     * 2 for green (user agrees to pay)
     * 3 for red (user does not agree to pay)
     * @example
     * let sm = await new StateManager().init(url, response)
     * let state = sm.getState()
     *
     */
    getState() {
        log('getState', this.tag)
        // web pages that do not suppoort hedera-micropayment
        if (this.tag === null || this.tag === undefined)
            return {
                icon: k.ICON_STATE.GREY
            }
        // web pages that support hedera-micropayment
        switch (this.rule.preference) {
            case k.PREF.YES_ONCE.toString():
                log('YES_ONCE')
                return null
            case k.PREF.YES_ALWAYS.toString():
                log('YES_ALWAYS')
                return this.getStateForYesAlways()
            case k.PREF.NO_ONCE.toString():
                log('NO_ONCE')
                return null
            case k.PREF.NO_ALWAYS.toString():
                log('NO_ALWAYS')
                return this.getStateForNoAlways()
            case k.PREF.NOT_SET.toString():
            default:
                log('NOT_SET')
                return this.getStateForNotSet()
        }
    }

    getStateForNotSet() {
        // homepage
        let state = {
            icon: k.ICON_STATE.GREY,
            banner: true,
            msg: null
        }
        let currThr = this.computedLimit
        let requestedPayment = i.getSumOfTransfer(this.tag.recipientList)
        let urlPath = this.url.pathname
        let response = this.tag
        let url = this.url
        if (this.tag.type === 'maximum') {
            if (currThr < requestedPayment) {
                state.icon = k.ICON_STATE.BLACK
                state.banner = true
                state.msg = {
                    type: 'raise-threshold',
                    currThr,
                    requestedPayment
                }
                return state
            } else {
                state.icon = k.ICON_STATE.GREEN
                state.banner = false
                return state
            }
        }
        // other pages
        if (
            currThr < requestedPayment &&
            urlPath !== this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.BLACK,
                banner: true,
                msg: {
                    type: 'redirect',
                    currThr,
                    requestedPayment,
                    redirect: this.redirect.nonPayingAccount
                }
            }
            return state
        }
        if (
            currThr >= requestedPayment &&
            urlPath !== this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.GREEN,
                banner: false,
                msg: {
                    type: 'crypto-transfer',
                    response,
                    url
                }
            }
            return state
        }
        // non-paying-account page
        if (
            currThr < requestedPayment &&
            urlPath === this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.BLACK,
                banner: true,
                msg: {
                    type: 'raise-threshold',
                    currThr,
                    requestedPayment
                }
            }
            return state
        }
        if (
            currThr >= requestedPayment &&
            urlPath === this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.GREEN,
                banner: false,
                msg: {
                    type: 'redirect-homepage',
                    currThr,
                    requestedPayment,
                    redirect: this.redirect.home
                }
            }
            return state
        }
        // default fall through scenario, which does nothing
        return {
            icon: k.ICON_STATE.BLACK,
            banner: false,
            msg: {
                type: 'default'
            }
        }
    }

    getStateForNoAlways() {
        let state = {
            icon: k.ICON_STATE.RED,
            banner: true,
            msg: null
        }
        let currThr = this.computedLimit
        let requestedPayment = i.getSumOfTransfer(this.tag.recipientList)
        let urlPath = this.url.pathname
        // homepage
        if (this.tag.type === 'maximum') {
            // for currThr < requestedPayment and
            // currThr >= requestPayment, same state
            state.icon = k.ICON_STATE.RED
            state.banner = true
            state.msg = {
                type: 'raise-threshold',
                currThr,
                requestedPayment
            }
            return state
        }
        // other pages
        if (
            currThr < requestedPayment &&
            urlPath !== this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.RED,
                banner: true,
                msg: {
                    type: 'redirect',
                    currThr,
                    requestedPayment,
                    redirect: this.redirect.nonPayingAccount
                }
            }
            return state
        }
        if (
            currThr >= requestedPayment &&
            urlPath !== this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.RED,
                banner: true,
                msg: {
                    type: 'redirect',
                    currThr,
                    requestedPayment,
                    redirect: this.redirect.nonPayingAccount
                }
            }
            return state
        }
        // non-paying-account page
        if (
            currThr < requestedPayment &&
            urlPath === this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.RED,
                banner: true,
                msg: {
                    type: 'raise-threshold',
                    currThr,
                    requestedPayment
                }
            }
            return state
        }

        if (
            currThr >= requestedPayment &&
            urlPath === this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.RED,
                banner: true,
                msg: {
                    type: 'raise-threshold',
                    currThr,
                    requestedPayment
                }
            }
            return state
        }
    }

    getStateForYesAlways() {
        let state = {
            icon: k.ICON_STATE.GREEN,
            banner: true,
            msg: null
        }
        let currThr = this.computedLimit
        let requestedPayment = i.getSumOfTransfer(this.tag.recipientList)
        let urlPath = this.url.pathname
        let response = this.tag
        let url = this.url

        // homepage
        if (this.tag.type === 'maximum') {
            if (currThr < requestedPayment) {
                state.icon = k.ICON_STATE.RED
                state.banner = true
                state.msg = {
                    type: 'raise-threshold',
                    currThr,
                    requestedPayment
                }
                return state
            } else {
                state.icon = k.ICON_STATE.GREEN
                state.banner = false
                return state
            }
        }
        // other pages
        if (
            currThr < requestedPayment &&
            urlPath !== this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.RED,
                banner: true,
                msg: {
                    type: 'redirect',
                    currThr,
                    requestedPayment,
                    redirect: this.redirect.nonPayingAccount
                }
            }
            return state
        }
        if (
            currThr >= requestedPayment &&
            urlPath !== this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.GREEN,
                banner: false,
                msg: {
                    type: 'crypto-transfer',
                    response: response,
                    url: url
                }
            }
            return state
        }
        // non-paying-account page
        if (
            currThr < requestedPayment &&
            urlPath === this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.RED,
                banner: true,
                msg: {
                    type: 'raise-threshold',
                    currThr,
                    requestedPayment
                }
            }
            return state
        }
        if (
            currThr >= requestedPayment &&
            urlPath === this.redirect.nonPayingAccount
        ) {
            state = {
                icon: k.ICON_STATE.GREEN,
                banner: false,
                msg: {
                    type: 'redirect-homepage',
                    redirect: this.redirect.homePage
                }
            }
            return state
        }
    }

    _throw(value, errMsg) {
        log('isNode', isNode)
        if (isNode) {
            if (!(value instanceof url.URL)) {
                let e = new Error(errMsg)
                throw e
            }
        } else {
            if (!(value instanceof URL)) {
                let e = new Error(errMsg)
                throw e
            }
        }
    }
}

export default StateManager
