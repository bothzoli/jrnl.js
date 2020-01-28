const fs = require('fs');
const util = require('./util');

test('Add 1 entry to non-existing entries', async () => {
  fs.promises.readFile = jest.fn(() => Promise.reject());
  fs.promises.writeFile = jest.fn();

  await util('asdf');

  const writeFileArgument = fs.promises.writeFile.mock.calls[0][1];

  expect(writeFileArgument).toBe('{"Entries":["asdf"]}');
});

test('Add 1 entry to already existing entries', async () => {
  fs.promises.readFile = jest.fn(() => Promise.resolve('{"Entries":["qwer"]}'));
  fs.promises.writeFile = jest.fn();

  await util('asdf');

  const writeFileArgument = fs.promises.writeFile.mock.calls[0][1];

  expect(writeFileArgument).toBe('{"Entries":["qwer","asdf"]}');
});
