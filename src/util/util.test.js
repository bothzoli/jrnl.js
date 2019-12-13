// const fs = require('fs');
const util = require('./util');

// jest.mock('fs');

// fs.existsSync.mockImplementation(() => true);

test('adds 1 + 2 to equal 3', () => {
  expect(util(1, 2)).toBe(3);
});
