export default class Observer {
    listeners = {};

    _pushListener = (type, listener) => {
        if (this.listeners[type]) this.listeners[type].push(listener);
        else this.listeners[type] = [listener];
    };

    _runAll = (type, state) => {
        const listeners = this.listeners[type];
        if (!listeners) return;
        return listeners.forEach((listener) => listener(state));
    };

    _on = (event) => (listener) => {
        this._pushListener(event, listener);
    };

    _emit = (event) => (state) => {
        this._runAll(event, state);
    };

    _cancel = (event) => (listener) => {
        this.listeners[event] = this.listeners[event].filter(
            (fn) => fn !== listener
        );
    };

    _cancelAll = (event) => {
        this.listeners[event] = {};
    };
}