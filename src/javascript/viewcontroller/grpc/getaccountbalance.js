import Hedera from '../../hedera'
import { AccountManager } from '../../models'
import io from 'socket.io-client'
import { buttonState } from '../../ui-utils/buttons'
import { enumKeyByValue } from '../../hedera/utils'
import { Query } from '../../../pbweb/Query_pb'
import errorHandler from './errorhandler'
import { popupSetAndSegue, alertNotification } from '../../ui-utils'
import address from '../../hedera/address'
import debug from 'debug'

const log = debug('all:viewcontroller:grpc:getaccountbalance')
/**
 *
 * @module gRPC
 */

/**
 * @const {} enum from Hedera Query
 */
const Q = Query.QueryCase
/**
 * @const {string} CRYPTOGETACCOUNTBALANCE string generated using @see enumKeyByValue
 */
const CRYPTOGETACCOUNTBALANCE = enumKeyByValue(Q, Q.CRYPTOGETACCOUNTBALANCE)

/**
 *
 * getAccountBalanceController handles all cryptoGetAccountBalance calls to Hedera using socket.io.
 * The account balance in local storage used throughout our application is in tinybars unit of measure.
 * given accountDetails, update the local storage and UI.
 * save is an optional parameter which will set the accountDetails to local storage upfront AND segue to account-overview.html.
 * @param {*} accountDetails
 * @param {*} initial
 */
export async function getAccountBalanceController(accountDetails, initial = false) {
    log('getAccountBalanceController')
    if (initial) {
        log('initial', initial)
        let am = await new AccountManager().init()
        await am.setCurrentAccount(accountDetails)
    }
    log(
        'getAccountBalanceController',
        accountDetails.accountID,
        accountDetails.publicKey
    )

    // pass our account details to hedera client
    let accountString = accountDetails.accountID
    let keypair = {
        publicKey: accountDetails.publicKey,
        privateKey: accountDetails.privateKey
    }

    // With accountDetails, prepare hedera gPRC transaction object for a given node address and node account
    // let randomNode = i.randNodeAddr(nodeAddresses)
    const { nodeAccount, nodeAddress } = address.getRandomNode()
    const hedera = new Hedera.Client(nodeAddress, nodeAccount)
    let client = hedera.withOperator(keypair, accountString).connect()
    let req = client.getAccountBalance(accountString).prepare()

    // UI
    let button = document.getElementById('getAccountBalanceButton')

    // connect to payment server and pass the request, and get a response
    const socket = io.connect(PAYMENT_SERVER)

    socket.on('connect', function () {
        socket.binary(true).emit(CRYPTOGETACCOUNTBALANCE, req.data)

        socket.on(`${CRYPTOGETACCOUNTBALANCE}_RESPONSE`, async function (res) {
            log('res', res)

            try {
                errorHandler(res)
                let am = await new AccountManager().init()
                await am.setCurrentAccountBalance(res.balance)
                buttonState(button)
                await updateAccountOverview(am)
                if (initial) {
                    log('SUCCESS, now segue')
                    popupSetAndSegue('account-overview.html')
                }
            } catch (e) {
                log(e)
                log(e.message)
                let alertObj = {
                    alertString: e.message,
                    elem: button,
                    cb: buttonState
                }
                await alertNotification(alertObj)

            }
            socket.disconnect()
        })
    })
}

export async function getAccountBalance(accountDetails, initial = false, callback) {
    if (initial) {
        log('initial', initial)
        let am = await new AccountManager().init()
        await am.setCurrentAccount(accountDetails)
    }
    log(
        'getAccountBalanceController',
        accountDetails.accountID,
        accountDetails.publicKey
    )

    // pass our account details to hedera client
    let accountString = accountDetails.accountID
    let keypair = {
        publicKey: accountDetails.publicKey,
        privateKey: accountDetails.privateKey
    }

    // With accountDetails, prepare hedera gPRC transaction object for a given node address and node account
    // let randomNode = i.randNodeAddr(nodeAddresses)
    const { nodeAccount, nodeAddress } = address.getRandomNode()
    const hedera = new Hedera.Client(nodeAddress, nodeAccount)
    let client = hedera.withOperator(keypair, accountString).connect()
    let req = client.getAccountBalance(accountString).prepare()

    // connect to payment server and pass the request, and get a response
    const socket = io.connect(PAYMENT_SERVER)

    socket.on('connect', function () {
        socket.binary(true).emit(CRYPTOGETACCOUNTBALANCE, req.data)

        socket.on(`${CRYPTOGETACCOUNTBALANCE}_RESPONSE`, async function (res) {
            log('res', res)

            try {
                errorHandler(res)
                let am = await new AccountManager().init()
                await am.setCurrentAccountBalance(res.balance)
                if (callback) {
                    callback(null, res.balance);
                }
            } catch (e) {
                log(e)
                log(e.message)
                if (callback) {
                    callback(e.message, null);
                }
            }
            socket.disconnect()
        })
    })
}

/**
 *
 * updateAccountOverview updates the UI view once balance is returned from Hedera network
 * @param {Object} accountManager @see AccountManager
 * @example
 * let am = await new AccountManager().init()
 * await updateAccountOverview(am)
 */
async function updateAccountOverview(accountManager) {
    log('Updating account-overview view')
    let currentBalanceDollars = document.getElementById('currentBalanceDollars')
    log('Updating account-overview view1111', currentBalanceDollars)

    let currentBalanceHBars = document.getElementById('currentBalanceHBars')
    log('Updating account-overview view22222', currentBalanceHBars)

    if (currentBalanceDollars && currentBalanceHBars) {
        let a = await accountManager.getCurrentAccountObject()
        let all = await a.getBalance()
        log('Updating account-overview view33333', currentBalanceHBars)
        log('USD', all.USD)
        log('HBars', all.hBars)
        currentBalanceDollars.innerHTML = all.USD
        log(
            'Updating account-overview view44444',
            currentBalanceDollars.innerHTML
        )

        currentBalanceHBars.innerHTML = all.hBars
        log(
            'Updating account-overview view555555',
            currentBalanceHBars.innerHTML
        )
    }
}

// export default getAccountBalance
