// https://github.com/nodejs/node/blob/master/lib/events.js

function Event() {
    this.listeners = {};
}

Event.prototype.listen = function (event, handler) {
    (this.listeners[event] = this.listeners[event] || []).push(handler);
};

Event.prototype.notify = function (event, data) {
    if (this.listeners[event] !== undefined) {
        for (var callback in this.listeners[event]) {
            this.listeners[event][callback].call(this, data);
        }
    }
};

Event.prototype.unListen = function (event, handler) {
    if (this.listeners[event] !== undefined) {
        var index = this.listeners[event].indexOf(handler);
        if (index !== -1) {
            this.listeners[event].splice(index, 1);
        }
    }
};

Event.create = function () {
    return new Event();
};

exports.event = Event;