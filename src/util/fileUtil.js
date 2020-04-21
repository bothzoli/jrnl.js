const fs = require('fs');

const readFromFileSync = fileName => {
  try {
    const content = fs.readFileSync(fileName, 'utf8');
    return content;
  } catch (error) {
    return null;
  }
};

const readFromFile = async fileName => fs.promises.readFile(fileName, 'utf8').catch(() => null);

const writeToFile = fileName => async content => {
  await fs.promises.writeFile(fileName, content);
};

module.exports = {
  readFromFile,
  writeToFile,
  readFromFileSync
};
