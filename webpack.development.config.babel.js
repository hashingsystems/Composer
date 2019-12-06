import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common.config.babel'
import defaults from './src/javascript/defaults'
import addressBook from './src/javascript/hedera/address-book'
import Dotenv from 'dotenv-webpack'

const globals = defaults['development']
let globalsStringified = {}
for (var k in globals) {
    if (globals.hasOwnProperty(k)) {
        globalsStringified[k] = JSON.stringify(globals[k])
    }
}

// temporary implementation until we use getFileContent
const addresses = addressBook['development']
for (var addressProp in addresses) {
    if (addresses.hasOwnProperty(addressProp)) {
        globalsStringified[addressProp] = JSON.stringify(addresses[addressProp])
    }
}

let developmentConfig = {
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    plugins: [new webpack.DefinePlugin(globalsStringified), new Dotenv()]
}

export default merge(common, developmentConfig)
