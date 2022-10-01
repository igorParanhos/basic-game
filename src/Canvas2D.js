export class Canvas2D {
    constructor(ctx, size) {
        this.ctx = ctx
        this.size = size
    }
    setColor = (color) => {
        this.ctx.fillStyle = color
    }
    square = (x, y, size, color) => {
        if (color) this.setColor(color)
        const square = new Path2D()
        square.rect(x, y, size, size)
        this.ctx.fill(square)
    }
    clear = () => {
        this.ctx.clearRect(0, 0, this.size, this.size)
    }
}
