import { Level } from "./Level";

export class Level2 extends Level {
    constructor() {
        super();
        this.settings = {
            enemyAmount: 30,
            canvasSize: CANVAS_SIZE,
        };
    }
}