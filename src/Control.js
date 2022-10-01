import { addPressHoldEventButton, addPressHoldEventKeypress } from "./utils/pressHoldEvent"

const $up = document.querySelector('#up')
const $down = document.querySelector('#down')
const $left = document.querySelector('#left')
const $right = document.querySelector('#right')

export class Control {
    constructor(gameObject, speed=5) {
        this.gameObject = gameObject;
        this.speed = speed
        this._cancellationTokens = []
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
        this.addListeners()
    }
    stop = () => {
        this.cancelListenerEvents()
    }
    addListeners = () => {
        this._cancellationTokens.push(addPressHoldEventKeypress(document, this.handleInput))
        this._cancellationTokens.push(addPressHoldEventButton($up, this.up))
        this._cancellationTokens.push(addPressHoldEventButton($down, this.down))
        this._cancellationTokens.push(addPressHoldEventButton($left, this.left))
        this._cancellationTokens.push(addPressHoldEventButton($right, this.right))
    }
    cancelListenerEvents = () => {
        for (let cancelEvent of this._cancellationTokens) {
            cancelEvent()
        }
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