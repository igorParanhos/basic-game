import { Movement } from '../base/Movement';
import { createVector } from '../utils/Vector';

export class EnemyRandomStrategy extends Movement {
  _target = null;

  _generateTarget = () => {
    this._target = createVector(parseInt(Math.random() * 500), parseInt(Math.random() * 500));
  };

  _getNextPosition = (x, y, delta) => {
    const hasReachedTarget =
      this._target &&
      parseInt(x, 10) >= this._target.x - 2 &&
      parseInt(x, 10) <= this._target.x + 2 &&
      parseInt(y, 10) >= this._target.y - 2 &&
      parseInt(y, 10) <= this._target.y + 2;

    if (!this._target || hasReachedTarget) {
      this._generateTarget();
    }

    this.setDirection(Math.atan2(this._target.y - y, this._target.x - x) * (180 / Math.PI));

    return {
      x: x + this.xDirection * delta,
      y: y + this.yDirection * delta,
    };
  };
}
