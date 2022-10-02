import { Level } from "./levels/Level";
import { Renderer } from "./engine/Renderer";
import Observer from "./utils/Observer";

class Status extends Observer {
  constructor() {
    super();
    this.value = "";
  }
  _eventTypes = {
    CHANGE: "CHANGE",
    START: "START",
    STOP: "STOP",
  };
  onChange = this._on(this._eventTypes.CHANGE);
  emitChange = this._emit(this._eventTypes.CHANGE);
  onStart = this._on(this._eventTypes.START);
  emitStart = this._emit(this._eventTypes.START);
  onStop = this._on(this._eventTypes.STOP);
  emitStop = this._emit(this._eventTypes.STOP);

  start = () => {
    this.value = "playing";
    this.emitChange(this.value);
    this.emitStart(this.value);
  };
  stop = () => {
    this.value = "stop";
    this.emitChange(this.value);
    this.emitStop(this.value);
  };
}

export class GameInfoProvider {
  constructor() {
    this.status = new Status();
    this.currentLevel = null;
  }
}

export class Game {
  constructor({ element }) {
    this.gameInfoProvider = new GameInfoProvider();
    this.gameInfoProvider.currentLevel = new Level();
    this.renderer = new Renderer(element, this.gameInfoProvider);
  }
  initialize = () => {
  };
  start = () => {
    this.gameInfoProvider.currentLevel.initialize();
    this.renderer.start();
    this.gameInfoProvider.currentLevel.start();
    this.gameInfoProvider.status.start();
  };
  stop = () => {
    this.renderer.stop();
    this.gameInfoProvider.currentLevel.stop();
    this.gameInfoProvider.status.stop();
  };
}
