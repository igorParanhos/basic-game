import { EnemyCircularStrategy } from '../movement/EnemyCircularStrategy';
import { Level } from '../base/Level';

export class Level2 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 20,
      playerSpeed: 180,
      enemyMovementSettings: {
        speed: 195,
        rotation: 8,
        randomOrientation: false,
      },
    };
    this.enemyMovementStrategy = EnemyCircularStrategy;
  }
}
