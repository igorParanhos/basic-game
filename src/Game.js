import { Enemy } from "./objects/Enemy";
import { Player } from "./objects/Player";
import { Prize } from "./objects/Prize";
import { Level } from "./levels/Level";
import { Level1 } from "./levels/Level1";
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

export class UiController {
  constructor() {}

  setResult = (status) => {
    let message, className
    switch (status) {
      case 'fail':
        className = status
        message = 'YOU FAILED!'
        break;
      case 'success':
        className = status
        message = 'YOU WON!'
       break
    }
    $result.classList.add('animate', className)
    $result.children[0].innerHTML = message;
  }
  setLevel = (level) => {
    const $level = document.querySelector('#level')
    $level.innerHTML = `Level: ${level}`
  }
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
    this.renderer = new Renderer(element, this.gameInfoProvider);
    this._animationFrame = null
    this.level = [
      Level,
      Level1,
    ]
    this.uiController = new UiController()
  }
  initialize = () => {
    this.setLevel(0)
  };
  setLevel = (levelIndex) => {
    this.currentLevel = levelIndex
    this.gameInfoProvider.currentLevel = new this.level[this.currentLevel]()
    this.uiController.setLevel(levelIndex)
  }
  nextLevel = () => {
    if (this.currentLevel == this.level.length - 1) {
      this.resetLevel()
    }
    else {
      this.setLevel(this.currentLevel + 1)
    }
  }
  resetLevel = () => {
    this.setLevel(0)
  }
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
    this.uiController.setResult('fail')
    this.resetLevel()
  };
  handlePlayerPrizeCollision = () => {
    this.gameInfoProvider.status.stop()
    this.uiController.setResult('success')
    this.nextLevel();
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
