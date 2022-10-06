import { EnemyCircularStrategy } from "../movement/EnemyCircularStrategy";
import { Level } from "./Level";

export class Level2 extends Level {
    constructor() {
        super()
        this.settings = {
            ...this.settings,
            enemyAmount: 30,
            playerSpeed: 3,
            enemyMovementSettings: {
                speed: 3,
                rotation: .2,
                randomOrientation: true
            }
        };
        this.enemyMovementStrategy = EnemyCircularStrategy
    }
}