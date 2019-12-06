// lifecycle
import portListener from './port'
import onUpdatedListener from './onupdated'
import onActivatedListener from './onactivated'
import onInstalledListener from './oninstalled'

import debug from 'debug'

const log = debug('all:background')

// Fired when the extension is first installed
chrome.runtime.onInstalled.addListener(onInstalledListener)

// Fired when user switches to a specific tab
chrome.tabs.onActivated.addListener(onActivatedListener)

// Fired when a website has finished loading on a specific tab,
// hedera-micropayment or hedera-contract logic executes here
chrome.tabs.onUpdated.addListener(onUpdatedListener)

// Fired when a connection is made with either an extension process or a content script
chrome.runtime.onConnect.addListener(portListener)
chrome.extension.onConnect.addListener(portListener)