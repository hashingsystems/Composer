function apply(db) {
    db.version(1).stores({
        transactions: '++id,accountID,host,path,amount,created'
    })
    return db
}

export default {
    apply
}
