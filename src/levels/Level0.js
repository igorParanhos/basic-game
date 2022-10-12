import { EnemyCircularStrategy } from '../movement/EnemyCircularStrategy';
import { Level } from '../base/Level';

export class Level0 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 20,
      playerSpeed: 3,
      enemyMovementSettings: {
        speed: 2,
        rotation: 0.1,
        randomOrientation: false,
      },
    };
  }
}
