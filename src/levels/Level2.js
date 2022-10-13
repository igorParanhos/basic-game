import { EnemyCircularStrategy } from '../movement/EnemyCircularStrategy';
import { Level } from '../base/Level';

export class Level2 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 20,
      playerSpeed: 3,
      enemyMovementSettings: {
        speed: 1.5,
        rotation: 8,
        randomOrientation: false,
      },
    };
    this.enemyMovementStrategy = EnemyCircularStrategy;
  }
}
