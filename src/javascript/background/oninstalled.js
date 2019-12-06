import { iconInstalled } from '../ui-utils'

const onInstalledListener = async details => {
    if (details.reason == 'install') {
        iconInstalled()
    }
}

export default onInstalledListener
