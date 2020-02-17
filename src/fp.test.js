const compose = require('./fp');

const add1 = x => x + 1;
const times2 = x => x * 2;

describe('FP utilities', () => {
  test('Composition', () => {
    expect(compose(times2, add1)(1)).toBe(4);
    expect(compose(add1, times2)(1)).toBe(3);
  });
});
