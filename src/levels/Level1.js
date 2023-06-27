import { EnemyLinearStrategy } from '../movement/EnemyLinearStrategy';
import { Level } from '../base/Level';

export class Level1 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 10,
      playerSpeed: 180,
      enemyMovementSettings: {
        speed: 190,
        bounce: true,
      },
    };
    this.enemyMovementStrategy = EnemyLinearStrategy;
  }
}
