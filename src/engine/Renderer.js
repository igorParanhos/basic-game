import { Enemy } from "../objects/Enemy";
import { Player } from "../objects/Player";
import { Prize } from "../objects/Prize";
import { Canvas2D } from "../Canvas2D";

const CANVAS_SIZE = 500;

const $result = document.querySelector("#result");

export class Renderer {
  constructor($element, gameInfoProvider) {
    this._interval = null;
    this.$element = $element;
    this.ctx = $element.getContext("2d");
    this.canvas = new Canvas2D(this.ctx, CANVAS_SIZE);

    this.ctx.canvas.height = CANVAS_SIZE;
    this.ctx.canvas.width = CANVAS_SIZE;

    this.gameInfoProvider = gameInfoProvider
  }

  start = () => {
    this._interval = requestAnimationFrame(this.tick);
  };
  stop = () => {
    cancelAnimationFrame(this._interval);
  };
  tick = () => {
    this.canvas.clear();
    this.renderObjects();
    this.checkCollision();

    if (this.gameInfoProvider.status.value == "playing")
      this._interval = requestAnimationFrame(this.tick);
  };

  renderObjects = () => {
    for (let object of this.gameInfoProvider.currentLevel.getObjects()) {
      const { x, y } = object.getPosition();
      this.canvas.square(x, y, 10, object.color);
    }
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
}
