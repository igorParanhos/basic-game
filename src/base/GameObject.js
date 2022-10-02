export class GameObject {
  constructor(x = 0, y = 0, color = "#999999", movementStrategy=null) {
    this.x = x;
    this.y = y;
    this.color = color;
    if (movementStrategy) {
      this.movementStrategy = new movementStrategy(x, y)
    }
  }
  getPosition = () => {
    if (this.movementStrategy) {
      const {x, y} = this.movementStrategy.getNextPosition()
      this.x = x
      this.y = y
    }

    return {
        x: this.x,
        y: this.y
    }
  }
}