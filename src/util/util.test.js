const fileUtil = require('./fileUtil');

const nonExistentFileName = 'NOT_EXISTS';
const existingFileName = 'EXISTS';

fileUtil.readFromFile = jest.fn(async fileName => {
  if (fileName === nonExistentFileName) {
    return null;
  } if (fileName === existingFileName) {
    return '["qwer"]';
  }
  return null;
});
const writeToFileMock = jest.fn(async () => { });
fileUtil.writeToFile = jest.fn(() => writeToFileMock);

const cipher = require('./cipher');

cipher.encrypt = jest.fn(() => input => input);
cipher.decrypt = jest.fn(() => input => input);

const { readEntries, writeEntries } = require('./util');

describe('Entry utilities', () => {
  test('Read from non-existent file', async () => {
    const fileContent = await readEntries(nonExistentFileName);

    expect(fileContent).toStrictEqual(JSON.parse('[]'));
  });

  test('Read from existing file', async () => {
    const fileContent = await readEntries(existingFileName);

    expect(fileContent).toStrictEqual(JSON.parse('["qwer"]'));
  });

  test('Write to non-existent file', async () => {
    writeToFileMock.mockClear();
    await writeEntries(nonExistentFileName)('asdf');

    expect(writeToFileMock.mock.calls[0][0]).toStrictEqual('["asdf"]');
  });

  test('Write to existing file', async () => {
    writeToFileMock.mockClear();
    await writeEntries(existingFileName)('asdf');

    expect(writeToFileMock.mock.calls[0][0]).toStrictEqual('["asdf","qwer"]');
  });
});
