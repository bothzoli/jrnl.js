const fs = require('fs');
const settings = require('../../settings');
const { addNewEntry, readEntries } = require('./util');

const entriesJSON = settings.entriesPath;

describe('File utilities', () => {
  test('Add 1 entry to non-existing entries', async () => {
    fs.promises.readFile = jest.fn(() => Promise.reject());
    fs.promises.writeFile = jest.fn();

    await addNewEntry('asdf');

    const writeFileName = fs.promises.writeFile.mock.calls[0][0];
    const writeFileArgument = fs.promises.writeFile.mock.calls[0][1];

    expect(writeFileName).toBe(entriesJSON);
    expect(writeFileArgument).toBe('["asdf"]');
  });

  test('Add 1 entry to already existing entries', async () => {
    fs.promises.readFile = jest.fn(() => Promise.resolve('["qwer"]'));
    fs.promises.writeFile = jest.fn();

    await addNewEntry('asdf');

    const writeFileName = fs.promises.writeFile.mock.calls[0][0];
    const writeFileArgument = fs.promises.writeFile.mock.calls[0][1];

    expect(writeFileName).toBe(entriesJSON);
    expect(writeFileArgument).toBe('["asdf","qwer"]');
  });

  test('Read entries when none exists', async () => {
    fs.promises.readFile = jest.fn(() => Promise.reject());

    const entries = await readEntries();

    expect(entries.length).toBe(0);
  });


  test('Read entries when one entry exists', async () => {
    fs.promises.readFile = jest.fn(() => Promise.resolve('["qwer"]'));

    const entries = await readEntries();

    expect(entries.length).toBe(1);
    expect(entries[0]).toBe('qwer');
  });
});
