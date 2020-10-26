jest.mock('./util/fileUtil');

describe('Settings tests', () => {
  test('If no user settings exist, revert to default settings', () => {
    const settings = require('./settings');
    expect(settings.default).toBe(true);
  });
});

describe('Settings tests', () => {
  test('If no user settings exist, revert to default settings', () => {
    const settings = require('./settings');
    expect(settings.default).toBe(true);
  });
});
