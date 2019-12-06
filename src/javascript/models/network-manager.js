import AbstractLocalStorage from './abstract-local-storage'
import NetworkSettings from './network-settings'
import { tinyBarsToHBarsCurr, tinyBarsToDollarsUnit } from '../hedera/currency'

/**
 * @module NetworkManager
 */

/**
 * @const errMsg network error message
 */
const errMsg = 'Please init() our network manager instance'

/**
 *
 * NetworkManager class allows user to toggle between mainnet, testnet and devnet.
 * We should never need to access NetworkSettings class directly.
 * @extends AbstractLocalStorage
 * @example
 * let nm = await new NetworkManager().init()
 */
class NetworkManager extends AbstractLocalStorage {
    constructor() {
        super()
    }

    // mainnet refers to the live Hedera mainnet network
    // testnet refers to the live Hedera testnet network
    // devnet refers to a locally running Hedera network for development purpose only
    async init() {
        let env
        try {
            env = ENV_NAME
        } catch (e) {
            if (process !== undefined && process.env !== undefined) {
                env = process.env.NODE_ENV
            } else {
                env = 'test'
            }
        }

        // try retrieving any value
        let curr = await this.getCurrentNetwork()
        if (curr !== undefined && curr !== null) {
            this.currentNetwork = curr
            return this
        }

        // set for the first time based on env
        switch (env) {
            case 'production':
                await this.setCurrentNetwork('mainnet')
                break
            case 'development':
                await this.setCurrentNetwork('devnet')
                break
            case 'test':
                await this.setCurrentNetwork('testnet')
                break
            case 'mock':
                await this.setCurrentNetwork('devnet')
                break
            // staging is default
            case 'staging':
            default:
                await this.setCurrentNetwork('testnet')
        }
        curr = await this.getCurrentNetwork()
        this.currentNetwork = curr
        return this
    }

    /**
     *
     * setCurrentNetwork allows user to set hederaNetwork, which can either be 'testnet' or 'mainnet'.
     * @param {string} hederaNetwork
     *
     */
    async setCurrentNetwork(hederaNetwork) {
        this.currentNetwork = hederaNetwork
        await this.setItem({
            hederaNetwork
        })
    }

    /**
     * getCurrentNetwork
     */
    async getCurrentNetwork() {
        let network = await this.getItem('hederaNetwork')
        return network
    }

    /**
     * getCurrentSetting
     */
    async getCurrentSettings() {
        this._throw(this.currentNetwork, errMsg)
        let ns = new NetworkSettings(this.currentNetwork)
        let settings = await ns.getOrSetSettings()
        return settings
    }

    /**
     *
     * @param {Object} settings
     */
    async setCurrentSettings(settings) {
        this._throw(this.currentNetwork, errMsg)
        let ns = new NetworkSettings(this.currentNetwork)
        await ns.setSettings(settings)
    }

    // always returns a number (specifically integer), measured in tinyBars
    async getCurrentLimit() {
        this._throw(this.currentNetwork, errMsg)
        let settings = await this.getCurrentSettings()
        let limit = parseInt(settings.limit, 10)
        return limit
    }

    // limit is in tinyBars
    async setCurrentLimit(limit) {
        this._throw(this.currentNetwork, errMsg)
        let settings = await this.getCurrentSettings()
        settings.limit = parseInt(limit, 10)
        await this.setCurrentSettings(settings)
    }

    async getCurrentLimitInMultiCurrency() {
        this._throw(this.currentNetwork, errMsg)
        let limit = await this.getCurrentLimit()
        let hBars = tinyBarsToHBarsCurr(limit)
        let USDObj = tinyBarsToDollarsUnit(limit)
        let USDNum = USDObj.toNumber()
        let USDString = `$${USDObj.toFixed(3)}`
        return {
            tinyBars: limit,
            hBars,
            USDString,
            USDNum
        }
    }

    _throw(value, errMsg) {
        if (value === undefined) {
            let e = new Error(errMsg)
            throw e
        }
    }
}

export default NetworkManager
