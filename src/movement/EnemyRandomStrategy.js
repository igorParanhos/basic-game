const SPEED = 5;

export class EnemyRandomStrategy {
  constructor() {}

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
    return Math.random() * SPEED;
  };
}
