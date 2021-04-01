const TransactionPool = require('../src/wallet/transaction-pool');
const Transaction = require('../src/transaction/transaction');
const Wallet = require('../src/wallet');

describe('TransactionPool', () => {
    let transactionPool, transaction, senderWallet;

    beforeEach(() => {
        transactionPool = new TransactionPool();
        senderWallet = new Wallet();
        transaction = new Transaction({
            senderWallet: new Wallet(),
            recipient: 'fake-recipient',
            amount: 50
        });
    });

    describe('setTransaction()', () => {
        it('adds a transaction', () => {
            transactionPool.setTransaction(transaction);
            expect(transactionPool.transactionMap[transaction.id])
                .toBe(transaction);
        });
    });

    describe('existingTransaction()', () => {
        it('returns an existing transaction given an input address', () => {
            transactionPool.setTransaction(transaction);
            expect(transactionPool.exisingTransaction({
                inputAddress: senderWallet.publicKey
            })).toBe(transaction);
        });
    });
});