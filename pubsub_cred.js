const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-d8fb86ec-8793-46c5-8597-5082eb8cc9df',
    subscribeKey: 'sub-c-6a4d3fe8-84b8-11eb-a47e-8aa5932e3236',
    secretKey: 'sec-c-Mjk1ZmRhZmQtOTY1ZS00M2Q2LThlYmItYWRkMzg5ZWEzOTQ4',
};

const CHANNELS = {
    TEST: 'TEST',
    TESTTWO: 'TESTTWO'
};

class PubSub {
    constructor() {
        this.pubnub = new PubNub(credentials);
        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        this.pubnub.addEventListener(this.listener());
    }

    listener() {
        return {
            message: messageObject => {
                const { channel, message } = messageObject;
                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
            }
        };
    }

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }
}

module.exports = PubSub;
