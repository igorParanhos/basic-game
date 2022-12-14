import { Movement } from "../base/Movement";

export class EnemyRandomStrategy extends Movement {
  _getNextPosition = (x, y) => {
    this.setDirection(Math.random() * 360)

    return {
      x: x + this.xDirection,
      y: y + this.yDirection,
    };
  };
}
