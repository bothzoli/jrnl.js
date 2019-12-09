const jrnl = require('./../jrnl');

test('adds 1 + 2 to equal 3', () => {
  expect(jrnl(1, 2)).toBe(3);
});
