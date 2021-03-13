const express = require('express');
const Blockchain = require('../src/blockchain');
const app = express();
const blockchain = new Blockchain();

app.get('/api/blocks', (req, resp) => {
    resp.json(blockchain.chain);
});

const PORT = 3099;
app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`);
});