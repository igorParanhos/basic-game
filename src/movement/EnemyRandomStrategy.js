export class EnemyRandomStrategy {
  constructor({speed=2}) {
    this._speed = speed
  }

  getNextPosition = (x, y) => {
    const steps = this.nextSteps();
    const direction = this.nextDirection();

    x += Math.cos(direction) * steps;
    y -= Math.sin(direction) * steps;

    return {
      x,
      y,
    };
  };
  nextDirection = () => {
    return Math.random() * 2 * Math.PI;
  };
  nextSteps = () => {
    return this._speed;
  };
}
