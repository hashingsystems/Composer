function apply(db) {
    db.version(3)
        .stores({
            transactions: null,
            transactions_tmp: '++id,accountID,host,path,amount,created,receipt'
        })
        .upgrade(t => {
            t.transactions.toArray().then(transactions => {
                return t.transactions_tmp.bulkAdd(transactions)
            })
        })
    return db
}

export default {
    apply
}
