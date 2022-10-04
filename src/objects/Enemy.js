import { GameObject } from "../base/GameObject"

export class Enemy extends GameObject {
    constructor(x, y, movementStrategy, speed) {
        super(x, y, '#ff1111', movementStrategy, speed)
    }
}