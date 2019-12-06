/**
 * @constant
 * default values that the extension uses if required values are not available
 */

const defaults = {
    DEFAULT_EXCHANGE: 0.12,
    DEFAULT_LIMIT: 4166667,
    BALANCE_QUERY_FEE: 200000,
    TRANSACTION_FEE: 200000,
    GAS: 200000
}

const productionPaymentServer = {
    ENV_NAME: 'production',
    PAYMENT_SERVER: 'https://mps.hashingsystems.com'
}

const stagingPaymentServer = {
    ENV_NAME: 'staging',
    PAYMENT_SERVER: 'https://mps.hashingsystems.com'
}

const developmentPaymentServer = {
    ENV_NAME: 'development',
    PAYMENT_SERVER: 'https://mps.hashingsystems.com'
}

const testPaymentServer = {
    ENV_NAME: 'test',
    PAYMENT_SERVER: 'https://mps.hashingsystems.com'
}

const production = {
    ...defaults,
    ...productionPaymentServer
}

const staging = {
    ...defaults,
    ...stagingPaymentServer
}

const development = {
    ...defaults,
    ...developmentPaymentServer
}

const test = {
    ...defaults,
    ...testPaymentServer
}

export default { production, staging, development, test }
