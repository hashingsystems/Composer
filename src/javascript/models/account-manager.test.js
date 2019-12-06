import testAccount1 from './testdata/account'
import AccountManager from './account-manager'
import Account from './account'

test('Account Manager test', async () => {
    let am = await new AccountManager().init()
    await am.setCurrentAccount(testAccount1)

    let currentAccount = await am.getCurrentAccount()
    expect(currentAccount).toEqual(testAccount1.accountID)
})
