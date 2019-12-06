import setRecipientTransferLists from './cryptotransferlist'
import i from './internal'
import {
    AccountAmount,
    TransferList,
} from '../../pbweb/CryptoTransfer_pb'

test('Make sure sender and recipients are defined', () => {

    let sender = "0.0.1007"
    let recipientList = [{
            tinybars: 25,
            to: "0.0.111"
        },
        {
            tinybars: 3400,
            to: "0.0.777"
        },
        {
            tinybars: 342,
            to: "govt-tax-account"
        }
    ]

    let transferList

    expect(() => {
        sender = '0.0.0'
        transferList = setRecipientTransferLists(sender, recipientList)
    }).toThrowError("Invalid sender for cryptotransfer")
    expect(() => {
        sender = undefined
        transferList = setRecipientTransferLists(sender, recipientList)
    }).toThrowError("Invalid sender for cryptotransfer")
    expect(() => {
        recipientList = undefined
        transferList = setRecipientTransferLists(sender, recipientList)
    }).toThrowError("No recipients for cryptotransfer")
    expect(() => {
        recipientList = []
        transferList = setRecipientTransferLists(sender, recipientList)
    }).toThrowError("No recipients for cryptotransfer")
})

test("Transferlist containing an invalid characters", () => {
    expect(() => {
        let transferList
        let sender = "0.0.1007"
        let recipientList = [{
                tinybars: 25,
                to: "0.0.111"
            },
            {
                tinybars: 3400,
                to: "0.0.777"
            },
            {
                tinybars: 342,
                to: "govt-tax-account"
            }
        ]

        transferList = setRecipientTransferLists(sender, recipientList)
    }).toThrowError("AccountID contains invalid character(s)")
})

test("Transferlist contains invalid accountID", () => {
    expect(() => {
        let transferList
        let sender = "0.0.1007"
        let recipientList = [{
                tinybars: 25,
                to: "0.0.111"
            },
            {
                tinybars: 3400,
                to: "0.0.777"
            },
            {
                tinybars: 342,
                to: "0.0.444.3"
            }
        ]

        transferList = setRecipientTransferLists(sender, recipientList)
    }).toThrowError("AccountID is invalid")
})

test("Transferlist contains valid accountID", () => {
    let transferList
    let sender = "0.0.1007"
    let recipientList = [{
            tinybars: 25,
            to: "0.0.111"
        },
        {
            tinybars: 3400,
            to: "0.0.777"
        },
        {
            tinybars: 342,
            to: "0.0.444"
        }
    ]


    let x = new AccountAmount()
    x.setAccountid(i.accountIDFromString("0.0.111"))
    x.setAmount(25)

    let y = new AccountAmount()
    y.setAccountid(i.accountIDFromString("0.0.777"))
    y.setAmount(3400)

    let z = new AccountAmount()
    z.setAccountid(i.accountIDFromString("0.0.444"))
    z.setAmount(342)

    let acctAmtSender = new AccountAmount()
    acctAmtSender.setAccountid(i.accountIDFromString("0.0.1007"))
    acctAmtSender.setAmount(-(25 + 3400 + 342))

    let transferListTest = new TransferList()
    transferListTest.setAccountamountsList([x, y, z, acctAmtSender])
    transferList = setRecipientTransferLists(sender, recipientList)
    expect(transferListTest).toEqual(transferList)
})