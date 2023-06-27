import { EnemyCircularStrategy } from '../movement/EnemyCircularStrategy';
import { Level } from '../base/Level';

export class Level3 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 25,
      playerSpeed: 180,
      enemyMovementSettings: {
        speed: 200,
        rotation: 5,
        accelerateOnBounce: true,
        randomOrientation: true,
      },
    };
    this.enemyMovementStrategy = EnemyCircularStrategy;
  }
}
