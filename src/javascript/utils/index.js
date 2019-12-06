/**
 * @module Utils
 */

/**
 * Checks if value is an integer.
 * @param {*} value 
 */
function isInt(value) {
    return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
    )
}

/**
 * Checks if value is undefined
 * @param {*} value 
 */
function isUndefined(value) {
    return typeof value === 'undefined'
}
/**
 * @deprecated
 * @param {*} callback 
 * @param {*} delay 
 */
function throttle(callback, delay) {
    let isThrottled = false,
        args,
        context

    function wrapper() {
        if (isThrottled) {
            args = arguments
            context = this
            return
        }

        isThrottled = true
        callback.apply(this, arguments)

        setTimeout(() => {
            isThrottled = false
            if (args) {
                wrapper.apply(context, args)
                args = context = null
            }
        }, delay)
    }

    return wrapper
}

export {
    isInt,
    isUndefined,
    throttle
}