import { EnemyCircularStrategy } from '../movement/EnemyCircularStrategy';
import { Level } from './Level';

export class Level1 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 25,
      playerSpeed: 3,
      enemyMovementSettings: {
        speed: 2,
        rotation: 0.1,
        randomOrientation: false,
      },
    };
    this.enemyMovementStrategy = EnemyCircularStrategy;
  }
}
