const { readFromFile, writeToFile } = require('./fileUtil');
const { encrypt, decrypt } = require('./cipher');

const password = 'Pas$w0Rd1!';

const readEntries = async fileName => {
  const content = decrypt(password)(await readFromFile(fileName)) || '[]';
  return JSON.parse(content);
};

const writeEntries = fileName => async content => {
  const currentContent = await readEntries(fileName);
  writeToFile(fileName)(encrypt(password)(JSON.stringify([content, ...currentContent])));
};

module.exports = {
  readEntries,
  writeEntries
};
