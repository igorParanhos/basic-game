import { Color } from '../base/Color';
import { GameObject } from '../base/GameObject';

export class Enemy extends GameObject {
  constructor(x, y, movementStrategy, movementSettings) {
    super(x, y, new Color('#ff1111'), movementStrategy, movementSettings);
  }
}
