import { enumKeyByValue, friendlyHederaResponseCodeEnum } from './utils'
import { Query } from '../../pbweb/Query_pb'
import { TransactionBody } from '../../pbweb/Transaction_pb'
import debug from 'debug'

const log = debug('test:hedera:utils')

// these tests are pegged to our protobuf generated types

test('test enumKeyByValue for Query QueryCase', () => {
    const Q = Query.QueryCase
    // log(Q)
    expect(enumKeyByValue(Q, Q.QUERY_NOT_SET)).toBe('QUERY_NOT_SET')
    expect(enumKeyByValue(Q, Q.GETBYKEY)).toBe('GETBYKEY')
    expect(enumKeyByValue(Q, Q.GETBYSOLIDITYID)).toBe('GETBYSOLIDITYID')
    expect(enumKeyByValue(Q, Q.CONTRACTCALLLOCAL)).toBe('CONTRACTCALLLOCAL')
    expect(enumKeyByValue(Q, Q.CONTRACTGETINFO)).toBe('CONTRACTGETINFO')
    expect(enumKeyByValue(Q, Q.CONTRACTGETBYTECODE)).toBe('CONTRACTGETBYTECODE')
    expect(enumKeyByValue(Q, Q.CONTRACTGETRECORDS)).toBe('CONTRACTGETRECORDS')
    expect(enumKeyByValue(Q, Q.CRYPTOGETACCOUNTBALANCE)).toBe(
        'CRYPTOGETACCOUNTBALANCE'
    )
    expect(enumKeyByValue(Q, Q.CRYPTOGETACCOUNTRECORDS)).toBe(
        'CRYPTOGETACCOUNTRECORDS'
    )
    expect(enumKeyByValue(Q, Q.CRYPTOGETINFO)).toBe('CRYPTOGETINFO')
    expect(enumKeyByValue(Q, Q.CRYPTOGETCLAIM)).toBe('CRYPTOGETCLAIM')
    expect(enumKeyByValue(Q, Q.CRYPTOGETPROXYSTAKERS)).toBe(
        'CRYPTOGETPROXYSTAKERS'
    )
    expect(enumKeyByValue(Q, Q.FILEGETCONTENTS)).toBe('FILEGETCONTENTS')
    expect(enumKeyByValue(Q, Q.FILEGETINFO)).toBe('FILEGETINFO')
    expect(enumKeyByValue(Q, Q.TRANSACTIONGETRECEIPT)).toBe(
        'TRANSACTIONGETRECEIPT'
    )
    expect(enumKeyByValue(Q, Q.TRANSACTIONGETRECORD)).toBe(
        'TRANSACTIONGETRECORD'
    )
})

test('test enumKeyByValue for TransactionBody DataCase', () => {
    const Tx = TransactionBody.DataCase
    // log(Tx)
    expect(enumKeyByValue(Tx, Tx.DATA_NOT_SET)).toBe('DATA_NOT_SET')
    expect(enumKeyByValue(Tx, Tx.CRYPTOTRANSFER)).toBe('CRYPTOTRANSFER')
    // ... to be completed, repetitive test code
})

test('friendly enum keyname', () => {
    log(friendlyHederaResponseCodeEnum(10))
    log(111)
    log(222)
    log(333)
})
