import { Enemy } from '../objects/Enemy';
import { Player } from '../objects/Player';
import { Prize } from '../objects/Prize';
import { Control } from '../core/Control';
import { EnemyRandomStrategy } from '../movement/EnemyRandomStrategy';

const CANVAS_SIZE = 500;

export class Level {
  constructor() {
    this.settings = {
      enemyAmount: 20,
      playerSpeed: 3,
      canvasSize: CANVAS_SIZE,
      enemyMovementSettings: { speed: 2 },
    };
    this.player = null;
    this.prize = null;
    this.enemies = [];

    this.enemyMovementStrategy = EnemyRandomStrategy;
  }
  start = () => {
    this.control.start();
  };
  stop = () => {
    this.control.stop();
  };
  initialize = () => {
    this.initializePrize();
    this.initializePlayer();
    this.initializeEnemies();
  };
  initializeEnemies = () => {
    this.enemies = [];
    for (let i = 0; i < this.settings.enemyAmount; i++) {
      this.enemies.push(
        new Enemy(
          Math.random() * (this.settings.canvasSize - 10),
          Math.random() * (this.settings.canvasSize - 10),
          this.enemyMovementStrategy,
          this.settings.enemyMovementSettings
        )
      );
    }
  };
  initializePlayer = () => {
    this.player = new Player();
    this.control = new Control(this.player, this.settings.playerSpeed);
  };
  initializePrize = () => {
    this.prize = new Prize(
      Math.random() * (this.settings.canvasSize - 10),
      Math.random() * (this.settings.canvasSize - 10)
    );
  };
  getObjects = () => {
    return [this.player, this.prize, ...this.enemies];
  };
}
