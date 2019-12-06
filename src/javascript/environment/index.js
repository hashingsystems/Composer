import { AccountManager } from '../models/index.js'
import debug from 'debug'

/**
 * Sets up development environment from .env given currentDebugScope and,
 * optionally, whether to set the current test account to local storage or not.
 * This function is used only during development
 * @param {string} currentDebugScope
 * @param {boolean} setTestAccount
 * @returns {function log(string)}
 */
const setDevEnvironment = async (currentDebugScope, setTestAccount) => {
    // set debug scope for debug library
    let debugScope = process.env.DEBUG_SCOPE

    if (debugScope !== undefined) {
        localStorage.setItem('debug', debugScope)
    }

    if (setTestAccount === true && ENV_NAME === 'development') {
        let testaccount = {
            accountID: process.env.TEST_ACCOUNTID,
            publicKey: process.env.TEST_PUBLICKEY,
            privateKey: process.env.TEST_PRIVATEKEY
        }

        if (
            testaccount.accountID !== undefined &&
            testaccount.publicKey !== undefined &&
            testaccount.privateKey !== undefined
        ) {
            let am = await new AccountManager().init()
            await am.setCurrentAccount(testaccount)
        }
    }

    if (ENV_NAME === 'development' || ENV_NAME === 'staging') {
        if (currentDebugScope !== undefined) {
            const log = debug(currentDebugScope)
            log(log.namespace) // namespace equates to current debug scope
            return log
        }
    }

    const log = function(str) {} // a do nothing log function is used in production
    return log
}

export default setDevEnvironment
