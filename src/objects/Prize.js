import { Color } from '../base/Color';
import { GameObject } from '../base/GameObject';

const genColor = () => {
  const colors = [
    '#1ad0e8',
    '#e30af2',
    '#e3f20a',
    '#bd4ee6',
  ]
  return colors[Math.round(Math.random() * colors.length - 1)]
}

const updateColor = (color, target) => {
  const [r, g, b] = color.rgb
  const [r2, g2, b2] = target.rgb

  color.r = r > r2 ? r - 1 : r < r2 ? r + 1 : r
  color.g = g > g2 ? g - 1 : g < g2 ? g + 1 : g
  color.b = b > b2 ? b - 1 : b < b2 ? b + 1 : b
}

export class Prize extends GameObject {
  constructor(x, y) {
    super(x, y, new Color('#1141ff'));
    this._targetColor = this.color;
  }
  _tick = () => {
    if (this.color.hex === this._targetColor.hex)
      this._targetColor = new Color(genColor());

    updateColor(this.color, this._targetColor);
  }
}
