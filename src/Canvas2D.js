export class Canvas2D {
    constructor(ctx, size) {
        this.ctx = ctx
        this.size = size
    }
    setColor = (color) => {
        this.ctx.fillStyle = color
    }
    circle = (color, ...n) => {
        this.setColor(color)
        this.ctx.fillCircle(...n)
    }
    square = (color, ...n) => {
        this.setColor(color)
        const square = new Path2D()
        square.rect(...n)
        this.ctx.fill(square)
    }
    clear = () => {
        this.ctx.clearRect(0, 0, this.size, this.size)
    }
}
