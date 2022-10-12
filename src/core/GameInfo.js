import Observer from "../utils/Observer";
import Singleton from "../utils/Singleton";

class Status extends Observer {
  constructor() {
    super();
    this.value = '';
  }
  _eventTypes = {
    CHANGE: 'CHANGE',
    START: 'START',
    STOP: 'STOP',
  };
  onChange = this._on(this._eventTypes.CHANGE);
  emitChange = this._emit(this._eventTypes.CHANGE);
  onStart = this._on(this._eventTypes.START);
  emitStart = this._emit(this._eventTypes.START);
  onStop = this._on(this._eventTypes.STOP);
  emitStop = this._emit(this._eventTypes.STOP);

  start = () => {
    this.value = 'playing';
    this.emitChange(this.value);
    this.emitStart(this.value);
  };
  stop = () => {
    this.value = 'stop';
    this.emitChange(this.value);
    this.emitStop(this.value);
  };
}

export class GameInfoProvider extends Singleton {
  constructor() {
    super();
    this.status = new Status();
    this.currentLevel = null;
  }
}
