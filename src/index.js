const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const Blockchain = require('../src/blockchain');
const PubSub = require('../src/app/publish');
const TransactionPool = require('../src/wallet/transaction-pool');

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3099;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(() => {
    pubsub.broadcastChain();
}, 1000);

app.use(bodyParser.json());

app.get('/api/blocks', (req, resp) => {
    resp.json(blockchain.chain);
});

app.post('/api/mine', (req, resp) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    pubsub.broadcastChain();
    resp.redirect('/api/blocks');
});

app.post('/api/transact', (req, resp) => {
    const { amount,recipient } = req.body;
    let transaction = transactionPool.existingTransaction({
        inputAddress: wallet.publicKey
    });
    
    try {
        if (transaction) {
            transaction.update({
                senderWallet: wallet, recipient, amount
            });
        }
        else {
            transaction = wallet.createTransaction({ recipient, amount });
        }
    }
    catch (e) {
        return resp.status(400).json({ type: 'error', message: e.message });
    }
    
    transactionPool.setTransaction(transaction);
    resp.json({ type: 'success', transaction });
});

app.get('/api/transaction-pool-map', (req, resp) => {
    resp.json(transactionPool.transactionMap);
});

const syncChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body);
            console.log('Replce chain on a sync with = ', rootChain);
            blockchain.replaceChain(rootChain);
        }
    });
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`);

    if (PORT !== DEFAULT_PORT) {
        syncChains();
    }
});