import { Movement } from "../base/Movement";
import { degreesToRadians, radiansToDegrees } from "../utils/math";

export class EnemySquareStrategy extends Movement {
  constructor(settings) {
    super(settings)
    this.stepsTaken = 0;
    this._getAmplitude()
  }

  _getAmplitude = () => {
    this.amplitude = this.settings.squareAmplitude
    if (this.settings.randomizeAmplitude && this.settings.amplitudeVariation)
      this.amplitude = (this.amplitude - this.settings.amplitudeVariation) + Math.random() * this.settings.variation
    else if (this.settings.randomizeAmplitude)
      this.amplitude = Math.random() * this.amplitude
  }

  _getNextPosition = (x, y) => {

    if (this.stepsTaken >= this.amplitude) {
      this.setDirection(radiansToDegrees(this.direction) + 90)
      this.stepsTaken = 0;
      this._getAmplitude()
    }
    this.stepsTaken++;

    x += this.xDirection;
    y -= this.yDirection;

    return {
      x,
      y,
    };
  };
}

