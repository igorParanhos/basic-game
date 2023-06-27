import { Movement } from '../base/Movement';
import { degreesToRadians, radiansToDegrees } from '../utils/math';

export class EnemyCircularStrategy extends Movement {
  constructor(settings) {
    super(settings);
    this.previousDirection = null;
    this.orientation = settings.randomOrientation ? Math.round(Math.random()) || -1 : 1;
  }

  _getNextPosition = (x, y, delta) => {
    const increase = Math.random() * this.settings.rotation * this.orientation;
    this.setDirection(radiansToDegrees(this.direction) + increase);

    x += this.xDirection * delta;
    y -= this.yDirection * delta;

    return {
      x,
      y,
    };
  };
}
