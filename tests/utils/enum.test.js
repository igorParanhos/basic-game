import { createEnum } from '../../src/utils/enum';

test('createEnum', () => {
  const values = ['a', 'b', 'c'];
  const _enum = createEnum(values);
  expect(_enum.a.toString()).toEqual(Symbol('a').toString());
  expect(_enum.b.toString()).toEqual(Symbol('b').toString());
  expect(_enum.c.toString()).toEqual(Symbol('c').toString());
});

describe('createEnum', () => {
  it('should return an object', () => {
    const values = ['a', 'b', 'c'];
    const _enum = createEnum(values);
    expect(_enum).toBeInstanceOf(Object);
  });

  it('should return an object with the same keys as the values array', () => {
    const values = ['a', 'b', 'c'];
    const _enum = createEnum(values);
    expect(Object.keys(_enum)).toEqual(values);
  });

  it('should return unique values', () => {
    const values = ['a', 'b', 'c'];
    const _enum = createEnum(values);
    expect(_enum.a).not.toEqual(_enum.b);
    expect(_enum.a).not.toEqual(_enum.c);
    expect(_enum.b).not.toEqual(_enum.c);
  });

  it('should throw an error when trying to set a value', () => {
    const values = ['a', 'b', 'c'];
    const _enum = createEnum(values);
    expect(() => {
      _enum.a = 'foo';
    }).toThrow();
  });

  it('should throw an error when trying to get an invalid value', () => {
    const values = ['a', 'b', 'c'];
    const _enum = createEnum(values);
    expect(() => {
      _enum.foo;
    }).toThrow();
  });

  it('should return the same value for the same key', () => {
    const values = ['a', 'b', 'c'];
    const _enum = createEnum(values);
    expect(_enum.a).toEqual(_enum.a);
  });

  it('should handle duplicated values', () => {
    const values = ['a', 'b', 'c', 'a'];
    const expected = ['a', 'b', 'c'];
    const _enum = createEnum(values);
    expect(Object.keys(_enum)).toEqual(expected);
  });
});
