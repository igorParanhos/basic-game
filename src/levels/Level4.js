import { Level } from '../base/Level';
import { EnemySquareStrategy } from '../movement/EnemySquareStrategy';

export class Level4 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 15,
      playerSpeed: 3,
      enemyMovementSettings: {
        speed: 1.5,
        squareAmplitude: 60,
        randomizeAmplitude: true,
        amplitudeVariation: 20,
        randomOrientation: true,
        bounce: true,
        accelerateOnBounce: true,
        maxAcceleration: 3
      },
    };
    this.enemyMovementStrategy = EnemySquareStrategy;
  }
}
