import { Color } from '../utils/Color';

export class GameObject {
  constructor(x = 0, y = 0, color = new Color('#999999'), movementStrategy = null, movementSettings = { speed: 2 }) {
    this.x = x;
    this.y = y;
    this.color = color;
    if (movementStrategy) {
      this.movementStrategy = new movementStrategy(movementSettings);
    }
  }
  setPosition = (x, y) => {
    const withinBoard = x >= 0 && y >= 0 && x + 10 <= 500 && y + 10 <= 500;
    if (withinBoard) {
      this.x = x;
      this.y = y;
    }
  };
  getPosition = (delta) => {
    this._tick && this._tick();
    if (this.movementStrategy && delta) {
      const { x, y } = this.movementStrategy.getNextPosition(this.x, this.y, delta / 1000);
      this.setPosition(x, y);
    }

    return {
      x: this.x,
      y: this.y,
    };
  };
}
