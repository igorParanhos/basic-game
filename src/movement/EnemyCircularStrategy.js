const SPEED = 2;

export class EnemyCircularStrategy {
    constructor() {
        this.previousDirection = null
    }

    getNextPosition = (x, y) => {
        const steps = this.nextSteps();
        let direction
        direction = this.nextDirection();
        if (this.previousDirection) {
            const increase = ((Math.random() * 0.1))
            direction = (this.previousDirection + increase)
        }
        this.previousDirection = direction

        x += Math.cos(direction) * steps;
        y -= Math.sin(direction) * steps;

        return {
            x,
            y,
        };
    };
    nextDirection = () => {
        return Math.random() * 2 * Math.PI;
    };
    nextSteps = () => {
        return SPEED;
    };
}
