import qrcode from 'qrcode-generator'

/**
 * 
 * @module UI-Utils
 */

/**
 * createImage
 * @param {string} payload
 * 
 */
function createImage(payload) {
    let maxWindowHeight = 600
    let maxQrcodeHeight = maxWindowHeight - 380 // Reserve "some" space for UI
    let qrLevels = ['L', 'M']
    let qrModulesByVersion = {
        1: 21,
        2: 25,
        3: 29,
        4: 33,
        5: 37,
        6: 41,
        7: 45,
        8: 49,
        9: 53,
        10: 57
    }
    let qrMargin = 4
    for (let levelIndex in qrLevels) {
        for (let typeNum = 8; typeNum <= 10; typeNum++) {
            let qr_cellsize = Math.floor(
                maxQrcodeHeight / qrModulesByVersion[typeNum]
            )
            try {
                let qr = qrcode(typeNum, qrLevels[levelIndex])
                qr.addData(payload)
                qr.make()
                return qr.createImgTag(qr_cellsize, qrMargin)
            } catch (e) {
                if (strStartsWith(e.message, 'code length overflow')) {
                    // ignore and try to use bigger QR code format
                } else {
                    throw e
                }
            }
        }
    }
}

/**
 * updateImage
 * @param {string} key 
 * @param {string} ip 
 * @param {Document} document 
 */
function updateImage(key, ip, document) {
    let payload = key + '\n' + ip
    document.getElementById('qrcode').innerHTML =
        createImage(payload) || 'Error. key too long'
}

export {
    createImage,
    updateImage
}