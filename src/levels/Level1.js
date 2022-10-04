import { EnemyCircularStrategy } from "../movement/EnemyCircularStrategy";
import { Level } from "./Level";

export class Level1 extends Level {
    constructor() {
        super();
        this.settings = {
            ...this.settings,
            enemyAmount: 25,
            playerSpeed: 3,
            enemySpeed: 1,
        };
        this.enemyMovementStrategy = EnemyCircularStrategy
    }
}