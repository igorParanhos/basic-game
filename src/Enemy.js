const MAX_STEPS = 5

export class Enemy {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.color = '#ff1111'
    }
    getPosition = () => {
        const steps = this.nextSteps()
        const direction = this.nextDirection()

        this.x = this.x + Math.cos(direction) * steps
        this.y = this.y - Math.sin(direction) * steps

        return {
            x: this.x,
            y: this.y
        }
    }
    nextDirection = () => {
        return Math.random() * 2 * Math.PI
    }
    nextSteps = () => {
        return Math.random() * MAX_STEPS
    }
}