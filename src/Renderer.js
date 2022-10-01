import { Enemy } from './Enemy'
import { Player } from './Player'
import { Prize } from './Prize'
import { Canvas2D } from './Canvas2D'
import { Control } from './Control'

const CANVAS_SIZE = 500

const $result = document.querySelector('#result')
const player = new Player()
const prize = new Prize(Math.random() * CANVAS_SIZE, Math.random() * CANVAS_SIZE)
const enemies = []
for (let i = 0; i <= 10; i++) {
    enemies.push(new Enemy(Math.random() * CANVAS_SIZE, Math.random() * CANVAS_SIZE))
}

export class Renderer {
    constructor($element) {
        this._interval = null
        this.$element = $element;
        this.ctx = $element.getContext('2d')
        this.canvas = new Canvas2D(this.ctx, CANVAS_SIZE)

        this.ctx.canvas.height = CANVAS_SIZE
        this.ctx.canvas.width = CANVAS_SIZE

        this.objects = [
            player,
            prize,
            ...enemies
        ]
        this.control = new Control(player)
    }

    start = () => {
        this._interval = setInterval(this.tick, 1000 / 60);
        this.control.start()
    }
    stop = () => {
        clearInterval(this._interval)
        this.control.stop()
    }
    tick = () => {
        this.canvas.clear()
        this.renderObjects()
        this.checkCollision()
    }

    renderObjects = () => {
        for (let object of this.objects) {
            const { x, y } = object.getPosition()
            this.canvas.square(x, y, 10, object.color)
        }
    }

    checkCollision = () => {
        const { x, y } = player
        for (let object of this.objects) {
            const { x: objectX, y: objectY } = object
            if (((x > objectX && x < objectX + 10) &&
                (y > objectY && y < objectY + 10) ||
                (x + 10 > objectX && x + 10 < objectX + 10) &&
                (y + 10 > objectY && y < objectY + 10)
                )) {
                    if (object instanceof Player) continue
                    if (object instanceof Enemy) {
                        this.handlePlayerEnemyCollision()
                    }
                    if (object instanceof Prize) {
                        this.handlePlayerPrizeCollision()
                    }
                }
        }
    }
    handlePlayerEnemyCollision = () => {
        this.stop()
        $result.innerHTML = 'You lost'
    }
    handlePlayerPrizeCollision = () => {
        this.stop()
        $result.innerHTML = 'You won'
    }
}