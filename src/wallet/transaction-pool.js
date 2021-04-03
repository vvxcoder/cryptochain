const Transaction = require('../transaction/transaction')

class TransactionPool {
    constructor() {
        this.transactionMap = {};
    }

    setTransaction(transaction) {
        this.transactionMap[transaction.id] = transaction;
    }

    setMap(transactionMap) {
        this.transactionMap = transactionMap;
    }

    existingTransaction({ inputAddress }) {
        const transactions = Object.values(this.transactionMap);
        return transactions
            .find(transaction => transaction.input.address === inputAddress);
    }

    validTransactions() {
        return Object.values(this.transactionMap).filter(transaction => Transaction.validTransaction(transaction));
    }

    clear() {
        this.transactionMap = {};
    }

    clearBlockchainTransactions({ chain }) {
        for (let i = 0; i < chain.length; i++) {
            if (this.transactionMap[transaction.id]) {
                delete transactionMap[transaction.id];
            }
        }
    }
}

module.exports = TransactionPool;
