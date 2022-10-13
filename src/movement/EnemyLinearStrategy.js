import { Movement } from "../base/Movement";

export class EnemyLinearStrategy extends Movement {
  _getNextPosition = (x, y) => {
    return {
      x: x + this.xDirection,
      y: y - this.yDirection,
    };
  };
}
