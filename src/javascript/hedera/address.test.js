import i from './internal'
import address from './address'
import addressBook from './address-book'
import debug from 'debug'

const log = debug('test:hedera:address')

test('Emulate production environment to see our production node addresses', () => {
    // emulating production environment by setting our global ADDRESS_BOOK to be the production address book list
    global.ADDRESS_BOOK = addressBook['production']['ADDRESS_BOOK']

    log(ADDRESS_BOOK)
    expect(ADDRESS_BOOK.length).toEqual(10)

    let node, submissionNode

    submissionNode = '0.0.3'
    node = address.getNodeAddr(submissionNode)
    expect(node.account).toEqual('0.0.3')
    expect(node.address).toEqual('35.237.200.180:50211')

    expect(() => {
        submissionNode = '0.0.2' // treasury's node
        node = address.getNodeAddr(submissionNode)
    }).toThrowError('node is not available, please choose other nodes')

    expect(() => {
        submissionNode = '0.0.1' // treasury's node
        node = address.getNodeAddr(submissionNode)
    }).toThrowError('node is not available, please choose other nodes')

    submissionNode = '0.0.6'
    node = address.getNodeAddr(submissionNode)
    expect(node.account).toEqual('0.0.6')
    expect(node.address).toEqual('35.199.161.108:50211')

    // create a mock math random to get the same random number for test equality of node address
    const mockMath = Object.create(global.Math)
    mockMath.random = () => 0.5
    global.Math = mockMath

    submissionNode = null
    node = address.getNodeAddr(submissionNode)
    expect(node.account).toEqual('0.0.8')
    expect(node.address).toEqual('35.236.5.219:50211')
    log(node) // expect random if mock math uncommented out

    // reset back to using test environment's address book list
    global.ADDRESS_BOOK = addressBook['test']['ADDRESS_BOOK']
})

test('looping random node addr', async () => {
    log(process.env.NODE_ENV)
    let address = i.randNodeAddr(ADDRESS_BOOK)
    log(address)

    let testnetAddress = i.randNodeAddr(ADDRESS_BOOK)
    log(testnetAddress)

    // let file = '0.0.101'
    // let a = await fileGetContentsController(file)
    // log(a)
})

test('node addr test env', async () => {
    let node, submissionNode

    submissionNode = '0.0.3'
    node = address.getNodeAddr(submissionNode)
    expect(node.account).toEqual('0.0.3')

    expect(() => {
        submissionNode = '0.0.2' // treasury's node
        node = address.getNodeAddr(submissionNode)
    }).toThrowError('node is not available, please choose other nodes')

    expect(() => {
        submissionNode = '0.0.1' // treasury's node
        node = address.getNodeAddr(submissionNode)
    }).toThrowError('node is not available, please choose other nodes')

    expect(() => {
        submissionNode = '0.0.13' // node does not exist
        node = address.getNodeAddr(submissionNode)
    }).toThrowError('node does not exist, please choose other nodes')

    expect(() => {
        submissionNode = '0.0.19' // node does not exist
        node = address.getNodeAddr(submissionNode)
    }).toThrowError('node does not exist, please choose other nodes')

    // create a mock math random to get the same random number for test equality of node address
    const mockMath = Object.create(global.Math)
    mockMath.random = () => 0.5
    global.Math = mockMath

    submissionNode = null // expect random if mock math uncommented out
    node = address.getNodeAddr(submissionNode)
    expect(node.account).toBeDefined()
    log(node)
})
