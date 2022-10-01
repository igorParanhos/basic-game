const $up = document.querySelector('#up')
const $down = document.querySelector('#down')
const $left = document.querySelector('#left')
const $right = document.querySelector('#right')

export class Control {
    constructor(gameObject, speed=10) {
        this.gameObject = gameObject;
        this.speed = speed
    }
    handleInput = (e) => {
        switch (`${e.key}`) {
            case 'w':
                this.up()
                break
            case 'a':
                this.left()
                break
            case 's':
                this.down()
                break
            case 'd':
                this.right()
                break
        }
    }
    start = () => {
        document.addEventListener('keypress', this.handleInput)
        $up.addEventListener('ke', this.up)
        $down.addEventListener('click', this.down)
        $left.addEventListener('click', this.left)
        $right.addEventListener('click', this.right)

        // press and hold


    }
    stop = () => {
        document.removeEventListener('keypress', this.handleInput)
        $up.removeEventListener('click', this.up)
        $down.removeEventListener('click', this.down)
        $left.removeEventListener('click', this.left)
        $right.removeEventListener('click', this.right)
    }
    up = () => {
        this.gameObject.y -= this.speed
    }
    down = () => {
        this.gameObject.y += this.speed
    }
    left = () => {
        this.gameObject.x -= this.speed
    }
    right = () => {
        this.gameObject.x += this.speed
    }
}