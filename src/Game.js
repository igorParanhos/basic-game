import { Enemy } from "./objects/Enemy";
import { Player } from "./objects/Player";
import { Prize } from "./objects/Prize";
import { Level } from "./levels/Level";
import { Renderer } from "./engine/Renderer";
import Observer from "./utils/Observer";

const $result = document.querySelector("#result");

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
    this._animationFrame = null
  }
  initialize = () => {
  };
  start = () => {
    this.gameInfoProvider.currentLevel.initialize();
    this.gameInfoProvider.currentLevel.start();
    this.gameInfoProvider.status.start();
    this.startRenderer()
  };

  stop = () => {
    this.gameInfoProvider.currentLevel.stop();
    this.gameInfoProvider.status.stop();
    this.stopRenderer()
  };

  startRenderer = () => {
    this._animationFrame = requestAnimationFrame(this.tick);
  };
  stopRenderer = () => {
    cancelAnimationFrame(this._animationFrame);
  };
  tick = () => {
    this.renderer.renderObjects();
    this.checkCollision();

    if (this.gameInfoProvider.status.value == "playing")
      this._animationFrame = requestAnimationFrame(this.tick);
  };

  handlePlayerEnemyCollision = () => {
    this.gameInfoProvider.status.stop()
    $result.classList.add('animate', 'fail')
    $result.innerHTML = "You lost";
  };
  handlePlayerPrizeCollision = () => {
    this.gameInfoProvider.status.stop()
    $result.classList.add('animate', 'success')
    $result.innerHTML = "You won";
  };
  checkCollision = () => {
    const objects = this.gameInfoProvider.currentLevel.getObjects();
    const { x, y } = this.gameInfoProvider.currentLevel.player;

    for (let object of objects) {
      const { x: objectX, y: objectY } = object;
      if (
        x < objectX + 10 &&
        x + 10 > objectX &&
        y < objectY + 10 &&
        10 + y > objectY
      ) {
        if (object instanceof Player) continue;
        if (object instanceof Enemy) {
          this.handlePlayerEnemyCollision();
        }
        if (object instanceof Prize) {
          this.handlePlayerPrizeCollision();
        }
      }
    }
  };
}
