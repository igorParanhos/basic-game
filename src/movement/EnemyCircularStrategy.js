import { Movement } from "../base/Movement";
import { degreesToRadians, radiansToDegrees } from "../utils/math";

export class EnemyCircularStrategy extends Movement {
  constructor(settings) {
    super(settings)
    this.previousDirection = null;
    this.orientation = settings.randomOrientation ? Math.round(Math.random()) || -1 : 1;
  }

  _getNextPosition = (x, y) => {
    const increase = Math.random() * this.settings.rotation * this.orientation;
    this.setDirection(radiansToDegrees(this.direction) + increase)

    x += this.xDirection;
    y -= this.yDirection;

    return {
      x,
      y,
    };
  };
}
