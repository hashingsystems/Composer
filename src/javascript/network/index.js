import KeyPairing from '../models/key-pairing'
import debug from 'debug'

const log = debug('all:network')
/**
 *
 * @module Network
 */

function httpRequest(method, url, data, timeout = 5000) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest()

        xhr.open(method, url)
        xhr.timeout = timeout

        if (data !== undefined && data !== null) {
            if (data.headers) {
                Object.keys(data.headers).forEach(key => {
                    xhr.setRequestHeader(key, obj.headers[key])
                })
            }
        }

        // handling timeout
        xhr.ontimeout = function() {
            log('ontimeout', xhr.status, xhr.statusText)
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            })
        }

        // handling response
        xhr.onload = function() {
            log('onload', xhr.status, xhr.statusText)
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText)
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                })
            }
        }

        // handling error
        xhr.onerror = function() {
            log('onerror', xhr.status, xhr.statusText)
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            })
        }

        // send
        if (data === undefined) {
            xhr.send()
        } else if (data.body === undefined || data.body === null) {
            xhr.send()
        } else {
            xhr.send(data.body)
        }
    })
}

/**
 *
 * @param {Function} callback
 */
function getLocalIPs(callback) {
    let ips = []
    let RTCPeerConnection =
        window.RTCPeerConnection ||
        window.webkitRTCPeerConnection ||
        window.mozRTCPeerConnection

    let pc = new RTCPeerConnection({
        // Don't specify any stun/turn servers, otherwise you will
        // also find your public IP addresses.
        iceServers: []
    })
    // Add a media line, this is needed to activate candidate gathering.
    pc.createDataChannel('')

    // onicecandidate is triggered whenever a candidate has been found.
    pc.onicecandidate = function(e) {
        if (!e.candidate) {
            // Candidate gathering completed.
            pc.close()
            callback(ips)
            return
        }
        let ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1]
        if (ips.indexOf(ip) == -1)
            // avoid duplicate entries (tcp/udp)
            ips.push(ip)
    }
    pc.createOffer(
        function(sdp) {
            pc.setLocalDescription(sdp)
        },
        function onerror() {}
    )
}

/**
 *
 * getAccountDetailsFromMobile receives the truncated pinInput before piecing it back into an IP address
 * @param {string} pinInput
 * @returns {external:Promise}
 * @fulfil {String}
 * @reject {Error}
 */
async function getAccountDetailsFromMobile(pinInput) {
    log('pinInput is', pinInput)

    let address = await mobileNetwork(pinInput)
    console.log('fake', address, pinInput)
    try {
        log('Making GET call to', address)
        let response = await httpRequest('GET', address)
        console.log('fake response', response)
        log('RESPONSE', response)
        let jsonData = JSON.parse(response)
        return jsonData
    } catch (e) {
        log('ERROR', e)
        if (e instanceof SyntaxError) {
            e.message = 'JSON Syntax Error'
        }
        if (e.status === 0) e.message = 'Network error or wrong activation code'
        throw e
    }
}

/**
 * mobileNetwork accepts a pin input.
 * It throws an error or returns a proper address string.
 * @param {string} pinInput
 * @returns {Error | string}
 */
async function mobileNetwork(pinInput) {
    let address
    let pinInputArr
    try {
        pinInputArr = pinInput.split('.')
    } catch (e) {
        throw new Error('Invalid pin')
    }

    if (pinInput.match(/[:]/)) {
        log('type is ipv6', pinInput)
        address = `http://[${pinInput}]:8080` // ipv6 has to be places within square brackets
    } else {
        let ip = await new KeyPairing().getLocalIPAddr()
        log('localIPAddr is', ip)
        let ipArr = ip.split('.')
        switch (pinInputArr.length) {
            case 1:
                address = `http://${ipArr[0]}.${ipArr[1]}.${
                    ipArr[2]
                }.${pinInput}:8080`
                break
            case 2:
                address = `http://${ipArr[0]}.${ipArr[1]}.${pinInputArr[0]}.${
                    pinInputArr[1]
                }:8080`
                break
            case 3:
                address = `http://${ipArr[0]}.${pinInputArr[0]}.${
                    pinInputArr[1]
                }.${pinInputArr[2]}:8080`
                break
            case 4:
                address = `http://${pinInput}:8080`
                break
            default:
                log('Too many octets')
        }
        log('The address we will call is', address)
    }
    return address
}

export { httpRequest, getLocalIPs, getAccountDetailsFromMobile, mobileNetwork }
