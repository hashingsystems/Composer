import { friendlyHederaResponseCodeEnum } from '../../hedera/utils'
import { ResponseCodeEnum } from '../../../pbweb/ResponseCode_pb'
import debug from 'debug'

const log = debug('all:viewcontroller:grpc:errorhandler')

/**
 *
 * @module gRPC
 */

/**
 * errorHandler throws all responses returned by Hedera nodes back to handle the view
 * @param {*} res
 */
function errorHandler(res) {
    log('res', res)
    let response = {
        errorState: false,
        message: null,
        nodePrecheckcode: null
    }
    // FAILURE SCENARIOS: 3 error handling cases
    // socketio problem? res is undefined
    if (res === undefined) {
        log('no response')
        response.errorState = true
        response.message = 'no response'
        throw new Error(response.message)
    }
    // Throw an error when Hedera network is unreachable (gRPC error code)
    if (res.error === 'UNAVAILABLE. Hedera network unreachable.') {
        log('Hedera network unavailable')
        log(typeof res)
        log(res instanceof Promise)
        response.message = 'Hedera network unavailable'
        response.errorState = true
        throw new Error(response.message)
    }
    // Throw an error when nodePrecheckcode is not 0 and is not 11
    let hederaError =
        res.nodePrecheckcode !== ResponseCodeEnum.OK &&
        res.nodePrecheckcode !== ResponseCodeEnum.DUPLICATE_TRANSACTION
    if (hederaError) {
        log(`Hedera nodePrecheckcode ${res.nodePrecheckcode}`)
        response.errorState = true
        log('friendly', friendlyHederaResponseCodeEnum(res.nodePrecheckcode))
        response.message = friendlyHederaResponseCodeEnum(res.nodePrecheckcode)
        response.nodePrecheckcode = res.nodePrecheckcode
        throw new Error(response.message)
    }

    log('NO ERRORS WITH CRYPTOTRANSFER')
    log(res)
    log(response.message)
    // none of the above errors
}

export default errorHandler
