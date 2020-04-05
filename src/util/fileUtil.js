const fs = require('fs');

const readFromFile = async fileName => fs.promises.readFile(fileName, 'utf8').catch(() => null);

const writeToFile = fileName => async content => {
  await fs.promises.writeFile(fileName, content);
};

module.exports = {
  readFromFile,
  writeToFile
};
