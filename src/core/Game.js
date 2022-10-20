import { Enemy } from '../objects/Enemy';
import { Player } from '../objects/Player';
import { Prize } from '../objects/Prize';
import { levels } from '../levels';
import { WebGLRenderer } from './WebGLRenderer';
import { GameInfoProvider } from './GameInfo';
import UiController from './UiController';
import RAF from '../utils/RAF'

const parseSearchParams = (search) => {
  return search.replace('?', '').split('&').reduce((acc, item) => {
    const [key, value] = item.split('=')
    acc[key] = value
    return acc
  }, {}) || {}
}

export class Game {
  constructor({ element }) {
    this.gameInfoProvider = new GameInfoProvider();
    this.renderer = new WebGLRenderer(element, this.gameInfoProvider);
    this._animationFrame = null;
    this.levels = levels;
    this.uiController = UiController;
  }
  initialize = () => {
    const search = parseSearchParams(window.location.search)
    if (search.level)
      this.setLevel(parseInt(search.level))
    else this.setLevel(0);
    RAF.subscribe(this.tick)

  };
  setLevel = (levelIndex) => {
    this.currentLevel = levelIndex;
    this.gameInfoProvider.currentLevel = new this.levels[this.currentLevel]();
    this.uiController.setLevel(levelIndex);
  };
  nextLevel = () => {
    if (this.currentLevel == this.levels.length - 1) {
      this.resetLevel();
    } else {
      this.setLevel(this.currentLevel + 1);
    }
  };
  resetLevel = () => {
    this.setLevel(0);
  };
  start = () => {
    this.gameInfoProvider.currentLevel.initialize();
    this.gameInfoProvider.currentLevel.start();
    this.gameInfoProvider.status.start();
    this.startRenderer();
  };

  stop = () => {
    this.gameInfoProvider.currentLevel.stop();
    this.gameInfoProvider.status.stop();
    this.stopRenderer();
  };

  startRenderer = () => {
    RAF.start()
  };
  stopRenderer = () => {
    RAF.pause()
  };
  tick = ({ delta }) => {
    this.renderer.renderObjects();
    this.checkCollision();
  };

  handlePlayerEnemyCollision = () => {
    this.stop()
    this.uiController.setResult('fail');
    this.resetLevel();
  };
  handlePlayerPrizeCollision = () => {
    this.stop()
    this.stopRenderer()
    if (this.currentLevel === this.levels.length - 1) this.uiController.setResult('success');
    else this.uiController.setResult('next-level');
    this.nextLevel();
  };
  checkCollision = () => {
    const objects = this.gameInfoProvider.currentLevel.getObjects();
    const { x, y } = this.gameInfoProvider.currentLevel.player;

    for (let object of objects) {
      const { x: objectX, y: objectY } = object;
      if (x < objectX + 10 && x + 10 > objectX && y < objectY + 10 && 10 + y > objectY) {
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
