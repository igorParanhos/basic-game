export class GameObject {
  constructor(x = 0, y = 0, color = "#999999") {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  getPosition = () => {
    return {
        x: this.x,
        y: this.y
    }
  }
}
