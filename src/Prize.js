export class Prize {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.color = '#1141ff'
    }

    getPosition = () => {
        return {
            x: this.x,
            y: this.y
        }
    }
}