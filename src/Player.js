const SPEED = 10

export class Player {
    constructor() {
        this.x = 0
        this.y = 0
        this.color = '#00ee11'
        document.addEventListener('keypress', this.handleControl)
    }

    handleControl = (e) => {
        console.log(e.key)
        switch (`${e.key}`) {
            case 'w':
                this.y = this.y - SPEED
                break
            case 'a':
                this.x = this.x - SPEED
                break
            case 's':
                this.y = this.y + SPEED
                break
            case 'd':
                this.x = this.x + SPEED
                break
        }
        console.log(this.x, this.y)
    }
    getPosition = () => {
        return {
            x: this.x,
            y: this.y
        }
    }
}