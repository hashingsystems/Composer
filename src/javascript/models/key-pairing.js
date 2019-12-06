import AbstractLocalStorage from './abstract-local-storage'

/**
 * @module KeyManagement
 */

/**
 * KeyPairing class sets the temporaryKey and the current localIPAddr user's mobile and computer network should be connected to.
 * @extends AbstractLocalStorage
 * @example
 * let keyPairing = new KeyPairing()
 * await keyPairing.setTemporaryKeyAndLocalIP(temporaryKey, localIPAddr)
 */
class KeyPairing extends AbstractLocalStorage {
    /**
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * 
     * @param {string} temporaryKey 
     * @param {string} localIPAddr 
     */
    async setTemporaryKeyAndLocalIP(temporaryKey, localIPAddr) {
        await this.setItem({
            temporaryKey,
            localIPAddr
        })
    }

    /**
     * getLocalIPAddr
     */
    async getLocalIPAddr() {
        return await this.getItem('localIPAddr')
    }

    /**
     * getTemporaryKey
     */
    async getTemporaryKey() {
        return await this.getItem('temporaryKey')
    }
}

export default KeyPairing