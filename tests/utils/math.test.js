import { degreesToRadians, radiansToDegrees, clamp } from '../../src/utils/math';

describe('degreesToRadians', () => {
  it('should convert degrees to radians', () => {
    const degrees = 90;
    const radians = degreesToRadians(degrees);
    expect(radians).toEqual(Math.PI / 2);
  });
  it('should handle negative degrees', () => {
    const degrees = -90;
    const radians = degreesToRadians(degrees);
    expect(radians).toEqual(-Math.PI / 2);
  });
  it('should handle degrees greater than 360', () => {
    const degrees = 450;
    const radians = degreesToRadians(degrees);
    expect(radians).toEqual(2 * Math.PI + Math.PI / 2);
  });
});

describe('radiansToDegrees', () => {
  it('should convert radians to degrees', () => {
    const radians = Math.PI / 2;
    const degrees = radiansToDegrees(radians);
    expect(degrees).toEqual(90);
  });
  it('should handle negative radians', () => {
    const radians = -Math.PI / 2;
    const degrees = radiansToDegrees(radians);
    expect(degrees).toEqual(-90);
  });
  it('should handle radians greater than 2PI', () => {
    const radians = Math.PI * 2.5;
    const degrees = radiansToDegrees(radians);
    expect(degrees).toEqual(450);
  });
});

describe('clamp', () => {
  it('should clamp a value to a min', () => {
    const value = 0;
    const min = 1;
    const max = 10;
    const clampedValue = clamp(value, min, max);
    expect(clampedValue).toEqual(1);
  });
  it('should clamp a value to a max', () => {
    const value = 11;
    const min = 1;
    const max = 10;
    const clampedValue = clamp(value, min, max);
    expect(clampedValue).toEqual(10);
  });
  it('should not clamp a value within the min and max', () => {
    const value = 5;
    const min = 1;
    const max = 10;
    const clampedValue = clamp(value, min, max);
    expect(clampedValue).toEqual(5);
  });
});
