import defaults from '.'

test('common defaults', () => {
    const environments = Object.keys(defaults)
    environments.forEach(env => {
        expect(defaults[env]['DEFAULT_EXCHANGE']).toBe(0.12)
        expect(defaults[env]['DEFAULT_LIMIT']).toBe(4166667)
        expect(defaults[env]['BALANCE_QUERY_FEE']).toBe(200000)
        expect(defaults[env]['TRANSACTION_FEE']).toBe(200000)
        expect(defaults[env]['GAS']).toBe(200000)
        // if env is 'production', then the ENV_NAME is also 'production'
        // and so on
        expect(defaults[env]['ENV_NAME']).toBe(env)

        // no tests for the default PAYMENT_SERVER
    })
})
