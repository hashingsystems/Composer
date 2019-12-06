import AbstractLocalStorage from './abstract-local-storage'

/**
 * @module NetworkSettings
 */

/**
 * @const errMsgNetworkName network error message
 */
const errMsgNetworkName = 'A Hedera network name is required'
/**
 * @const errMsgSettings network error message
 */
const errMsgSettings = 'Settings object is required'

/**
 * NetworkSettings class is a global setting for specific Hedera network in Local Storage
 * @extends AbstractLocalStorage
 */
class NetworkSettings extends AbstractLocalStorage {
    // hederaNetwork is a string and can be 'devnet' or 'testnet' or 'mainnet'
    constructor(hederaNetwork) {
        super()
        this._throw(hederaNetwork, errMsgNetworkName)
        this.network = hederaNetwork
    }

    async getSettings() {
        // simple validation
        this._throw(this.network, errMsgNetworkName)
        // get the settings from local storage
        let settingsString = await this.getItem(this.network)
        if (settingsString === undefined || settingsString === null) return {}
        let settings = JSON.parse(settingsString)
        return settings
    }

    // settings is a key value object
    async setSettings(settings) {
        this._throw(settings, errMsgSettings)
        let settingsString = JSON.stringify(settings)
        await this.setItem({
            [this.network]: settingsString
        })
    }

    async getLimit() {
        this._throw(this.network, errMsgNetworkName)
        let settings = await this.getSettings()
        if (settings === undefined || settings.limit === undefined) return 0
        return parseInt(settings.limit, 10)
    }

    // limit should be a number, unit of measure is tinyBars
    async setLimit(limit) {
        if (isNaN(limit)) {
            let e = new Error('limit must be a number')
            throw e
        }
        let limitInteger = parseInt(limit, 10)
        let settings = await this.getSettings()
        settings.limit = limitInteger
        await this.setSettings(settings)
    }

    // settings is an empty object, set `limit: 0` as the first key value pair
    async getOrSetSettings() {
        let settings = await this.getSettings()
        let settingsKeys = Object.keys(settings)
        if (settingsKeys.length === 0) {
            let defaultSettings = {
                limit: 0
            }
            await this.setSettings(defaultSettings)
            return defaultSettings
        }
        if (settingsKeys.length === 1 && settings[settingsKeys[0]] === null) {
            let defaultSettings = {
                limit: 0
            }
            await this.setSettings(defaultSettings)
            return defaultSettings
        }
        return settings
    }

    _throw(value, errMsg) {
        if (value === undefined) {
            let e = new Error(errMsg)
            throw e
        }
    }
}

export default NetworkSettings