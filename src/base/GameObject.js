export class GameObject {
  constructor(x = 0, y = 0, color = "#999999", movementStrategy=null) {
    this.x = x;
    this.y = y;
    this.color = color;
    if (movementStrategy) {
      this.movementStrategy = new movementStrategy(x, y)
    }
  }
  setPosition = (x, y) => {
    const withinBoard = x >= 0 && y >= 0 && x + 10 <= 500 && y + 10 <= 500
    if (withinBoard) {
      this.x = x
      this.y = y
    }
  }
  getPosition = () => {
    if (this.movementStrategy) {
      const {x, y} = this.movementStrategy.getNextPosition(this.x, this.y)
      this.setPosition(x, y)
    }

    return {
        x: this.x,
        y: this.y
    }
  }
}
