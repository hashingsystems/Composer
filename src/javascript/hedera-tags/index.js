import contractTag from './contracttagvalidation'
import micropaymentTag from './micropaymenttagvalidation'
import balanceTag from './balancetagvalidation'

class HederaTags {
    /**
     * contract checks whether the HTML document of a website contains a hedera-contract tag.
     * It returns the assembled tag json if it exists, or returns null if it does not exist, or false if the tag is invalid
     * @param {document} document a HTML document object that contains a hedera-contract tag.
     * @returns {Object} an object OR null OR false
     */
    static contract(document, currentExtensionId) {
        return contractTag.validate(document, currentExtensionId)
    }
    /**
     *
     * micropayment checks whether the HTML document of a website contains a hedera-micropayment tag.
     * It returns the assembled tag json if it exists, or returns null if it does not exist, or false if the tag is invalid
     * @param {Object} document a HTML document object that contains a hedera-micropayment tag.
     * @param {string} currentExtensionId - derived from chrome.runtime.id as a string
     * @returns {Object} an object OR null OR false
     */
    static micropayment(document, currentExtensionId) {
        return micropaymentTag.validate(document, currentExtensionId)
    }

    static checkBalanceTag(document, currentExtensionId) {
        return balanceTag.validate(document, currentExtensionId)
    }
}

export default HederaTags