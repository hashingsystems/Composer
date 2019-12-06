import {
    resolve
} from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
    entry: {
        content: './src/javascript/content/index.js',
        background: './src/javascript/background/index.js',
        'account-begin': './src/javascript/account-begin.js',
        'account-link': './src/javascript/account-link.js',
        'account-overview': './src/javascript/account-overview.js',
        'account-settings': './src/javascript/account-settings.js',
        'recent-transactions': './src/javascript/recent-transactions.js',
        'smart-contract': './src/javascript/smart-contract.js',
        'smart-contract-details': './src/javascript/smart-contract-details.js',
        'crypto-transfer-details': './src/javascript/crypto-transfer-details.js'
    },
    output: {
        publicPath: '.',
        path: resolve(__dirname, 'dist/javascript/'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    watch: true,
    module: {
        rules: [{
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
                from: 'src/manifest.json',
                to: '../manifest.json',
                toType: 'file'
            },
            {
                from: 'src/html',
                to: '../html',
                toType: 'dir'
            },
            {
                from: 'src/icons',
                to: '../icons',
                toType: 'dir'
            },
            {
                from: 'src/_locales',
                to: '../_locales',
                toType: 'dir'
            }
        ]),
        new CleanWebpackPlugin()
    ],
    node: {
        fs: 'empty'
    }
}