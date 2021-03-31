const cryptoHash = require('../src/util/crypto-hash');

describe('cryptoHash()', () => {
    it('generate a SHA-256 hashed output', () => {
        expect(cryptoHash('foo'))
        .toEqual('b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b');
    });

    it('produces the same hash with the same input argumets in any order', () => {
        expect(cryptoHash('one', 'two', 'three'))
        .toEqual(cryptoHash('three', 'two', 'one'));
    });

    it('produces an unique hash when the properties has changed on an input', () => {
        const foo = {};
        const originalHash = cryptoHash(foo);
        foo['a'] = 'a';
        expect(cryptoHash(foo)).not
        .toEqual(originalHash);
    });
});