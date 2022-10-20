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
        squareAmplitude: 100,
        randomizeAmplitude: true,
        amplitudeVariation: 20,
        randomOrientation: true,
        variation: 40,
        bounce: true,
        accelerateOnBounce: true,
        maxAcceleration: 10
      },
    };
    this.enemyMovementStrategy = EnemySquareStrategy;
  }
}
