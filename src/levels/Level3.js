
import { EnemyCircularStrategy } from '../movement/EnemyCircularStrategy';
import { Level } from '../base/Level';

export class Level3 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 25,
      playerSpeed: 3,
      enemyMovementSettings: {
        speed: 2,
        rotation: 5,
        accelerateOnBounce: true,
        randomOrientation: true,
      },
    };
    this.enemyMovementStrategy = EnemyCircularStrategy;
  }
}
