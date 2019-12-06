function apply(db) {
    db.version(4)
        .stores({
            transactions:
                'transactionId,accountID,host,path,amount,created,receipt',
            transactions_tmp: null
        })
        .upgrade(t => {
            t.transactions_tmp.toArray().then(transactions => {
                transactions.forEach(o => {
                    // since we do not have the actual txID,
                    // we will use the string version of the old object's primary key
                    o.transactionId = o.id.toString()
                    delete o.id
                })
                return t.transactions.bulkAdd(transactions)
            })
        })
    return db
}

export default {
    apply
}
