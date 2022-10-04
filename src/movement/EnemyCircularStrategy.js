const SPEED = 2;

export class EnemyCircularStrategy {
    constructor(speed=2) {
        this.previousDirection = null
        this.speed = speed
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
        return this.speed;
    };
}
