jest.mock('fs');
const fs = require('fs');

const { readFromFile, writeToFile, readFromFileSync } = require('./fileUtil');

const filePath = 'FILE_PATH';
const someText = 'Some text to be added';

describe('File utilities', () => {
  test('Write to file', async () => {
    fs.promises.readFile = jest.fn(() => Promise.reject());
    fs.promises.writeFile = jest.fn();

    await writeToFile(filePath)(someText);

    const writeFileName = fs.promises.writeFile.mock.calls[0][0];
    const writeFileArgument = fs.promises.writeFile.mock.calls[0][1];

    expect(writeFileName).toBe(filePath);
    expect(writeFileArgument).toBe(someText);
  });

  test('Read from non-existent file', async () => {
    fs.promises.readFile = jest.fn(() => Promise.reject());

    const fileContent = await readFromFile(filePath);

    expect(fileContent).toBe(null);
  });

  test('Read from an existing file', async () => {
    fs.promises.readFile = jest.fn(() => Promise.resolve(someText));

    const fileContent = await readFromFile(filePath);

    expect(fileContent).toBe(someText);
  });
});

describe('Sync file utilities', () => {
  test('Read from non-existent file - sync', () => {
    fs.readFileSync = jest.fn(() => { throw new Error('Read failed!'); });
    const fileContent = readFromFileSync('dummy');

    expect(fileContent).toBe(null);
  });

  test('Read from an existing file - sync', () => {
    fs.readFileSync = jest.fn(() => someText);
    const fileContent = readFromFileSync(filePath);

    expect(fileContent).toBe(someText);
  });
});
