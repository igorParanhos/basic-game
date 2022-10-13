export default class Observer {
  _listeners = {};

  _pushListener = (type, listener) => {
    if (this._listeners[type]) this._listeners[type].push(listener);
    else this._listeners[type] = [listener];
  };

  _runAll = (type, state) => {
    const _listeners = this._listeners[type];
    if (!_listeners) return;
    return _listeners.forEach((listener) => listener(state));
  };

  _on = (event) => (listener) => {
    if (typeof listener !== 'function') {
      console.warn('Listener is not a function')
      return
    }
    this._pushListener(event, listener);
  };

  _emit = (event) => (state) => {
    this._runAll(event, state);
  };

  _cancel = (event) => (listener) => {
    this._listeners[event] = this._listeners[event].filter((fn) => fn !== listener);
  };

  _cancelAll = (event) => {
    this._listeners[event] = {};
  };
}
