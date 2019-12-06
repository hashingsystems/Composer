import debug from 'debug'
import Emitter from 'component-emitter'

const log = debug('msocket.io:client')
const emitFn = Emitter.prototype.emit

class MSocketClient extends Emitter {
    /**
     * A mocking class for the socket.io client
     *
     */
    constructor(msocket) {
        super()
        this._msocket = msocket
    }

    /**
     * Emit an event to the server client
     * @param  {string}   eventKey -- The event key that needs to be attached
     * @param  {object}   payload  -- The payload that needs to be attached to the emit
     * @param  {function} in_callback
     */
    emit(eventKey, payload, cb) {
        const callback = cb || function() {}
        log('MSocketClient', 'emit', eventKey)
        callback(this._msocket.emitEvent(eventKey, payload))
    }

    /**
     * Fire an event to the server
     * @param  {string}   eventKey -- The event key that needs to be attached
     * @param  {object}   payload -- The payload that needs to be attached to the emit
     * @param  {Function} callback
     */
    fireEvent(eventKey, payload) {
        log('Payload %s', eventKey, JSON.stringify(payload))
        emitFn.call(this, eventKey, payload)
    }
}

export default MSocketClient
