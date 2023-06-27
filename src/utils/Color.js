function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(r, g, b, a) {
  if (r < 0 || r > 255) {
    throw new Error('Invalid red value: ' + r);
  }
  if (g < 0 || g > 255) {
    throw new Error('Invalid green value: ' + r);
  }
  if (b < 0 || b > 255) {
    throw new Error('Invalid blue value: ' + r);
  }
  if (a < 0 || a > 1) {
    throw new Error('Invalid alpha value: ' + r);
  }
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a * 255);
}

export function hexToRgb(_hex) {
  let hex = _hex.toLowerCase();
  if (_hex.length === 4) {
    hex = _hex.replace(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g, '#$1$1$2$2$3$3') + 'ff';
  } else if (_hex.length === 5) {
    hex = _hex.replace(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g, '#$1$1$2$2$3$3$4$4');
  } else if (_hex.length === 7) {
    hex = _hex.replace(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g, '#$1$2$3') + 'ff';
  }
  if (/^#[a-f0-9]{8}$/.test(hex) === false) {
    throw new Error('Invalid hex color: ' + _hex);
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), parseInt(result[4], 16) / 255]
    : null;
}

export class Color {
  #_r = 0;
  #_g = 0;
  #_b = 0;
  #_a = 0;
  #_hex = 0;

  constructor(color = '#ffffff') {
    this.setColor(color);
  }

  set r(v) {
    this.#_r = v;
    this.updateHex();
  }
  get r() {
    return this.#_r;
  }
  set g(v) {
    this.#_g = v;
    this.updateHex();
  }
  get g() {
    return this.#_g;
  }
  set b(v) {
    this.#_b = v;
    this.updateHex();
  }
  get b() {
    return this.#_b;
  }
  get a() {
    return this.#_a;
  }
  set a(v) {
    this.#_a = v;
    this.updateHex();
  }
  get hex() {
    return this.#_hex;
  }
  set hex(v) {
    this.#_hex = v;
    this.updateRgb();
  }
  get rgb() {
    return [this.#_r, this.#_g, this.#_b];
  }
  set rgb(v) {
    this.setColor(v);
  }
  get rgba() {
    return [this.#_r, this.#_g, this.#_b, this.#_a];
  }
  set rgba(v) {
    this.setColor(v);
  }
  updateHex() {
    this.#_hex = rgbToHex(this.#_r, this.#_g, this.#_b, this.#_a);
  }
  updateRgb() {
    const rgb = hexToRgb(this.#_hex);
    this.#_r = rgb[0];
    this.#_g = rgb[1];
    this.#_b = rgb[2];
    this.#_a = rgb[3];
  }
  setColor = (color) => {
    if (Array.isArray(color)) {
      this.#_r = color[0];
      this.#_g = color[1];
      this.#_b = color[2];
      this.#_a = color.length === 4 ? color[3] : 1;
      this.updateHex();
    } else {
      this.hex = color;
    }
  };
}
