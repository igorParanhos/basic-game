import { Enemy } from "../objects/Enemy";
import { Player } from "../objects/Player";
import { Prize } from "../objects/Prize";
import { Control } from "../Control";
import { EnemyRandomStrategy } from "../movement/EnemyRandomStrategy";

const CANVAS_SIZE = 500;

export class Level {
  constructor() {
    this.settings = {
      enemyAmount: 30,
      canvasSize: CANVAS_SIZE,
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
    this.enemies = []
    for (let i = 0; i <= this.settings.enemyAmount; i++) {
      this.enemies.push(
        new Enemy(
          Math.random() * CANVAS_SIZE,
          Math.random() * CANVAS_SIZE,
          this.enemyMovementStrategy
        )
      );
    }
  };
  initializePlayer = () => {
    this.player = new Player();
    this.control = new Control(this.player);
  };
  initializePrize = () => {
    this.prize = new Prize(
      Math.random() * this.settings.canvasSize,
      Math.random() * this.settings.canvasSize
    );
  };
  getObjects = () => {
    return [this.player, this.prize, ...this.enemies];
  };
}
