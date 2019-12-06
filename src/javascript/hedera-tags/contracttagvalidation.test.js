import path from 'path'
import HederaTag from '.'
import { JSDOM } from 'jsdom'
import contractTag from './contracttagvalidation'
import debug from 'debug'

const log = debug('test:hedera:contractvalidation')

test('When hedera-contract tag is VALID', async () => {
    // retrieve test HTML from testdata directory and pass it to JSDOM
    let testFile = path.join(
        __dirname,
        'testdata',
        'contractcallexample1_valid.html'
    )
    let dom = await JSDOM.fromFile(testFile)
    let document = dom.window.document
    let result = HederaTag.contract(document)
    let params = [
        '1',
        '50000000',
        '1118',
        '880',
        '28',
        '0x94fa2f5e55d8a4647ccbc5e8b960cbefee34e71443a53b455e090076de53372c',
        '0x172ebe5f2be8ff0c35ccb48b959e44dafe0ac6116d3a5546c7a52b174231eb8f'
    ]
    let abi = {
        constant: false,
        inputs: [
            {
                name: 'propertyID',
                type: 'uint24'
            },
            {
                name: 'amount',
                type: 'uint256'
            },
            {
                name: 'x',
                type: 'uint16'
            },
            {
                name: 'y',
                type: 'uint16'
            },
            {
                name: 'v',
                type: 'uint8'
            },
            {
                name: 'r',
                type: 'bytes32'
            },
            {
                name: 's',
                type: 'bytes32'
            }
        ],
        name: 'buyProperty',
        outputs: [
            {
                name: '',
                type: 'string'
            }
        ],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    }
    expect(result).toEqual({
        contractid: '0.0.1064',
        memo: 'memo',
        paymentserver: 'http://localhost:8099',
        abi: abi,
        params: params,
        extensionid: 'ajeohoociaeemadgmpfdkcbhmloppohn'
    })
})
