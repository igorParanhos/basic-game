import { hexToRgb, rgbToHex } from '../utils/color';

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
  set a(v) {
    this.#_a = v;
    this.updateHex();
  }
  get a() {
    return this.#_a;
  }
  get rgb() {
    return [this.#_r, this.#_g, this.#_b];
  }
  set hex(v) {
    this.#_hex = v;
    this.updateRgb();
  }
  get hex() {
    return this.#_hex;
  }
  updateHex() {
    this.#_hex = rgbToHex(this.#_r, this.#_g, this.#_b);
  }
  updateRgb() {
    const rgb = hexToRgb(this.#_hex);
    this.#_r = rgb[0];
    this.#_g = rgb[1];
    this.#_b = rgb[2];
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
