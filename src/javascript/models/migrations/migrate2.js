function apply(db) {
    db.version(2).stores({
        transactions:
            '++id,transactionId,accountID,host,path,amount,created,receipt'
    })
    return db
}

export default {
    apply
}
