const fs = require('fs');
const { addNewEntry, readEntries } = require('./util');

const entriesJSON = './entries.json';

test('Add 1 entry to non-existing entries', async () => {
  fs.promises.readFile = jest.fn(() => Promise.reject());
  fs.promises.writeFile = jest.fn();

  await addNewEntry('asdf');

  const writeFileName = fs.promises.writeFile.mock.calls[0][0];
  const writeFileArgument = fs.promises.writeFile.mock.calls[0][1];

  expect(writeFileName).toBe(entriesJSON);
  expect(writeFileArgument).toBe('{"Entries":["asdf"]}');
});

test('Add 1 entry to already existing entries', async () => {
  fs.promises.readFile = jest.fn(() => Promise.resolve('{"Entries":["qwer"]}'));
  fs.promises.writeFile = jest.fn();

  await addNewEntry('asdf');

  const writeFileName = fs.promises.writeFile.mock.calls[0][0];
  const writeFileArgument = fs.promises.writeFile.mock.calls[0][1];

  expect(writeFileName).toBe(entriesJSON);
  expect(writeFileArgument).toBe('{"Entries":["qwer","asdf"]}');
});

test('Read entries when none exists', async () => {
  fs.promises.readFile = jest.fn(() => Promise.reject());

  const entries = await readEntries();

  expect(entries.Entries.length).toBe(0);
});


test('Read entries when none exists', async () => {
  fs.promises.readFile = jest.fn(() => Promise.resolve('{"Entries":["qwer"]}'));

  const entries = await readEntries();

  expect(entries.Entries.length).toBe(1);
  expect(entries.Entries[0]).toBe('qwer');
});
