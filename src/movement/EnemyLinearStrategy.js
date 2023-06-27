import { Movement } from '../base/Movement';

export class EnemyLinearStrategy extends Movement {
  _getNextPosition = (x, y, delta) => {
    return {
      x: x + this.xDirection * delta,
      y: y - this.yDirection * delta,
    };
  };
}
