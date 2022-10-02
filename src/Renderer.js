import { Enemy } from "./objects/Enemy";
import { Player } from "./objects/Player";
import { Prize } from "./objects/Prize";
import { Canvas2D } from "./Canvas2D";
import { Level } from './levels/Level'

const CANVAS_SIZE = 500;

const $result = document.querySelector("#result");

export class Renderer {
  constructor($element) {
    this._interval = null;
    this.$element = $element;
    this.ctx = $element.getContext("2d");
    this.canvas = new Canvas2D(this.ctx, CANVAS_SIZE);

    this.ctx.canvas.height = CANVAS_SIZE;
    this.ctx.canvas.width = CANVAS_SIZE;

    this._status = null;
  }

  start = () => {
    this.currentLevel = new Level()
    this.currentLevel.initialize()

    this._interval = requestAnimationFrame(this.tick);
    this.currentLevel.start();
    this.status = "playing";
  };
  stop = () => {
    cancelAnimationFrame(this._interval);
    this.currentLevel.stop();
    this.status = "stopped";
  };
  tick = () => {
    this.canvas.clear();
    this.renderObjects();
    this.checkCollision();

    if (this.status == "playing")
      this._interval = requestAnimationFrame(this.tick);
  };

  renderObjects = () => {
    for (let object of this.currentLevel.getObjects()) {
      const { x, y } = object.getPosition();
      this.canvas.square(x, y, 10, object.color);
    }
  };

  checkCollision = () => {
    const objects = this.currentLevel.getObjects();
    const { x, y } = this.currentLevel.player;

    for (let object of objects) {
      const { x: objectX, y: objectY } = object;
      if (
        (x > objectX && x < objectX + 10 && y > objectY && y < objectY + 10) ||
        (x + 10 > objectX &&
          x + 10 < objectX + 10 &&
          y + 10 > objectY &&
          y < objectY + 10)
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
    this.stop();
    $result.innerHTML = "You lost";
  };
  handlePlayerPrizeCollision = () => {
    this.stop();
    $result.innerHTML = "You won";
  };
}
