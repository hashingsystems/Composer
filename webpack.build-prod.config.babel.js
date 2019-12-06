import webpack from 'webpack'
import merge from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import common from './webpack.common.config.babel'
import addressBook from './src/javascript/hedera/address-book'
import defaults from './src/javascript/defaults'

const globals = defaults['production']
let globalsStringified = {}
for (var k in globals) {
    if (globals.hasOwnProperty(k)) {
        globalsStringified[k] = JSON.stringify(globals[k])
    }
}

// temporary implementation until we use getFileContent
const addresses = addressBook['production']
for (var addressProp in addresses) {
    if (addresses.hasOwnProperty(addressProp)) {
        globalsStringified[addressProp] = JSON.stringify(addresses[addressProp])
    }
}

let productionConfig = {
    mode: 'production',
    watch: false,
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    parallel: true,
                    compress: {
                        drop_console: true
                    },
                    output: {
                        ascii_only: true
                    }
                }
            })
        ]
    },
    plugins: [new webpack.DefinePlugin(globalsStringified)]
}

export default merge(common, productionConfig)
