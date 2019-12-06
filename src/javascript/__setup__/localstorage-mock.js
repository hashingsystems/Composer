export class LocalStorage {
    constructor(jest) {
        Object.defineProperty(this, 'getItem', {
            enumerable: false,
            value: jest.fn(key => this[key] || null)
        })
        Object.defineProperty(this, 'setItem', {
            enumerable: false,
            value: jest.fn(obj => {
                let keys = Object.keys(obj)
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i]
                    // not mentioned in the spec, but we must always coerce value to a string
                    let val
                    if (typeof obj[key] === 'symbol') {
                        val = obj[key].toString()
                    } else {
                        val = obj[key] + ''
                    }
                    this[key] = val
                }
            })
        })
        Object.defineProperty(this, 'removeItem', {
            enumerable: false,
            value: jest.fn(key => {
                delete this[key]
            })
        })
        Object.defineProperty(this, 'clear', {
            enumerable: false,
            value: jest.fn(() => {
                Object.keys(this).map(key => delete this[key])
            })
        })
        Object.defineProperty(this, 'toString', {
            enumerable: false,
            value: jest.fn(() => {
                return '[object Storage]'
            })
        })
        Object.defineProperty(this, 'key', {
            enumerable: false,
            value: jest.fn(idx => Object.keys(this)[idx] || null)
        })
    } // end constructor

    get length() {
        return Object.keys(this).length
    }
    // for backwards compatibility
    get __STORE__() {
        return this
    }
}
