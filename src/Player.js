const SPEED = 10

export class Player {
    constructor() {
        this.x = 0
        this.y = 0
        this.color = '#00ee11'
    }

    getPosition = () => {
        return {
            x: this.x,
            y: this.y
        }
    }
}