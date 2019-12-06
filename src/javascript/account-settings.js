import {
    limitViewController,
    accountViewController
} from './viewcontroller/account-settings/index'

// account-settings page will show the current default limit
document.addEventListener('DOMContentLoaded', async function() {
    let getI18nMsg = chrome.i18n.getMessage

    document.getElementById('accountSettingsText').innerHTML = getI18nMsg(
        'account_settings_text'
    )
    document.getElementById('accountIDText').innerHTML = getI18nMsg(
        'account_id_text'
    )
    document.getElementById('accountPublicKeyText').innerHTML = getI18nMsg(
        'account_publickey_text'
    )

    // update elements with id 'account-id' and 'pub;
    await accountViewController(document)

    // update elements with id 'thresholdDollars' and 'thresholdBars'
    // await limitViewController(document)
})
