export const createEnum = (values = []) => {
  const _value = {};

  new Set(values).forEach((v) => {
    const symbol = Symbol(v);
    _value[v] = symbol;
  });

  const proxy = new Proxy(_value, {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop];
      }
      throw new Error(`Invalid enum value: ${prop}`);
    },
    set: () => {
      throw new Error('Cannot set enum value');
    },
  });

  return proxy;
};
