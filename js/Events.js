
let subscriptions = {};

export default class Events {
    subscribe(eventName, listener) {
        if (!subscriptions[eventName]) {
            subscriptions[eventName] = [];
        }

        let index = subscriptions[eventName].push(listener) - 1;

        return function () {
            delete subscriptions[eventName][index];
            if (subscriptions[eventName].length === 0) {
                delete subscriptions[eventName];
            }
        }
    }

    publish(eventName, info) {
        if (!subscriptions[eventName]) {
            return;
        }
        subscriptions[eventName].forEach((item) => item(info ? info : {}));
    }
}