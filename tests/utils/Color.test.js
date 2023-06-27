import { Color } from '../../src/utils/Color';

const mockHex = [
  // base colors
  ['#000000', [0, 0, 0, 1]],
  ['#ffffff', [255, 255, 255, 1]],
  ['#ff0000', [255, 0, 0, 1]], // r
  ['#00ff00', [0, 255, 0, 1]], // g
  ['#0000ff', [0, 0, 255, 1]], // g
  ['#ff00ff', [255, 0, 255, 1]], // rb
  ['#00ffff', [0, 255, 255, 1]], // gb
  ['#ffff00', [255, 255, 0, 1]], // rg
  // varying alpha
  ['#00000000', [0, 0, 0, 0]],
  ['#ffffffff', [255, 255, 255, 1]],
  ['#ffff0000', [255, 255, 0, 0]],
  ['#ff00ff00', [255, 0, 255, 0]],
  ['#ff0000ff', [255, 0, 0, 1]],
  ['#00000000', [0, 0, 0, 0]],
  // shorthand
  ['#fff', [255, 255, 255, 1]],
  ['#f00', [255, 0, 0, 1]],
  ['#f0f0', [255, 0, 255, 0]],
  ['#f00f', [255, 0, 0, 1]],
  // varying values
  ['#aa12f9', [170, 18, 249, 1]],
  ['#1234', [17, 34, 51, 68 / 255]],
  ['#fa551abb', [250, 85, 26, 187 / 255]],
  ['#1ceed53d', [28, 238, 213, 61 / 255]],
  ['#530fad90', [83, 15, 173, 144 / 255]],
];
const mockRgba = [
  // base colors
  [[0, 0, 0, 1], '#000000ff'],
  [[255, 255, 255, 1], '#ffffffff'],
  [[255, 0, 0, 1], '#ff0000ff'], // r
  [[0, 255, 0, 1], '#00ff00ff'], // g
  [[0, 0, 255, 1], '#0000ffff'], // g
  [[255, 0, 255, 1], '#ff00ffff'], // rb
  [[0, 255, 255, 1], '#00ffffff'], // gb
  [[255, 255, 0, 1], '#ffff00ff'], // rg
  // varying alpha
  [[0, 0, 0, 0], '#00000000'],
  [[255, 255, 255, 1], '#ffffffff'],
  [[255, 255, 0, 0], '#ffff0000'],
  [[255, 0, 255, 0], '#ff00ff00'],
  [[255, 0, 0, 1], '#ff0000ff'],
  [[255, 0, 255, 1], '#ff00ffff'],
  [[255, 255, 0, 1], '#ffff00ff'],
  [[255, 255, 255, 0], '#ffffff00'],
  [[0, 0, 0, 0], '#00000000'],
  // varying values
  [[170, 18, 249, 1], '#aa12f9ff'],
  [[250, 85, 26, 187 / 255], '#fa551abb'],
  [[28, 238, 213, 61 / 255], '#1ceed53d'],
  [[83, 15, 173, 144 / 255], '#530fad90'],
];
const mockWrongHex = [
  '#0000000', // length 7
  '#000000000', // length 9
  '#0000000g', // invalid char
];

describe('Color', () => {
  it('should be able to create a new Color', () => {
    const color = new Color('#ff00ff00');
    expect(color).toBeInstanceOf(Color);
    expect(color.r).toBe(255);
    expect(color.g).toBe(0);
    expect(color.b).toBe(255);
    expect(color.a).toBe(0);
  });
  it.each(mockHex)('should convert hex: %p to rbga: %p', (hex, rgba) => {
    const color = new Color(hex);
    expect(color.rgba).toEqual(rgba);
  });
  it.each(mockWrongHex)('should throw error when hex: %p is invalid', (hex) => {
    expect(() => new Color(hex)).toThrow();
  });
  it.each(mockRgba)('should convert rgba: %p to hex: %p', (rgba, hex) => {
    const color = new Color(rgba);
    expect(color.hex).toEqual(hex);
  });
  it('should be correctly update rgba values after settings new hex value', () => {
    const color = new Color('#ff00ff00');
    expect(color.r).toBe(255);
    expect(color.g).toBe(0);
    expect(color.b).toBe(255);
    expect(color.a).toBe(0);
    color.hex = '#00000000';
    expect(color.r).toBe(0);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);
    expect(color.a).toBe(0);
  });
  it('should be correctly update hex value after settings new rgba values', () => {
    const color = new Color('#ff00ff00');
    expect(color.hex).toBe('#ff00ff00');
    color.rgba = [0, 0, 0, 0];
    expect(color.hex).toBe('#00000000');
    color.rgb = [255, 255, 255];
    expect(color.hex).toBe('#ffffffff');
  });
});
