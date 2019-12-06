import {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage
} from './db'

/**
 * module decription
 * @module AbstractLocalStorage
 */
class AbstractLocalStorage {

    /**
     * 
     * setItem sets the value of the key into LocalStorage.
     * This can be overridden with localStorage.setItem for tests.
     * @param {Object} obj 
     */
    async setItem(obj) {
        await setLocalStorage(obj)
    }

    /**
     * 
     * getItem gets the value given the keyname from LocalStorage.
     * This can be overridden with localStorage.getItem for tests.
     * @param {*} key 
     */
    async getItem(key) {
        return await getLocalStorage(key)
    }

    /**
     * 
     * removeItem removes the value given the keyname from LocalStorage
     * @param {*} key 
     */
    async removeItem(key) {
        await removeLocalStorage(key)
    }
}

export default AbstractLocalStorage