const Blockchain = require('../src/blockchain');

const blockchain = new Blockchain();
blockchain.addBlock({ data: 'initial' });
let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;
let times = [];

for (let i = 0; i < 10000; i++) {
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({ data: `block ${i}` });
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextTimestamp - prevTimestamp;
    times = [...times, timeDiff];
    average = times.reduce((total, num) => (total + num))/times.length;
    console.log(`Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}ms`);
}