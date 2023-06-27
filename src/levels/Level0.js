import { Level } from '../base/Level';

export class Level0 extends Level {
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      enemyAmount: 15,
      playerSpeed: 180,
      enemyMovementSettings: {
        speed: 150,
        randomOrientation: false,
      },
    };
  }
}
