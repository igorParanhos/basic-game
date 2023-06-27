import { Color } from '../utils/Color';
import { GameObject } from '../base/GameObject';

export class Player extends GameObject {
  constructor(x = 0, y = 0) {
    super(x, y, new Color('#00ee11'));
  }
}
