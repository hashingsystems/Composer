import Emitter from 'component-emitter'
import debug from 'debug'
import MSocketClient from './msocket-client'

const log = debug('msocket.io:client')
const emitFn = Emitter.prototype.emit
const createPayload = function(object) {
    return JSON.parse(JSON.stringify(object))
}

class MSocket extends Emitter {
    constructor() {
        super()
        this.mSocketClient = new MSocketClient(this)
        this.connect
        this.disconnect
        this.reconnect
        this.connect_error
        this.genCallbacks = {}
    }

    /**
     *
     * Emit an event to the server
     * @param {*} eventKey
     * @param {*} payload
     */
    emitEvent(eventKey, payload) {
        log(eventKey)
        log(createPayload(payload))
        emitFn.call(this, eventKey, createPayload(payload))
    }

    /**
     *
     * Registers every event that server sends
     * @param {*} eventKey
     * @param {*} callback
     */
    onEmit(eventKey, callback) {
        this.genCallbacks[eventKey] = callback
    }

    emit(eventKey, payload) {
        this.mSocketClient.fireEvent(eventKey, payload)
    }

    connect() {
        console.log('111 do something here')
    }
    disconnect() {
        console.log('222 do something here')
    }
    reconnect() {
        console.log('333 do something here')
    }
    connect_error() {
        console.log('444 do something here')
    }
}

export default MSocket
