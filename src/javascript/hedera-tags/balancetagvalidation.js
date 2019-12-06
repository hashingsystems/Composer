import debug from 'debug';

const log = debug('all:hedera:tags:balancetagvalidation')

const validate = (document, currentExtensionId) => {
    // Something is wrong with the document object, return false
    if (document === null || document === undefined) {
        return false;
    }

    // No hedera-micropayment tags are found, return null
    let tags = document.getElementsByTagName('hedera-balance')
    if (tags.length === 0) {
        return false;
    }

    // let extensionId = validateExtensionId(
    //     tags[0].dataset.extensionid,
    //     currentExtensionId
    // );
    // if (extensionId === false) {
    //     log('EXTENSION ID', extensionId)
    //     return false;
    // }

    // All good, return our parsed hedera-balanace tag as a voolean
    log('hedera-balance validated')
    return true;
}

export default { validate }
