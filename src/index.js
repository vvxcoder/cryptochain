const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../src/blockchain');
const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

app.get('/api/blocks', (req, resp) => {
    resp.json(blockchain.chain);
});

app.post('/api/mine', (req, resp) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    resp.redirect('/api/blocks');
});

const PORT = 3099;
app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`);
});