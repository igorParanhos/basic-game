export class EnemyCircularStrategy {
  constructor({ speed = 2, rotation = 0.2, randomOrientation = false }) {
    this.previousDirection = null;
    this.speed = speed;
    this.rotationRadius = rotation;
    this.orientation = randomOrientation ? Math.round(Math.random()) || -1 : 1;
  }

  getNextPosition = (x, y) => {
    const steps = this.nextSteps();
    let direction;
    direction = this.nextDirection();
    if (this.previousDirection) {
      const increase = Math.random() * this.rotationRadius * this.orientation;
      direction = this.previousDirection + increase;
    }
    this.previousDirection = direction;

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
    return this.speed;
  };
}
