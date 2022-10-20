import { GameObject } from '../base/GameObject';
import { hexToRgb, rgbToHex } from '../webgl/utils';

// const genColor = () => {
//   return rgbToHex(
//     Math.floor(Math.random() * 255),
//     Math.floor(Math.random() * 255),
//     Math.floor(Math.random() * 255),
//   )
// }

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
  let newColor = [0, 0, 0].map((_, i) => {
    let c = color[i]
    const n = target[i]
    return c > n
      ? c - 1
      : c < n
        ? c + 1
        : c
  })
  return rgbToHex(...newColor)
}

export class Prize extends GameObject {
  constructor(x, y) {
    super(x, y, '#1141ff');
    this._targetColor = this.color;
  }
  _tick = () => {
    if (this.color === this._targetColor) {
      this._targetColor = genColor();
    }
    const c = updateColor(hexToRgb(this.color), hexToRgb(this._targetColor));
    this.color = c
  }
}
