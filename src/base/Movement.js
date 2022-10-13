import { clamp, degreesToRadians, radiansToDegrees } from "../utils/math"

export class Movement {
  constructor(settings) {
    this.settings = settings
    this._acceleration = 0
    this._accelerationTarget = 0
    this.setDirection(Math.random() * 360)

  }

  getNextPosition = (x, y) => {
    let { x: nextX, y: nextY } = this._getNextPosition(x, y)
    nextX = clamp(nextX, 0, 500 - 10)
    nextY = clamp(nextY, 0, 500 - 10)

    if (this.settings.bounce) {
      if (nextX <= 0 || nextX >= 500 - 10) {
        this.setDirection(180 - radiansToDegrees(this.direction))
        if (this.settings.accelerateOnBounce)
          this._accelerationTarget = this.settings.maxAcceleration || 5
      }
      if (nextY <= 0 || nextY >= 500 - 10) {
        this.setDirection(360 - radiansToDegrees(this.direction))
        if (this.settings.accelerateOnBounce)
          this._accelerationTarget = this.settings.maxAcceleration || 5
      }
    }
    return {
      x: nextX,
      y: nextY
    }
  }
  setDirection = (degrees) => {
    this.direction = degreesToRadians(degrees)
    this.xDirection = Math.cos(this.direction) * this.getSteps()
    this.yDirection = Math.sin(this.direction) * this.getSteps()
  }
  getSteps = () => {
    if (this._getSteps) return this._getSteps()
    const steps = this.settings.speed + this._acceleration
    this.accelerate()
    return steps
  }
  accelerate = () => {
    if (this._accelerationTarget < this._acceleration)
      this._acceleration -= 1
    if (this._accelerationTarget > this._acceleration)
      this._acceleration += 2
    if (this._accelerationTarget == this._acceleration) {
      this._accelerationTarget = 0
    }
    this._acceleration = Math.max(this._acceleration, 0)
  }
}
