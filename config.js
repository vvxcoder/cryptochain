const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '_____',
    hash: 'drhftjjygku',
    nonce: 0,
    difficulty: INITIAL_DIFFICULTY,
    data: []
};

module.exports = { GENESIS_DATA, MINE_RATE };