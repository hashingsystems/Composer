import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common.config.babel'
import addressBook from './src/javascript/hedera/address-book'
import defaults from './src/javascript/defaults'

const globals = defaults['staging']
let globalsStringified = {}
for (var k in globals) {
    if (globals.hasOwnProperty(k)) {
        globalsStringified[k] = JSON.stringify(globals[k])
    }
}

// temporary implementation until we use getFileContent
const addresses = addressBook['staging']
for (var addressProp in addresses) {
    if (addresses.hasOwnProperty(addressProp)) {
        globalsStringified[addressProp] = JSON.stringify(addresses[addressProp])
    }
}

let stagingConfig = {
    mode: 'development',
    watch: true,
    plugins: [new webpack.DefinePlugin(globalsStringified)]
}

export default merge(common, stagingConfig)
